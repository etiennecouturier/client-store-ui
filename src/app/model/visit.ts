import {Exam} from './exam';
import {Fees} from './fees';
import {OtherInfo} from './other-info';

export interface Visit {
  id: string;
  date: Date;
  historicExam: Exam;
  exam: Exam;
  contactLenseExam: Exam;
  fees: Fees;
  otherInfo: OtherInfo;
}
