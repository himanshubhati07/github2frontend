import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');
  if (!token) return next(req);
  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${btoa(token)}`,
    },
  });
  return next(cloned);
};
