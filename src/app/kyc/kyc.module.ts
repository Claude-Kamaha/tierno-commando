import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KycComponent } from './kyc/kyc.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
 
  {
    path: '',
    component: KycComponent,
  }
 
];

@NgModule({
  declarations: [KycComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class KycModule { }
