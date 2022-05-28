import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";
import {Course, User} from "../shared/course";
import {CourseFactory} from "../shared/course-factory";
import {CourseStorageService} from "../shared/course-storage.service";
import {UserFactory} from "../shared/user-factory";

interface Response {
  access_token: string;
}

@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  course: Course = CourseFactory.empty();
  user: User = UserFactory.empty();

  constructor(
    private cs: CourseStorageService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  login() {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe((res: any) => {
        console.log(res);
        this.authService.setSessionStorage((res as
          Response).access_token);
        this.router.navigateByUrl("/");
      });
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

  showName(){
    console.log(this.user.firstname);
    return this.user.firstname;
  }
}


/*
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ){
    this.loginForm = this.fb.group({});
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required] });
  }
  login() {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe((res:
                                                                      any) => {
        console.log(res);
        this.authService.setSessionStorage((res as
          Response).access_token);
        this.router.navigateByUrl("/");
      });
    } }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  logout() {
    this.authService.logout();
  } }

 */
