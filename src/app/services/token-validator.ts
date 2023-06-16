import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import jwt_decode from "jwt-decode";
import { AuthenticationService } from './auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();

    if (token) {
      // Check if token is expired
      const expired = isTokenExpired(token);

      if (expired) {
        // Handle token expiration here
        // For example, redirect to login page
        window.location.href = '/login';
      } else {
        // Add token to request headers
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Handle 401 Unauthorized error here
            // For example, redirect to login page
            window.location.href = '/login';
          }
          return throwError(error);
        })
      );
  }
}

function isTokenExpired(token: string) {
  const decoded:DecodedToken = jwt_decode(token);
  const now = Date.now() / 1000;

  if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
    return true;
  }

  return false;
}

interface DecodedToken {
  exp: number;
  [key: string]: any;
}
