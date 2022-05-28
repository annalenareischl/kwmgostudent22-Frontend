import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from "@angular/forms";
import {CourseFormErrorMessages} from "./course-form-error-messages";
import {CourseFactory} from "../shared/course-factory";
import {CourseStorageService} from "../shared/course-storage.service";
import {Course, User} from "../shared/course";
import {UserFactory} from "../shared/user-factory";

import {formatDate} from "@angular/common";
import {AuthenticationService} from "../shared/authentication.service";



@Component({
  selector: 'bs-course-form',
  templateUrl: './course-form.component.html'
})


export class CourseFormComponent implements OnInit {
  course = CourseFactory.empty();
  errors: { [key: string]: string } = {};
  courseForm: FormGroup;
  isUpdatingCourse = false;
  timeslots: FormArray;


  constructor(
    private fb: FormBuilder,
    private bs: CourseStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.courseForm = this.fb.group({});
    this.timeslots = this.fb.array([]);

  }

  /*
  - Form initialisieren
  - First: Abfrage nach cID
     -> editierbares Form + Details sichtbar
   */
  ngOnInit() {
    const cID = this.route.snapshot.params["cID"];
    if (cID) {
      this.isUpdatingCourse = true;
      this.bs.getOneCourse(cID).subscribe(course => {
        this.course = course;
        this.initCourse();
      });
    }
    this.initCourse();
  }

  /*
  - Kurs initialisieren
  - mit FormBuilder Form Model anlegen
   */
 /*
  initCourse() {
    this.courseForm = this.fb.group({
      id: this.course.id,
      title: [this.course.title, Validators.required],
      //semester: this.course.semester,
      semester: [this.course.semester, [Validators.min(1), Validators.max(6)]],
      cID: this.course.cID,
      description: this.course.description
    });
    this.courseForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  */

  initCourse(){
    this.buildSlotsArray();

    this.courseForm = this.fb.group({
      id: this.course.id,
      cID: this.course.cID,
      title: [this.course.title, Validators.required],
      description: this.course.description,
      semester: [this.course.semester,
        [
        Validators.min(1),
          Validators.max(6)
        ]
      ],
      user_id: this.course.user_id,
      timeslots: this.timeslots
    });

    this.courseForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }
/*

  addTimeslotsControl() {
    if (this.course.timeslot) {
      this.timeslots = this.fb.array([]);
      for (let img of this.course.timeslot) {
        let fg = this.fb.group({
          id: new FormControl(img.id),
          day: new FormControl(img.day, [Validators.required]),
          from: new FormControl(img.from, [Validators.required]),
          to: new FormControl(img.to, [Validators.required]),
          is_available: new FormControl(img.is_available, [Validators.required])
        });
        this.timeslots.push(fg);
      }
    }
  }

 */





  submitForm() {
// filter empty values
    const course: Course = CourseFactory.fromObject(this.courseForm.value); //just copy the authors
    if (this.isUpdatingCourse) {
      this.bs.update(course).subscribe(res => {
        this.router.navigate(["../../courses", course.cID], {
          relativeTo: this.route
        });
      });
    } else {
      //todo: auf aktueller user umschreiben
      //const user: User = UserFactory.fromObject(this.courseForm.value); //just copy the authors
      course.user_id = 1; // just for testing
      console.log(course);
      this.bs.create(course).subscribe(res => {
        this.course = CourseFactory.empty();
        this.courseForm.reset(CourseFactory.empty());
        this.router.navigate(["../courses"], {relativeTo: this.route});
      });
    }
  }




  updateErrorMessages() {
    console.log("Is invalid? " + this.courseForm.invalid);
    this.errors = {};
    for (const message of CourseFormErrorMessages) {
      const control = this.courseForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors &&
        control.errors[message.forValidator] && !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }


  buildSlotsArray(){
    if (this.course.timeslot){
      this.timeslots = this.fb.array([]);
      for(let s of this.course.timeslot){
        let sg = this.fb.group({
          id: new FormControl(s.id),
          day: new FormControl(formatDate(new Date(s.day), 'dd.MM.YYYY', 'en')),//formatDate(new Date(s.day), 'YYYY-MM-dd', 'en')
          from: new FormControl(s.from),
          to: new FormControl(s.to),
          is_available: new FormControl(s.is_available)
        });
        console.log(s.from);
        console.log(formatDate(new Date(s.day), 'dd.MM.YYYY', 'en'));

        this.timeslots.push(sg);
        console.log(this.course.timeslot);
      }
    }
  }

  addTimeslotsControl() {
    this.timeslots.push(this.fb.group(
      {id:0,
        day: null,
        from: null,
        to: null,
        is_available: true
      }));
    console.log(this.timeslots);
  }
}

