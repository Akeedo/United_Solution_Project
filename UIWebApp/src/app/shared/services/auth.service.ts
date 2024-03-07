import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  private apiURL: string = 'http://localhost:3000';

  onLogin(user: any): Observable<any>{
    return this.http.post<any>(this.apiURL +'/login', user);
}

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
