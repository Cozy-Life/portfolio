import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '../../../framework/BaseComponent';
import { qualificationDataList } from 'src/app/mock/qualificationData';

type QualificationDataType = {
  year: string;
  month: string;
  name: string;
};

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.scss'],
})
export class QualificationComponent extends BaseComponent implements OnInit {
  qualilficationDataList: QualificationDataType[] = [];
  isForPcDeviceSize = window.matchMedia('(min-width: 800px)').matches;

  constructor() {
    super();
  }

  ngOnInit() {
    for (const data of qualificationDataList) {
      this.qualilficationDataList.push(data);
    }
  }
}
