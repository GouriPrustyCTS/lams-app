import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';

import { LoginComponent } from './app/modules/login/login.component';
import { routes } from './app/modules/login/login-routing.module'; // or define them directly here if not exported
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
  ]
}).catch(err => console.error(err));
