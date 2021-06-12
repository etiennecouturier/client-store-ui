import {Exam} from './exam';

export interface Visit {
  date: Date;
  historicExam: Exam;
  exam: Exam;
  contactLenseExam: Exam;
  contactLenseNotes: string;
  examNotes: string;
  shoppingNotes: string;
}
