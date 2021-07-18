import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  navLinks = [
    {location: '/clients', label: 'ügyfelek', icon: 'person'},
    {location: '/stats', label: 'statisztikák', icon: 'check_circle'},
    {location: '/login', label: 'kijelentkezés', icon: 'logout', action: () => this.authService.logout()}
  ];


  constructor(private authService: AuthService) {
  }

  userLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
