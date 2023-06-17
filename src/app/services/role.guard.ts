import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
    ) { }

  userRole:any;
  userDetails;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRole = next.data['requiredRole'] // Access the required role from route data
      this.userRole = JSON.parse(localStorage.getItem('userDetails'))?.role;
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));

    // console.log(requiredRole, this.userRole, this.authService.isLoggedIn(), "MINE ROLE..");

    if (this.authService.isLoggedIn()) {
      if (requiredRole.includes(this.userRole)) {

        return true; // User has the required role, allow access to the route
      } else {
        // Redirect to a forbidden page or show an error message
        this.router.navigate(['/dashboard/access-denied']);
        return false; // User doesn't have the required role, deny access to the route
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
