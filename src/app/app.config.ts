import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './services/login/jwtinterceptor.service';
import { ErrorInterceptorService } from './services/login/errorinterceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration()
    , importProvidersFrom(HttpClientModule), {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptorService, multi:true}, 
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}
  ]
};

