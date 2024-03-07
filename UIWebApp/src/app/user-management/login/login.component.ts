import { Component, OnInit } from '@angular/core';
import { UserModelServiceService } from '../services/user-model-service.service';
import { NgForm } from '@angular/forms';
import { UserDataServiceService } from '../services/user-data-service.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  errorMessage: string;
 
  constructor(
    private router: Router,
    public modelSvc: UserModelServiceService,
    private authSvc: AuthService,
    ) { }

  ngOnInit(): void {
    this.modelSvc.setDefaultUser();
  }

  onSave(loginForm: NgForm) {
   try{ 
    this.authSvc.onLogin(this.modelSvc.user).subscribe({
        next: (response) => {
          // This function runs when the Observable emits a value (i.e., the request succeeds)
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('refresh_token', response.refreshToken);
        localStorage.setItem('userName', response.user.userName);
        localStorage.setItem('email', response.user.email);
        
        this.router.navigate(['/user-management/dashboard']);
        },
        error: (error) => {
          // This function runs when the Observable emits an error (i.e., the request fails)
          console.log('Error saving user', error);
          this.errorMessage = 'Login failed. Please check your credentials.';
        },
      });
    } catch (error) {
      console.log('Error saving user', error);
    }
  }
}
