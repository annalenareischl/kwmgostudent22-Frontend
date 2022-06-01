import {User} from "./user";

export class UserFactory {
  static empty() : User {
    return new User(0, "",  "", "", "", false, 0, "");
  }

  static fromObject (rawUser: any):User{
    return new User(
      rawUser.id,
      rawUser.uID,
      rawUser.firstname,
      rawUser.lastname,
      rawUser.email,
      //rawUser.password,
      rawUser.is_teacher,
      rawUser.semester,
      rawUser.description
    );
  }
}
