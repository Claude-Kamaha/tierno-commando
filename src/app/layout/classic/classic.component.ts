import { Component, Input } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-classic',
  templateUrl: './classic.component.html',
  styleUrls: ['./classic.component.scss']
})
export class ClassicComponent {
  // collapsed = false;
  // screenWidth = 0;
  // ngOnInit(): void {
  //   this.screenWidth = window.innerWidth;
  //   if (this.screenWidth <= 768) {
  //     this.isSideNavCollapsed = true;
  //   }
  // }
  // getBodyClass(): string {
  //   let styleClass = '';
  //   if (this.collapsed && this.screenWidth > 768) {
  //     styleClass = 'body-trimmed';
  //   } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
  //     styleClass = 'body-md-screen'
  //   }
  //   return styleClass;
  // }

  // isSideNavCollapsed = false;


  // onToggleSideNav(data: SideNavToggle): void {
  //   this.screenWidth = data.screenWidth;
  //   this.isSideNavCollapsed = data.collapsed;
  // }
  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
