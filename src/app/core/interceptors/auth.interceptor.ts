import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService)
  if (req.url.startsWith('/assets/i18n/')) {
    return next(req);
  }
  if (req.url !== '/v1/auth/login') {

    const headers = req.headers.set('Authorization', `Bearer ${authService.getTokenFromLocalStorage()}`);
    const apiRequest = req.clone({ headers });

    return next(apiRequest)
  }
  return next(req);
};
