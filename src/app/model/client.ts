import {Visit} from "./visit";

export interface Client {
  id: string;
  name: string;
  dob: string;
  tel: string;
  email: string;
  visits: Visit[];
}
