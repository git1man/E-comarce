import { HttpInterceptorFn } from '@angular/common/http';

export const adminInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
