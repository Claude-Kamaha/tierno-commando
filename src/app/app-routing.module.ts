import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassicComponent } from './layout/classic/classic.component';
import { EmptyComponent } from './layout/empty/empty.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [{
  path: '',
  component: ClassicComponent,
  children: [
    {
      path: '',
      loadChildren: () =>
        import('./landing/landing.module').then((m) => m.LandingModule),
    }
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
