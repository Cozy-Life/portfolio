import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '../../../framework/BaseComponent';
import { bioDataList } from '../../../mock/bio';

type BioDataType = {
  year: string;
  month: string;
  content: string;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  bioDataList: BioDataType[] = [];
  isForPcDeviceSize = window.matchMedia('(min-width: 800px)').matches;

  constructor() {
    super();
  }

  ngOnInit() {
    for (let data of bioDataList) {
      this.bioDataList.push(data);
    }
  }
}
