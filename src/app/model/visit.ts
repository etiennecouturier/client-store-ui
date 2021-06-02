import {Eye} from './eye';

export interface Visit {
  date: Date;
  rightEye: Eye;
  leftEye: Eye;
  examNotes: string;
  shoppingNotes: string;
}
