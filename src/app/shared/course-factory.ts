import {Course, Timeslot, User} from "./course";

export class CourseFactory {
  static empty(): Course {
    return new Course(
      0,
      '',
      '',
      0,
      '',
      0,

      {
        id: 0,
        uID: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        is_teacher: false,
        semester: 0,
        description: ''
      },
      [{
        id: 0,
        day: new Date(),
        from: '',
        to: '',
        is_available: true
      }],
      '');
  }

  static fromObject(rawCourse: any): Course {
    return new Course(
      rawCourse.id,
      rawCourse.cID,
      rawCourse.title,
      rawCourse.semester,
      rawCourse.description,
      rawCourse.user,
      rawCourse.user_id,
      rawCourse.timeslots,
      rawCourse.comment
    );
  }
}
