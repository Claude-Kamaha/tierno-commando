import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassicComponent } from './layout/classic/classic.component';
import { EmptyComponent } from './layout/empty/empty.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [{
  path: '',
   canActivate: [AuthGuard],
  component: ClassicComponent,
  children: [
    {
      path: '',
      loadChildren: () =>
        import('./landing/landing.module').then((m) => m.LandingModule),
    },
    {
      path: 'kyc',
      loadChildren: () =>
        import('./kyc/kyc.module').then((m) => m.KycModule),
    },
  ]
},
{
  path: '',
  component: EmptyComponent,
  children: [
    {
      path: 'sign-in',
      component: LoginComponent,
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
