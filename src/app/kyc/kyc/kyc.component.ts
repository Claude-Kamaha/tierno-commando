import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/core/notification.service';
import { KycService } from '../kyc.service';
import { Subject, forkJoin } from 'rxjs';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrl: './kyc.component.scss'
})
export class KycComponent {
  level: number = 2;
  kycLevels: number[] = [];
  levelData: any;
  levels: number[] = [2];
  genders = ['Male', 'Female'];
  updating = false;
  Userupdating = false;
  name: string = '';
  documents: any[] = [];
  parti: UntypedFormGroup = new UntypedFormGroup({});
  kyc_level!: number;
  nextLevelDocuments: any;
  limit: number = 10;
  loading = false;
  uploading = false;
  offset: number = 0;
  filteredResults: any[] = [];
  filterBy: string = '';
  isLinear = true;
  isEditable = false;
  formDocuments: any[] = [];
  currentIndex = 0;
  @ViewChild('stepper')
  stepper!: MatStepper;
  documentForm!: UntypedFormGroup;
  firstStep = true;
  documentStep = false;
  uploadUrls: any;
  users: any;
  displayOtherField = false
  userLoading = false;
  



  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private kycService: KycService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {

  }
  
  @ViewChild('multiSelect')
  multiSelectUser!: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
 
  form: UntypedFormGroup = this.fb.group({
    kycLevel: ['', Validators.required],
    customerUsername: ['', Validators.required],
    firstName:[''],
    lastName:[''],
    gender:[''],
    reason: ['', Validators.required],
    documents: [],

  }
  )



  getDoc(): void {
    this.documentForm = this.fb.group({
      particulars: new UntypedFormArray([
        new UntypedFormGroup({
          documentType: new UntypedFormControl(''),
          image: new UntypedFormControl(''),
          id: new UntypedFormControl(''),
        }),
      ]),
    })
  }


  ngOnInit(): void {
    // this.getAllLevels();
    this.getDocuments(2,'Cameroon')
   
  }
  // getAllLevels() {
  //   this.kycService.getAllLevel().subscribe(
  //     (response: any) => {
  //       this.levelData = response.data
  //     },
  //     (error) => {

  //     }
  //   )
  // }

  get particulars() {
    return this.documentForm.get('particulars') as UntypedFormArray;
  }
  get particular() {
    return this.documentForm.controls['particulars'] as UntypedFormArray;
  }

  // onLevelChange(event: any) {

  //   if (event.value - this.kyc_level > 1) {
  //     this.snackBar.open(
  //       `Unable to go from level ${this.kyc_level} to level ${event.value}.`
  //     );
  //     this.form.get('level')?.setValue(null);
  //     return;
  //   }
  //   this.level = event.value;
  // }

  /**
   * Upload file
   * @param event
   * @param index
   */
  onFileChange(event: any, index: number) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        const formGroup = this.particulars.at(index) as UntypedFormGroup;
        this.documents[index].source = reader.result as string;
        formGroup.patchValue({
          image: file,
          documentType: this.documents[index].name,
          id: this.documents[index].id
        });
      };
    }


  }





  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  
  logStepperLength() {
    const numberOfSteps = this.stepper.steps.length;
  }
  getNextButton() {
    this.currentIndex++;
    this.firstStep = false
    this.documentStep = true;
  }
  getPreviousButton() {
    this.currentIndex--
    this.firstStep = true
    this.documentStep = false;

  }
  getDocuments(level: number, country: string): void {
    this.getDoc()
    // if (level === 1) {
    //   this.kyc_level = level;
    //   this.levels = [];
    //   this.kycLevels.forEach((element: any) => {
    //     if (this.kyc_level < element) {
    //       this.levels.push(element);
    //     }
    //   });
    // }
    this.kyc_level = level;
    this.kycService.getKycLevelDocuments(level, country).subscribe((response: any) => {
      this.nextLevelDocuments = response;
      while (this.particulars.length) {
        this.particulars.removeAt(0);
      }
      this.documents = [];
      this.formDocuments = []

      // this.nextLevelDocuments?.forEach(() => {
      //   this.levels = this.kycLevels.filter((kycLevel) => kycLevel > level);
      // });


      this.nextLevelDocuments?.forEach((document: any) => {
        this.documents.push({
          id: document.id,
          name: document.name,
          description: document.description,
          source: '',
        });
        this.formDocuments.push(document.id);
        this.particulars.push(
          new UntypedFormGroup({
            documentType: new UntypedFormControl(document.name),
            image: new UntypedFormControl('', Validators.required),
            id: new UntypedFormControl(document.id)
          })
        );

      });
    });

  }

  async getAwsLink() {
    this.uploading = true

    this.form.value.documents = this.formDocuments

    this.kycService.submitAgent(this.form.value)
      .subscribe((uploadUrls:any) => {
        const uploadObservables: any[] = [];

        this.documentForm.value.particulars.forEach((file: any, index: number) => {
          uploadUrls?.data?.forEach((elt: any, urlIndex: number) => {
            if (file.id == elt?.documentTypeId) {
              const uploadObservable = this.http.put(elt?.uploadUrl, file.image)
              uploadObservables.push(uploadObservable);
            }
          }
          )
        }),

          forkJoin(uploadObservables).subscribe(() => {
            this.notificationService.success('image(s) uploaded succesfully');
            this.router.navigate(['kyc'])
            this.uploading = false
          })
      },
        (error) => {
          this.uploading = false
        }
      )

  }
}
