import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

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
  getAllReferredFriends() {
    this.dataSource = new MatTableDataSource();

    // this.homeService.getMyReferrals().subscribe((response: any) => {
      // console.log(response.data);
      
let data :any=[
  {
      "username": "joelletest1",
      "joigned_on": 1701089950351,
      "level": 1,
      "level_name": "basic",
      "first_name": "Joelle",
      "last_name": "Kama",
      "gender": "female",
      "date_of_birth": "2005-01-22",
      "identification": null
  },
  {
    "username": "joelletest1",
    "joigned_on": 1701089950351,
    "level": 1,
    "level_name": "basic",
    "first_name": "Joelle",
    "last_name": "Kama",
    "gender": "female",
    "date_of_birth": "2005-01-22",
    "identification": null
}
];
// console.log(response.data);
      this.dataSource =  new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    // })
  }
  createUser() {
    this.router.navigate(['/create-client'])
  }
  gotoDetails(row:any){
    this.router.navigate(['kyc'])
  }
}






