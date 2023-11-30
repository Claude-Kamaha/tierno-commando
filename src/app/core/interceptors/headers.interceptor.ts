import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environment/environment';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('header interceptor', req.url);

  if (req.url.startsWith(environment.apiRoot)) {
    let headers = req.headers.set('api-key', environment.apiKey);
    headers = headers.set('client-id', `${environment.clientId}`);
    headers = headers.set('client', `${environment.client}`);
    headers = headers.set('app-platform', `${environment.appPlatform}`);
    headers = headers.set('app-version', `${environment.appVersion}`);

    const apiRequest = req.clone({ headers });

    return next(apiRequest);
  }

  return next(req);
};
