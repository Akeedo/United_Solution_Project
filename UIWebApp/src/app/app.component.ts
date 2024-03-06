import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UIWebApp';

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
