import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tour-of-heroes';
  tabs = [
    { label: 'Dashboard', icon: 'airplanemode_active' },
    { label: 'Heroes', icon: 'hotel' }
  ];
}
