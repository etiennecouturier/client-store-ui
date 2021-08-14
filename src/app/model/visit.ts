import {Exam} from './exam';
import {Fees} from './fees';
import {OtherInfo} from './other-info';
import {DateTime} from 'luxon';

export interface Visit {
  id: string;
  date: DateTime;
  historicExam: Exam;
  exam: Exam;
  contactLenseExam: Exam;
  fees: Fees;
  otherInfo: OtherInfo;
}
