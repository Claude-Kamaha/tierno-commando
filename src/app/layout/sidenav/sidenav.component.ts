import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { INavbarData } from './navDataInterface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [

    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms',
          style({ opacity: 1 })
        )
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms',
          style({ opacity: 0 })
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' })
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  currentRoute!: string;
  constructor(public router: Router, public auth: AuthService) {
    this.currentRoute = window.location.pathname;

  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }
  ngOnInit(): void {
    console.log(this.auth.getStoredAuthUser);
    
    this.screenWidth = window.innerWidth;

    // if (this.screenWidth <= 768) {
    //   this.collapsed = true;
    // }
    // this.navData = navbarData.map((item: any) => {
    //   const rt = window.location.pathname.toString().split('/');
    //   if (rt.includes(item.routeLink)) {
    //     return {
    //       ...item,
    //       expanded: true,
    //     };
    //   } else {
    //     return {
    //       ...item,
    //       expanded: false,
    //     };
    //   }
    // });
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth
    });
  }
  closeSidenav2(): void {
    if (this.screenWidth <= 768) {
      this.collapsed = true;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  handleClick(item: INavbarData): void {
    this.currentRoute = item.routeLink;
    this.shrinkItems(item);
    item.expanded = !item.expanded;
    if (this.collapsed) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  setCurrentExpand(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = true;
    this.collapsed = false;
  }

  getActiveClass(data: INavbarData): string {
    // if (
    //   data.items &&
    //   data.items.length > 0 &&
    //   this.router.url.includes(data.routeLink)
    // ) {
    //   this.setCurrentExpand(data);
    // }
    return this.router.url.split('/').includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {

    if (this.screenWidth <= 768) {
      this.collapsed = true;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }
  logout(){
   this.auth.logout() 
  }
}
