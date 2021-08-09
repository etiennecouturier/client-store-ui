import {Component, Input, OnInit} from '@angular/core';
import {Exam} from '../../model/exam';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'contact-lense',
  templateUrl: './contact-lense.component.html',
  styleUrls: ['./contact-lense.component.css']
})
export class ContactLenseComponent implements OnInit {

  @Input() contactLenseExam: Exam;

  contactLenseForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.contactLenseForm = this.formBuilder.group({
      rightSzaruGorbulet: [this.contactLenseExam.rightEye.szaruGorbulet],
      rightDioptria: [this.contactLenseExam.rightEye.dioptria],
      rightCilinder: [this.contactLenseExam.rightEye.cilinder],
      rightFok: [this.contactLenseExam.rightEye.fok],
      leftSzaruGorbulet: [this.contactLenseExam.leftEye.szaruGorbulet],
      leftDioptria: [this.contactLenseExam.leftEye.dioptria],
      leftCilinder: [this.contactLenseExam.leftEye.cilinder],
      leftFok: [this.contactLenseExam.leftEye.fok],
      notes: [this.contactLenseExam.notes]
    });

    this.contactLenseForm.valueChanges.pipe(
      debounceTime(500),
      switchMap(formValue => Observable.create(console.log(this.contactLenseForm))),
    ).subscribe(res => console.log('Saved'));
  }

}
