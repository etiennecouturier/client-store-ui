import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Visit} from '../../model/visit';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, switchMap, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'other-info',
  templateUrl: './other-info.component.html',
  styleUrls: ['./other-info.component.css']
})
export class OtherInfoComponent implements OnInit {

  @Input() visit: Visit;

  otherInfoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.otherInfoForm = this.formBuilder.group({
      frame: [this.visit.frame],
      lense: [this.visit.lense],
    });

    this.otherInfoForm.valueChanges.pipe(
      debounceTime(500),
      switchMap(formValue => Observable.create(console.log(formValue))),
    ).subscribe(res => console.log('Saved'));
  }

}
