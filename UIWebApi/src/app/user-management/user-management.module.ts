import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';


@NgModule({
  declarations: [DashboardComponent, UserRegistrationComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    
  ]
})
export class UserManagementModule { }
