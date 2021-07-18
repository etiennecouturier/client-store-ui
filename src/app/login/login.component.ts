import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {AuthResponse} from '../model/auth-response';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor( private authService: AuthService,
               private router: Router) {}

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
    console.log('hello');
    this.login();
  }

  login() {
    const val = this.form.value;

    // if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(
          authResult => {
            localStorage.setItem('id_token', authResult.jwt);
            console.log('User is logged in');
            this.router.navigateByUrl('/');
          }
        );
    // }
  }

}
