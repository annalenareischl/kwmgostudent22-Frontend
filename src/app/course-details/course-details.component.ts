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
  //@Input() lalala: Course | undefined;
  //@Output() showListEvent = new EventEmitter<any>();

  course: Course = CourseFactory.empty();



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


  setBooked() {
    // @ts-ignore
    this.course.timeslot[0].is_available=false;
    // @ts-ignore
    console.log("Kurs um"+this.course.timeslot[0]+" gebucht");
  }



}
