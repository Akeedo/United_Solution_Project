import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Adjust the path as needed

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild  {

  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const expectedUserName = route.data['expectedUserName'];
      const currentUserName = this.authService.getCurrentUserName();
      if (currentUserName !== expectedUserName) {
        this.router.navigate(['/user-management/dashboard']); // Redirect to login page
        return false;
      }

    const isLoggedIn = this.authService.isLoggedIn(); // Implement this method in your AuthService
    
    if (!isLoggedIn) {
      this.router.navigate(['/user-management/auth/login']); // Redirect to login page
      return false;
    }
    
    return true;
  }
}
