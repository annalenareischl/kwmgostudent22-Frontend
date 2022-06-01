import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from "../shared/course";
import {CourseStorageService} from "../shared/course-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseFactory} from "../shared/course-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'bs-course-details',
  templateUrl: './course-details.component.html',
  styles: [
  ]
})
export class CourseDetailsComponent implements OnInit{

  course: Course = CourseFactory.empty();
  clicked = false;

  constructor(
    private cs: CourseStorageService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService
    ) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.cs.getOneCourse(params['cID']).subscribe(c => this.course = c);
  }


  removeCourse(){
    if (confirm('Soll der Kurs gelöscht werden?')){
      this.cs.remove(this.course.cID).subscribe(res=> this.router.navigate(['../'], {relativeTo: this.route}));
    }
  }


  setBooked(i: number) {
    if(this.course.timeslot){
      this.course.timeslot[i].is_available=false;
      this.cs.update(this.course).subscribe(res => this.course = res);
    }
  }

  isTeacher(){

    if(sessionStorage["is_teacher"]=="1"){
      return true;
    }
    else return false;
  }


  isAuthor() {
    if(this.course.user_id==this.authService.authorsID()) {
      return true;
    }
    else return false;
  }


  sendComment() {
    console.log("es wurde ein Terminvorschlag gesendet.");
  }
}
