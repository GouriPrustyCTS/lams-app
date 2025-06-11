import { Injectable, PLATFORM_ID, Inject } from '@angular/core'; // Import Inject and PLATFORM_ID
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../models/auth-response.model';
import { UserDetails } from '../models/user-details.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:2694';
  private isBrowser: boolean; // Flag to check if running in browser

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Determine if running in browser
  }

  /**
   * Sends login credentials to the backend and stores the JWT.
   * @param username The user's email (used as username in backend).
   * @param password The user's password.
   * @returns An Observable of AuthResponse containing the JWT.
   */
  
login(username: string, password: string): Observable<AuthResponse> {
  return this.http
    .post<AuthResponse>(`${this.baseUrl}/login`, { username, password })
    .pipe(
      tap((response) => {
        if (this.isBrowser && response && response.token) {
          localStorage.setItem('jwtToken', response.token);
          localStorage.setItem('employeeId', response.employeeId.toString()); // 👈 Add this
          this.storeDecodedTokenDetails(response.token);
        }
      })
    );
}


  /**
   * Stores relevant decoded token details (username, roles) in local storage.
   * @param token The JWT to decode.
   */
  private storeDecodedTokenDetails(token: string): void {
    if (this.isBrowser) {
      // Guard localStorage access
      const decodedToken = this.decodeToken(token);
      if (decodedToken) {
        localStorage.setItem('username', decodedToken.sub || '');
        localStorage.setItem(
          'userRoles',
          JSON.stringify(decodedToken.roles || [])
        );
      }
    }
  }

  /**
   * Fetches full user details from the backend.
   * This call will automatically include the JWT via the interceptor.
   * @returns An Observable of UserDetails.
   */
  getUserDetails(): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.baseUrl}/employee/details`);
  }

  /**
   * Retrieves the JWT from local storage.
   * @returns The JWT string or null if not found.
   */
  getToken(): string | null {
    if (this.isBrowser) {
      // Guard localStorage access
      return localStorage.getItem('jwtToken');
    }
    return null; // Return null if not in browser environment
  }

  /**
   * Decodes a JWT.
   * @param token The JWT string.
   * @returns The decoded token payload or null if decoding fails.
   */
  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Error decoding token:', Error);
      return null;
    }
  }

  /**
   * Removes token and user details from local storage and sends logout request to backend.
   */
  logout(): Observable<string> {
    const token = this.getToken(); // Already available
  
    if (token) {
      return this.http.post<string>(
        `${this.baseUrl}/logout`,
        {},
        { responseType: 'text' as 'json' }
      );
    }
  
    return new Observable((observer) => {
      observer.next('Logged out successfully (no token)');
      observer.complete();
    });
  }
  

  /**
   * Checks if the user is currently logged in.
   * @returns True if a valid token exists and is not expired, false otherwise.
   */
  isLoggedIn(): boolean {
    if (this.isBrowser) {
      // Guard localStorage access
      const token = this.getToken();
      return !!token && !this.isTokenExpired(token);
    }
    return false; // Not logged in if not in browser environment
  }

  /**
   * Checks if a JWT is expired.
   * @param token The JWT string.
   * @returns True if the token is expired, false otherwise.
   */
  private isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
      return true;
    }
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
    return expirationDate.valueOf() < new Date().valueOf();
  }

  /**
   * Checks if the current user has a specific role.
   * @param role The role to check (e.g., 'ADMIN', 'USER').
   * @returns True if the user has the role, false otherwise.
   */
  hasRole(role: string): boolean {
    if (this.isBrowser) {
      // Guard localStorage access
      const rolesString = localStorage.getItem('userRoles');
      if (rolesString) {
        try {
          const userRoles: string[] = JSON.parse(rolesString);
          return userRoles.includes(role);
        } catch (e) {
          console.error('Error parsing user roles from localStorage', e);
          return false;
        }
      }
    }
    return false;
  }
}
