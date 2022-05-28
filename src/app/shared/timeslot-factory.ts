import {Timeslot} from "./timeslot";

export class TimeslotFactory {
  static empty() : Timeslot {
    return new Timeslot(0, new Date(), new Date(), new Date(), true);
  }

  static fromObject (rawTimeslot: any):Timeslot{
    return new Timeslot(
      rawTimeslot.id,
      rawTimeslot.day,
      rawTimeslot.from,
      rawTimeslot.to,
      rawTimeslot.is_available
    );
  }
}
