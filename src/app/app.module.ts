import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './modules/login/services/jwt.interceptor';
import { GlobalErrorHandlerService } from './global-error-handler-exception.service';
import { HttpErrorInterceptor } from './http-error.interceptor';
@NgModule({
  declarations: [AppComponent],

  imports: [HttpClientModule, BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    { provide: ErrorHandler, 
      useClass: GlobalErrorHandlerService 
    },
    { provide: HTTP_INTERCEPTORS, 
      useClass: HttpErrorInterceptor, multi: true 
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
