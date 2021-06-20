import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  navLinks = [
    {location: '/clients', label: 'ügyfelek', icon: 'person'},
    { location: '/stats', label: 'statisztikák', icon: 'check_circle' }
  ];
}
