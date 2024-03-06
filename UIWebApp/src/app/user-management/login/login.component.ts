import { Component, OnInit } from '@angular/core';
import { UserModelServiceService } from '../services/user-model-service.service';
import { NgForm } from '@angular/forms';
import { UserDataServiceService } from '../services/user-data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(public modelSvc: UserModelServiceService,
    private dataSvc: UserDataServiceService) { }

  ngOnInit(): void {
    this.modelSvc.setDefaultUser();
  }

  onSave(loginForm: NgForm) {
    this.dataSvc.onLogin(this.modelSvc.user).subscribe({
      next: (data) => {
        // This function runs when the Observable emits a value (i.e., the request succeeds)
        console.log('User saved successfully', data);
      },
      error: (error) => {
        // This function runs when the Observable emits an error (i.e., the request fails)
        console.log('Error saving user', error);
      },
    });
  }

}
