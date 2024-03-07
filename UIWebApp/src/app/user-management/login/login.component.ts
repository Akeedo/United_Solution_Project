import { Component, OnInit } from '@angular/core';
import { UserModelServiceService } from '../services/user-model-service.service';
import { NgForm } from '@angular/forms';
import { UserDataServiceService } from '../services/user-data-service.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Store } from '@ngrx/store';
import { login } from 'src/app/shared/states/auth.actions';
import { AuthState } from 'src/app/shared/states/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(
    private router: Router,
    public modelSvc: UserModelServiceService,
    private authSvc: AuthService,
    private store: Store<AuthState>
    ) { }

  ngOnInit(): void {
    this.modelSvc.setDefaultUser();
  }

  getValidationMessage(controlName: string, form: NgForm): string | null {
    const control = form.controls[controlName];
    if (control && control.touched && control.invalid) {
      // Using type assertion to safely access properties
      if (control.errors['required']) {
        return 'This field is required.';
      }
      if (control.errors['minlength']) {
        // Using the 'as' keyword for type assertion
        const minLengthError = control.errors['minlength'] as {requiredLength: number};
        return `Minimum length is ${minLengthError.requiredLength} characters.`;
      }
      if (control.errors['maxlength']) {
        // Similarly for maxlength
        const maxLengthError = control.errors['maxlength'] as {requiredLength: number};
        return `Maximum length is ${maxLengthError.requiredLength} characters.`;
      }
      if (control.errors['pattern']) {
        return 'Please enter a valid email address.';
      }
    }
    return null;
  }
  
  
  onSave(loginForm: NgForm) {
    this.store.dispatch(login({ user: this.modelSvc.user }));
    this.onStoreConsole();
    // this.authSvc.onLogin(this.modelSvc.user).subscribe({
    //   next: (response) => {
    //     // This function runs when the Observable emits a value (i.e., the request succeeds)
    //   localStorage.setItem('access_token', response.token);
    //   localStorage.setItem('userName', response.user.userName);
    //   localStorage.setItem('email', response.user.email);
    //   this.store.dispatch(login({ user: this.modelSvc.user }));
    //   this.onStoreConsole();
    //   //this.router.navigate(["user-management/dashboard"]);
    //   },
    //   error: (error) => {
    //     // This function runs when the Observable emits an error (i.e., the request fails)
    //     console.log('Error saving user', error);
    //   },
    // });
  }

    onStoreConsole(): void {
      // this.store.subscribe((state) => {
      //   console.log('Store User:', state.user);
      // });
      console.log('Store:');
  }

}
