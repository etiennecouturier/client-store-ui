import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService,
              private router: Router) {
  }

  submit() {
    if (this.userForm.valid) { this.login(); }
  }

  login() {
    const val = this.userForm.value;
    this.authService.login(val.username, val.password)
      .subscribe(
        authResult => {
          localStorage.setItem('access_token', authResult.jwt);
          this.router.navigateByUrl('/');
        }
      );
  }

  public hasError (controlName: string, errorName: string) {
    return this.userForm.controls[controlName].hasError(errorName);
  }

}
