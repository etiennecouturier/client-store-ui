import {Visit} from './visit';
import {DateTime} from 'luxon';

export interface Client {
  id: string;
  name: string;
  dob: DateTime;
  age: number;
  sex: string;
  tel: string;
  email: string;
  visits: Visit[];
}
