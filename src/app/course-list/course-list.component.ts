import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Course} from "../shared/course";
import {User} from "../shared/user";
import {CourseStorageService} from "../shared/course-storage.service";

@Component({
  selector: 'bs-course-list',
  templateUrl: './course-list.component.html',
  styles: [
  ]
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];
  constructor(private cs: CourseStorageService) { }
  ngOnInit(): void {
    this.cs.getAll().subscribe(res =>this.courses = res);
    //this.courses = this.cs.getAll();
  }


}
