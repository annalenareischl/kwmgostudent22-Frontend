import {Component} from '@angular/core';
//import {Course} from "./shared/course";
import {AuthenticationService} from "./shared/authentication.service";
import {Course} from "./shared/course";
import {CourseFactory} from "./shared/course-factory";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  course: Course = CourseFactory.empty();
  constructor(private authService: AuthenticationService) {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getLoginLabel() {
    if (this.isLoggedIn()) {
      return "Logout";
    } else {
      return "Login";
    }
  }

  logout() {
    this.authService.logout();
  }

  isTeacher(){
    //console.log(sessionStorage);
    if(sessionStorage["is_teacher"]=="1")
      return true;
    else return false;
  }

  helloUserFirstname() {
    return sessionStorage["firstname"];
  }

  helloUserLastname() {
    return sessionStorage["lastname"];
  }

}


