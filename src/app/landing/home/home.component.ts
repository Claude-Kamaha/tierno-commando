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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(
    private router: Router,
    private homeService: HomeService
  ) {

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.getAllReferredFriends()
  }
  getAllReferredFriends() {
    this.homeService.getMyReferrals().subscribe((response: any) => {
      console.log(response.data);
      // this.modeles = response.data
      // this.dataSource = new MatTableDataSource(this.modeles)

    })
  }
  createUser() {
    this.router.navigate(['/create-client'])
  }
}






