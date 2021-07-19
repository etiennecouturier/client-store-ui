import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

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

  constructor(private authService: AuthService,
              private router: Router) {
  }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
    console.log('hello');
    this.login();
  }

  login() {
    const val = this.form.value;
    this.authService.login(val.username, val.password)
      .subscribe(
        authResult => {
          localStorage.setItem('access_token', authResult.jwt);
          console.log('User is logged in');
          this.router.navigateByUrl('/');
        }
      );
  }

}
