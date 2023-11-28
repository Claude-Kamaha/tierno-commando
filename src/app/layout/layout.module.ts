import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './empty/empty.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ClassicComponent } from './classic/classic.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    EmptyComponent,
    SidenavComponent,
    ClassicComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule

  ]
})
export class LayoutModule { }
