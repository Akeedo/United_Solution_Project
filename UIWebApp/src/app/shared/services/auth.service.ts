import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

   // Example implementation
   isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    // Add more complex logic here as needed, e.g., token expiration check
    return !!token;
  }

  getCurrentUserName() {
    return localStorage.getItem('userName');
  }

  // Method to log out the user
  logout() {
    localStorage.removeItem('access_token'); // Remove the token
    // Optionally, clear other stored user info
    this.router.navigate(['/user-management/auth/login']); // Redirect to login page
  }
}
