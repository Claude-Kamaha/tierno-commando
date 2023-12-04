import { Component, Input } from '@angular/core';
import { LayoutModule } from '../layout.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-sidebody',
  templateUrl: './sidebody.component.html',
  styleUrl: './sidebody.component.scss'
})
export class SidebodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
}


