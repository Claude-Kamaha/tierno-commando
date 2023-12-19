import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KycComponent } from './kyc/kyc.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { KycListComponent } from './kyc-list/kyc-list.component';

const routes: Routes = [

  {
    path: '',
    component: KycComponent,
  },
  {
    path: 'all-kyc',
    component: KycListComponent,
  },

];

@NgModule({
  declarations: [KycComponent, KycListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class KycModule { }
