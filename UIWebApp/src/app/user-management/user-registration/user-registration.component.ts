import { Component, OnInit } from '@angular/core';
import { UserModelServiceService } from '../services/user-model-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit{

  userRegistrationForm: NgForm;

  constructor(public modelSvc: UserModelServiceService) { }
  ngOnInit(): void {
    this.modelSvc.setDefaultUser();
  }

  onSave(userForm: NgForm){
    console.log(this.modelSvc.user);
  }
}
