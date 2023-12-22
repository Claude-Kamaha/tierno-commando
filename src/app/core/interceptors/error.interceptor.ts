import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../notification.service';
import { inject } from '@angular/core';





export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  let notificationService: NotificationService = inject(NotificationService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMsg = error.error;
    
      switch (error.status) {
        case 401:
          notificationService.warn(errorMsg.message);
          return throwError(() => error);
          break;
        case 403:
          notificationService.warn(
            'You are not authorized for this request!'
          );
          // this.auth.logout();
          window.location.reload();
          return throwError(() => error);
          break;
        case 404:
          notificationService.warn(errorMsg.message);
          return throwError(() => error);
          break;
        case 400:
          console.log(error.message);

          notificationService.warn(errorMsg.message);
          return throwError(() => error);
          break;
        case 409:
          notificationService.warn(errorMsg.message);
          return throwError(() => error);
          break;
        case 500:
          notificationService.warn(errorMsg.message);
          return throwError(() => error);
          break;
        case 503:
          console.log(errorMsg.message);

          notificationService.warn(errorMsg.message);
          return throwError(() => error);
          break;
        default:
          // console.log(errorMsg.message);
          notificationService.warn(`Probleme de connexion`);
          return throwError(() => error);
          break;
      }
    })
  );
}

  ;
