import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-home',
  template: `

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    <div class="ui container">
      <h1>Die KWM-Nachhilfe Plattform</h1>
      <p>Von Studierenden, für Studierenden</p>
      <a routerLink="../courses" class="ui red button">Zu den Kurse</a>


    </div>
    </body>

  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  helloUserFirstname() {
    return sessionStorage["firstname"];
  }

}
