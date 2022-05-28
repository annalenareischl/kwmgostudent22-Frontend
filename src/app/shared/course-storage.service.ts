import { Injectable } from '@angular/core';
import {Course, User} from "./course";
import {catchError, Observable, retry, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CourseStorageService {
  private api = 'http://kwmgostudent.s1910456024.student.kwmhgb.at/api';

  constructor(private http:HttpClient) {
    /*this.courses = [
      new Course(1, "OOP1", "OOP", 3, "lalla super Kurs",
        new User(1, "s1910456034", "Christina", "Wanke", "CW@web.de", "secret", false)),
      new Course(2, "WHM1", "WHM", 2,"lalla super Kurs",
        new User(1, "s1910456024", "Anna", "Reischl", "AR@web.de", "secret", false))
    ];*/
  }

  getOneCourse(cID: string): Observable<Course>{
    return this.http.get<Course>(`${this.api}/courses/identify/${cID}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));  }

  getAll(): Observable<Array<Course>>{
    return this.http.get<Array<Course>>(`${this.api}/courses`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  create(course: Course): Observable<any>{
    return this.http.post(`${this.api}/courses`, course)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(course: Course): Observable<any>{
    return this.http.put(`${this.api}/courses/${course.cID}`, course)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  remove(cID: string): Observable<any>{
    return this.http.delete(`${this.api}/courses/${cID}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }


  private errorHandler (error: Error | any): Observable<any>{
    return throwError(error);
  }

}
