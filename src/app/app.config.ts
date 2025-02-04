import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorInterceptor } from './interceptors/auth/auth-interceptor.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withComponentInputBinding()),  provideHttpClient(withFetch(),withInterceptors([authInterceptorInterceptor])),HttpClientModule,
    provideToastr(),
    provideAnimations(), provideAnimationsAsync(), provideAnimationsAsync(),
  ]
};
