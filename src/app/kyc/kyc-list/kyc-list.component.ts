import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/landing/home/home.service';
import { KycService } from '../kyc.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-kyc-list',
  templateUrl: './kyc-list.component.html',
  styleUrl: './kyc-list.component.scss'
})
export class KycListComponent {
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
  range!: FormGroup;
  agentNellysCoinId = this.auth.user.id
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(
    private router: Router,
    private kycService: KycService,
    public auth: AuthService
  ) {

  }
  ngOnInit() {
    this.getAllReferredFriends()
  }
  getAllReferredFriends() {
   

    this.dataSource = new MatTableDataSource();

    this.kycService.getAgentList(this.agentNellysCoinId).subscribe((response: any) => {
    

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

   
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;

    })
  }

  // this.range = new FormGroup({
  //   start: new FormControl<Date | null>(null),
  //   end: new FormControl<Date | null>(null),
  // });




  createUser() {
    this.router.navigate(['/create-client'])
  }
  gotoDetails(row: any) {
    this.router.navigate(['kyc'])
  }
}
