import { Component, HostListener, OnInit } from '@angular/core';
import { BaseComponent } from './framework/BaseComponent';
import { CtType } from './constants/CtType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'my-portfolio';
  showId = CtType.home;

  constructor() {
    super();
  }

  ngOnInit() {}

  /**
   * メインタブクリック処理
   * @param clickedMainTabBtnVal
   */
  clickedMainTab(clickedMainTabBtnVal: string) {
    this.showId = clickedMainTabBtnVal;
  }
}
