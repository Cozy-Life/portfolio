import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '../../../framework/BaseComponent';
import { lineGraphData } from '../../../mock/lineGraphData';

declare var LineChart: any;

type LineDataType = {
  key: number;
  title: string;
  color: string;
  like: { date: string; value: number; job: string }[];
};

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent extends BaseComponent implements OnInit {
  lineGraphObj: { data: LineDataType[]; graphId: string; legendId: string };
  checkedMap: Map<number, boolean>;

  constructor() {
    super();

    this.lineGraphObj = {
      data: lineGraphData,
      graphId: 'line-chart',
      legendId: 'legend-line-chart',
    };
    this.checkedMap = new Map();
    this.lineGraphObj.data.forEach((element) => {
      this.checkedMap.set(element.key, true);
    });
  }

  ngOnInit() {
    LineChart.drawLineChart(
      this.lineGraphObj.data,
      this.lineGraphObj.graphId,
      this.checkedMap,
      450,
      450
    );
  }
}
