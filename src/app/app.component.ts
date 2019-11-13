import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tour-of-heroes';
  showSearchBar = false;

  constructor(private location : Location){}

  goBack(): void {
    this.location.back();
  }

}
