import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMsg = error.error;
      switch (error.status) {
        case 401:
          // this.notificationService.warn(errorMsg.message);
          return throwError(() => error);
          break;
        case 403:
          // this.notificationService.warn(
          //   'You are not authorized for this request!'
          // );
          // this.auth.logout();
          window.location.reload();
          return throwError(() => error);
          break;
        case 404:
          // this.notificationService.warn(errorMsg.message);
          return throwError(() => error);
          break;
        case 400:
          // this.notificationService.warn(errorMsg.message);
          return throwError(() => error);
          break;
        case 409:
          // this.notificationService.warn(errorMsg.message);
          return throwError(() => error);
          break;
        case 500:
          // this.notificationService.warn(errorMsg.message);
          // this.router.navigate(['/500']);
          return throwError(() => error);
          break;
        case 503:
          console.log(errorMsg.message);

          // this.notificationService.warn(errorMsg.message);
          return throwError(() => error);
          break;
        default:
          // console.log(errorMsg.message);
          // this.notificationService.warn(`Oops! Something went wrong!`);
          return throwError(() => error);
          break;
      }
    })
  );
}

  ;
