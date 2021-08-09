import {Component, Input} from '@angular/core';
import {Visit} from '../../model/visit';

@Component({
  selector: 'other-info',
  templateUrl: './other-info.component.html',
  styleUrls: ['./other-info.component.css']
})
export class OtherInfoComponent {

  @Input() visit: Visit;

}
