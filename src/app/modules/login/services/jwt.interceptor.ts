import { Injectable, PLATFORM_ID, Inject } from '@angular/core'; // Added Inject, PLATFORM_ID
import { isPlatformBrowser } from '@angular/common'; // Added isPlatformBrowser
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Path confirmed correct

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isBrowser: boolean; // Flag to check if running in browser

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Determine if running in browser
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token: string | null = null;

    // Only attempt to get token from localStorage if in a browser environment
    if (this.isBrowser) {
      token = this.authService.getToken(); // AuthService.getToken() is already guarded
    }

    // Attach JWT to all requests except login and register
    // Ensure the token is not null before cloning the request
    if (token && !request.url.includes('/login') && !request.url.includes('/register')) {
      
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    console.log(request.headers);
    return next.handle(request);
  }
}