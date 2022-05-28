import { Course } from "./course";
export { Course } from "./course";
import { User } from "./user";
export { User } from "./user";
export class Timeslot {
  constructor(
    public id: number,
    public day: Date,
    public from: string,
    public to: string,
    public is_available: boolean
  ) {
  }
}
