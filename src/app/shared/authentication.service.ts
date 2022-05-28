import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import jwt_decode from "jwt-decode";

//npm install --save-dev jwt-decode
interface Token {
  exp: number;
  user: {
    id: string;
  };
}

@Injectable()
export class AuthenticationService {
  private api =
    "http://kwmgostudent.s1910456024.student.kwmhgb.at/api/auth";

//'http://localhost:8080/api/auth';
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }


  /*
  TODO: user_id -> uID ?
  in meinem user.ts h
  */

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("user_id"));
  }

/*
  public getCurrentUserId() {
    return String(<string>sessionStorage.getItem("uID"));
  }

 */

  public setSessionStorage(token: string) {
    //console.log("Storing token");
    //console.log(jwt_decode(token));
    const decodedToken = jwt_decode(token) as Token;
    //console.log(decodedToken);
    //console.log(decodedToken.user.id);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user_id", decodedToken.user.id);
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_id");
    console.log("logged out");
  }

  public isLoggedIn() {
    if (sessionStorage.getItem("token")) {
      let token: string = <string>sessionStorage.getItem("token");
      //console.log(jwt_decode(token));
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        //console.log("token expired");
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


}