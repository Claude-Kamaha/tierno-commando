import { HttpInterceptorFn } from '@angular/common/http';
import { environment, kycEnvironment } from 'src/environment/environment';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {


  if (req.url.startsWith(environment.apiRoot)) {
    let headers = req.headers.set('api-key', environment.apiKey);
    headers = headers.set('client-id', `${environment.clientId}`);
    headers = headers.set('client', `${environment.client}`);
    headers = headers.set('app-platform', `${environment.appPlatform}`);
    headers = headers.set('app-version', `${environment.appVersion}`);

    const apiRequest = req.clone({ headers });

    return next(apiRequest);
  }

  if (req.url.startsWith(kycEnvironment.apiKyc)) {
    let headers = req.headers.set('client-secret', kycEnvironment.clientSecret);
    headers = headers.set('client-key', `${kycEnvironment.clientKey}`);
    // headers = headers.set('client', `${kycEnvironment.client}`);
    const kycRequest = req.clone({ headers });

    return next(kycRequest);
  }

  return next(req);
};
