import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './framework/BaseComponent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'my-portfolio';
  showId = '0';

  constructor() {
    super();
  }

  ngOnInit() {}

  clickedMainTab(clickedMainTabBtnVal: string) {
    this.showId = clickedMainTabBtnVal;
  }
}
