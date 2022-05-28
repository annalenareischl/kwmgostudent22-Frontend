import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-home',
  template: `
    <div class="ui container">
      <h1>Die KWM-Nachhilfe Plattform</h1>
      <p>Von Studierenden, für Studierenden</p>
      <a routerLink="../courses" class="ui red button">Kurse</a>
    </div>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
