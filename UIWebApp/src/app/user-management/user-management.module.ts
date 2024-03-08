import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { FormsModule } from '@angular/forms';
import { RedOnEmptyDirective } from '../shared/directives/red-on-empty.directive';
import { LoginComponent } from '../auth/login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [DashboardComponent, UserRegistrationComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule,
   ]
})
export class UserManagementModule { }
