import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'joignedOn',
    'username',
    'lastName',
    'firstName',
    'gender',
    'dateOfBirth',
    'level'
  ];
  dataSource = new MatTableDataSource<any>();
  referralList: any;
  // range!: FormGroup;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(
    private router: Router,
    private homeService: HomeService
  ) {

  }

  ngAfterViewInit() {
    //  this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.getAllReferredFriends()
  }
  range = new UntypedFormGroup({
    start: new UntypedFormControl(),
    end: new UntypedFormControl(),
  });
  getAllReferredFriends() {
    this.dataSource = new MatTableDataSource();

    this.homeService.getMyReferrals().subscribe((response: any) => {
      console.log(response.data);
      this.referralList = response.data
      // let data: any = [
      //   {
      //     "username": "joelletest1",
      //     "joigned_on": 1701089950351,
      //     "level": 1,
      //     "level_name": "basic",
      //     "first_name": "Joelle",
      //     "last_name": "Kama",
      //     "gender": "female",
      //     "date_of_birth": "2005-01-22",
      //     "identification": null
      //   },
      //   {
      //     "username": "joelletest1",
      //     "joigned_on": 1701089950351,
      //     "level": 1,
      //     "level_name": "basic",
      //     "first_name": "Joelle",
      //     "last_name": "Kama",
      //     "gender": "female",
      //     "date_of_birth": "2005-01-22",
      //     "identification": null
      //   }
      // ];

      // console.log(response.data);
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;

    })
  }


  createUser() {
    this.router.navigate(['/create-client'])
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  gotoDetails(row: any) {
    this.router.navigate(['kyc'])
  }
  filterbyDate() {
    this.range.value.end = this.range.value.end == '' ? '' : new Date(this.range.get('end')?.value).getTime();
    this.range.value.start = this.range.value.start == '' ? '' : new Date(this.range.get('start')?.value).getTime();

    console.log(this.range.value.end);
    let filterData = this.referralList.filter((elt: { joigned_on: { getTime: () => number; }; }) => {


      return this.range.value.start <= elt.joigned_on && this.range.value.end >= elt.joigned_on;


    })

    this.dataSource.data = filterData
    console.log(filterData)

  }
}






