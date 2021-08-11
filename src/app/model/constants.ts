import {Visit} from './visit';
import {Client} from './client';

export class Constants {

  static emptyClient(): Client {
    return {
      id: null,
      name: null,
      dob: null,
      age: null,
      sex: null,
      tel: null,
      email: null,
      visits: []
    };
  }

  static emptyVisit(): Visit {
    return {
      id: null,
      date: new Date(),
      historicExam: {
        rightEye: {
          dioptria: null,
          cilinder: null,
          fok: null,
          vizus: null,
          szaruGorbulet: null,
          add: null,
          pd: null,
          bifoMag: null
        },
        leftEye: {
          dioptria: null,
          cilinder: null,
          fok: null,
          vizus: null,
          szaruGorbulet: null,
          add: null,
          pd: null,
          bifoMag: null
        },
        notes: null
      },
      exam: {
        rightEye: {
          dioptria: null,
          cilinder: null,
          fok: null,
          vizus: null,
          szaruGorbulet: null,
          add: null,
          pd: null,
          bifoMag: null
        },
        leftEye: {
          dioptria: null,
          cilinder: null,
          fok: null,
          vizus: null,
          szaruGorbulet: null,
          add: null,
          pd: null,
          bifoMag: null
        },
        notes: null
      },
      contactLenseExam: {
        rightEye: {
          dioptria: null,
          cilinder: null,
          fok: null,
          vizus: null,
          szaruGorbulet: null,
          add: null,
          pd: null,
          bifoMag: null
        },
        leftEye: {
          dioptria: null,
          cilinder: null,
          fok: null,
          vizus: null,
          szaruGorbulet: null,
          add: null,
          pd: null,
          bifoMag: null
        },
        notes: null
      },
      fees: {
        frame: null,
        rightLense: null,
        leftLense: null,
        service: null,
        exam: null,
        other: null,
        discountPercent: null,
        paid: null,
        total: null,
        discountAmount: null,
        toBePaid: null,
      },
      otherInfo: {
        frame: null,
        lense: null
      }
    };
  }

}
