import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  // Public routes
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      // Other public routes like 'register', 'forgot-password', etc.
    ],
  },
  // Protected routes
  {
    path: '',
    canActivateChild: [AuthGuard], // Applying AuthGuard to all child routes
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'user-registration',
        component: UserRegistrationComponent,
      },
      // Add more protected routes here
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
