import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'facturas';

  auth = false;
  constructor(private Location:Location) {
    this.auth = this.Location.path() === "/login" ? false : true;
    
  }
}
