import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

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

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const decoded: any = jwt_decode(token);
    const now = Date.now().valueOf() / 1000;
    // Check if the token's expiration time is less than the current time
    return decoded.exp < now;
  }

  // Method to log out the user
  logout() {
    localStorage.removeItem('access_token'); // Remove the token
    localStorage.removeItem('email'); 
    localStorage.removeItem('userName'); 
    localStorage.removeItem('refresh_token');
    // Optionally, clear other stored user info
    this.router.navigate(['/auth/login']); // Redirect to login page
  }

  isAdminLoggedIn(){
    const userName = localStorage.getItem('userName');
    if(userName === 'admin'){
      return true;
    }
    return false;
  }

refreshToken() {
  return this.http.post<any>(this.apiURL + '/refresh-token', {
    'refresh_token': this.getRefreshToken()
  }).pipe(tap((tokens: any) => {
    this.storeJwtToken(tokens.jwt);
  }));
}
  
private getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

private storeJwtToken(jwt: string) {
  localStorage.setItem('access_token', jwt);
}

}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

