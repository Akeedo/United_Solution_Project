import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private authService: AuthService) { }

  isAdminLoggedIn(){
    return this.authService.isAdminLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
