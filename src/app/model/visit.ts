import {Exam} from './exam';
import {Fees} from './fees';

export interface Visit {
  id: string;
  date: Date;
  historicExam: Exam;
  exam: Exam;
  contactLenseExam: Exam;
  shoppingNotes: string;
  fees: Fees;
}
