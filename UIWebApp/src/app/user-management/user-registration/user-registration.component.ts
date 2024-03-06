import { Component, OnInit } from '@angular/core';
import { UserModelServiceService } from '../services/user-model-service.service';
import { NgForm } from '@angular/forms';
import { UserDataServiceService } from '../services/user-data-service.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit{

  userRegistrationForm: NgForm;

  constructor(
    public modelSvc: UserModelServiceService,
    private dataSvc: UserDataServiceService
    ) { }
  ngOnInit(): void {
    this.modelSvc.setDefaultUser();
  }

  // Inside your component class

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
  


  onSave(userForm: NgForm) {
    this.dataSvc.saveUser(this.modelSvc.user).subscribe({
      next: (data) => {
        // This function runs when the Observable emits a value (i.e., the request succeeds)
        console.log('User saved successfully', data);
      },
      error: (error) => {
        // This function runs when the Observable emits an error (i.e., the request fails)
        console.log('Error saving user', error);
      },
      complete: () => {
        // This function runs when the Observable completes (i.e., no more values or errors will be emitted)
        console.log('Request completed');
      }
    });
  }
  
}
