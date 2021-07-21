import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  userForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private userService: UserService,
              private router: Router) {
  }

  submit() {
    if (this.userForm.valid) {
      this.submitEM.emit(this.userForm.value);
    }
    this.register();
  }

  register() {
    this.userService.createUser(this.userForm.value)
      .subscribe(newUser => {
        console.log(newUser);
        this.router.navigate(['login']);
      });
  }

}
