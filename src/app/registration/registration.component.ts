import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

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

  }

  register() {

  }

}
