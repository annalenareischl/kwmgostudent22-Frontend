import { Timeslot } from "./timeslot";
export { Timeslot } from "./timeslot";
import { User } from "./user";
export { User } from "./user";

export class Course {

  constructor(
    public id: number,
    public cID: string,
    public title: string,
    public semester: number,
    public description: string,
    public user_id: number,
    public user: User,
    public timeslot?: Timeslot[],
    public comment?: string
  ) {
  }
}

