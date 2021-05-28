import {Visit} from './visit';

export class Constants {

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
      notes: null
    };
  }

}
