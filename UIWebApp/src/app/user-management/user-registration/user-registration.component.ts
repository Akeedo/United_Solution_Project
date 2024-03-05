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

  onSave(userForm: NgForm) {
    const newUser = { id: 3, userName: 'Johny Doe', email: 'es2@g', password: 'secret3' };
    this.dataSvc.saveUser(newUser).subscribe({
      next: (data) => {
        // This function runs when the Observable emits a value (i.e., the request succeeds)
        console.log('User saved successfully', data);
      },
      error: (error) => {
        // This function runs when the Observable emits an error (i.e., the request fails)
        console.error('Error saving user', error);
      },
      complete: () => {
        // This function runs when the Observable completes (i.e., no more values or errors will be emitted)
        console.log('Request completed');
      }
    });
  }
  
}
