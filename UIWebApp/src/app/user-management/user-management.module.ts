import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { FormsModule } from '@angular/forms';
import { RedOnEmptyDirective } from '../shared/directives/red-on-empty.directive';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '../shared/states/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../shared/states/auth.effects';


@NgModule({
  declarations: [DashboardComponent, UserRegistrationComponent, LoginComponent, RedOnEmptyDirective],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    
  ]
})
export class UserManagementModule { }
