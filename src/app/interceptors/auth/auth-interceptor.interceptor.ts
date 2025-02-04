import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let clonedRequest = req;
  if(localStorage.getItem('authToken')){
    clonedRequest = req.clone({
      setHeaders: {
         Authorization :`Bearer ${localStorage.getItem('authToken')}`
      }
    })
  }
  return next(clonedRequest);
};
