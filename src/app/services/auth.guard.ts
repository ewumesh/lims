import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth/auth.service';
import * as jwt_decode from 'jsonwebtoken';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }

  // token = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(this.authService.isLoggedIn(), 'IS LOGGED IN')
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      // this.router.navigate(['/login']);
    }
    return true;
  }


  // isTokenExpired(): boolean {
  //   const decodedToken: any = jwt_decode(this.token);
  //   const expirationDate: number = decodedToken.exp * 1000; // Convert to milliseconds

  //   return expirationDate < Date.now();
  // }
}

