import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExperienceComponent } from '../../base/experience/experience.component';
import { extend } from 'lodash';

@Component({
  selector: 'app-parts-tab-group',
  templateUrl: './parts-tab-group.component.html',
  styleUrls: ['./parts-tab-group.component.scss'],
})
export class PartsTabGroupComponent {
  @Input()
  tabOptions: any;

  @Input()
  buttonClassName: any;

  @Input()
  tabWrapperClassName: any;

  @Input()
  showId = '0';

  @Output()
  clickedTabValue: EventEmitter<string> = new EventEmitter();

  clickedTabBtn(clickedTabBtnVal: string) {
    this.clickedTabValue.emit(clickedTabBtnVal);
  }
}
