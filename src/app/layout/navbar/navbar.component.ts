import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = "head-trimmed";

    } else {
      styleClass = "head-md-sceen";
    }
    return styleClass
  }
}
