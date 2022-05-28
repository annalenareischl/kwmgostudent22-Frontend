import { Timeslot } from "./timeslot";
export { Timeslot } from "./timeslot";
import { Course } from "./course";
export { Course } from "./course";

export class User {
  constructor(
    public id: number,
    public uID: string, //zus. ID damit wir
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public is_teacher: boolean,
    public semester?: number,
    public description?: string
     ) {
  }
}
