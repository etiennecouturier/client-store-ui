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
      rightEye: {
        dioptria: null,
        cilinder: null,
        fok: null,
        vizus: null
      },
      leftEye: {
        dioptria: null,
        cilinder: null,
        fok: null,
        vizus: null
      },
      examNotes: null,
      shoppingNotes: null
    };
  }

}
