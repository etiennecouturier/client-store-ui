import {Visit} from "./visit";

export interface Client {
  id: string;
  name: string;
  dob: string;
  age: number;
  sex: string;
  tel: string;
  email: string;
  visits: Visit[];
}
