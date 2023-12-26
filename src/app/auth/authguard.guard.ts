import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from './auth.service';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const auth: AuthService = inject(AuthService);
 
  return auth.isLoggedIn
    .pipe(
      take(1),
      map((isLoggedIn: boolean) => {
     

        if (!isLoggedIn) {
          router.navigate(['/sign-in']);
          return false;
        }
        else {
          // router.navigate(['/sign-in']);
          return true;
        }
      })
    );

};
