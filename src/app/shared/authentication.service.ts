import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import jwt_decode from "jwt-decode";
import {User} from "./user";

//npm install --save-dev jwt-decode
interface Token {
  exp: number;
  user: {
    id: string,
    uID: string,
    firstname: string,
    lastname: string,
    email: string,
    is_teacher: boolean,
    semester?: number,
    description?: string
  }
}

@Injectable()
export class AuthenticationService {
  private api =
    "http://kwmgostudent.s1910456024.student.kwmhgb.at/api/auth";

//'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }


  public setSessionStorage(token: string){
    const decodedToken = jwt_decode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user_id", decodedToken.user.id);
    sessionStorage.setItem("uID", decodedToken.user.uID);
    sessionStorage.setItem("firstname", decodedToken.user.firstname);
    sessionStorage.setItem("lastname", decodedToken.user.lastname);
    sessionStorage.setItem("is_teacher", String(decodedToken.user.is_teacher));
  }


  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_id");
    console.log("logged out");
  }

  //Prüft ob User angemeldet ist
  public isLoggedIn() {
    if (sessionStorage.getItem("token")) {
      let token: string = <string>sessionStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        sessionStorage.removeItem("token");
        return false;
      }
      return true;
    } else {
      return false;
    }
  }


  isLoggedOut() {
    return !this.isLoggedIn();
  }


  decodeToken(): User {
    if (sessionStorage.getItem("token")) {
      const decodedToken = jwt_decode(<string>sessionStorage.getItem("token")) as Token;
      return new User(
        +decodedToken.user.id,
        decodedToken.user.uID,
        decodedToken.user.firstname,
        decodedToken.user.lastname,
        decodedToken.user.email,
        +decodedToken.user.is_teacher == 1)

    } {
      return new User(0,
        '',
        '',
        '',
        '',
        true,
        0,
        '');
    }
  }

  //gibt aktuellen User (Session) zurück
  getCurrentUser() : User {
    return this.decodeToken();
  }


  //prüft ob User Nachhilfe-Gebender ist
  isTeacher(){
    if(sessionStorage["is_teacher"]=="1"){
      return true;
    }
    else return false;
  }

  //gibt die User ID des/der Ersteller/in zurück
  authorsID(){
    return sessionStorage["user_id"];
  }

}
