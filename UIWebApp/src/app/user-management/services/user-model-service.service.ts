import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserModelServiceService {
  user: User;
  userForm : UntypedFormGroup;

  constructor() { }
  
  setDefaultUser(){
    this.user = new User();
  }
}
