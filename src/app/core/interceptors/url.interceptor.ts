import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environment/environment';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Here is the url interceptor', req.url)
  const testurl =
    req.url.startsWith('/v1') || req.url.startsWith('/v2') || req.url.startsWith('/v3');

  if (testurl) {
    const url = `${environment.apiRoot}${req.url}`;
    req = req.clone({ url });
  }

  return next(req);
}


