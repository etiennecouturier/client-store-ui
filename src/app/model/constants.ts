import {Visit} from './visit';
import {Client} from './client';

export class Constants {

  static emptyClient(): Client {
    return {
      id: null,
      name: null,
      dob: null,
      tel: null,
      email: null,
      visits: []
    };
  }

  static emptyVisit(): Visit {
    return {
      date: new Date(),
      historicExam: {
        rightEye: {
          dioptria: null,
          cilinder: null,
          fok: null,
          vizus: null,
          szaruGorbulet: null
        },
        leftEye: {
          dioptria: null,
          cilinder: null,
          fok: null,
          vizus: null,
          szaruGorbulet: null
        }
      },
      exam: {
        rightEye: {
          dioptria: null,
          cilinder: null,
          fok: null,
          vizus: null,
          szaruGorbulet: null
        },
        leftEye: {
          dioptria: null,
          cilinder: null,
          fok: null,
          vizus: null,
          szaruGorbulet: null
        }
      },
      contactLenseExam: {
        rightEye: {
          dioptria: null,
          cilinder: null,
          fok: null,
          vizus: null,
          szaruGorbulet: null
        },
        leftEye: {
          dioptria: null,
          cilinder: null,
          fok: null,
          vizus: null,
          szaruGorbulet: null
        }
      },
      contactLenseNotes: null,
      examNotes: null,
      shoppingNotes: null
    };
  }

}
