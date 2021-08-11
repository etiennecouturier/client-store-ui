import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private userService: UserService,
              private router: Router,
              private notifierService: NotifierService) {
  }

  submit() {
    if (this.userForm.valid) { this.register(); }
  }

  register() {
    this.userService.createUser(this.userForm.value)
      .subscribe(() => {
        this.notifierService.notify('success', 'sikeres regisztráció');
        this.router.navigate(['login']);
      });
  }

  public hasError (controlName: string, errorName: string) {
    return this.userForm.controls[controlName].hasError(errorName);
  }

}
