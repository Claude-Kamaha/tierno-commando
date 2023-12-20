import { HttpInterceptorFn } from '@angular/common/http';
import { environment, kycEnvironment } from 'src/environment/environment';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    req.url.startsWith('http') ||
    req.url.indexOf('/assets/i18n/') !== -1
  ) {
    return next(req);
  }
  console.log('Here is the url interceptor', req.url)
  const nellysCoinsUrl =
    req.url.startsWith('/v1') ||
    req.url.startsWith('/v2') ||
    req.url.startsWith('/v3') &&
    !req.url.includes('kyc');

  const kycUrl = req.url.includes('kyc')

  if (nellysCoinsUrl) {
    const url = `${environment.apiRoot}${req.url}`;
    req = req.clone({ url });
  }
  if (kycUrl) {
    const url = `${kycEnvironment.apiKyc}${req.url}`;
    req = req.clone({ url });
  }

  return next(req);
}


