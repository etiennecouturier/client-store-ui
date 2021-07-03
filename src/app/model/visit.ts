import {Exam} from './exam';
import {Fees} from './fees';

export interface Visit {
  date: Date;
  historicExam: Exam;
  exam: Exam;
  contactLenseExam: Exam;
  shoppingNotes: string;
  fees: Fees;
}
