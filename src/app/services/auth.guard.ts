import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }

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
}

