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
    this.drawChart(this.lineGraphObj.data, this.lineGraphObj.graphId, this.checkedMap);
  }

  /**
   * チェックボックスをクリックした時に発火する処理
   */
  onCheck() {
    this.drawChart(this.lineGraphObj.data, this.lineGraphObj.graphId, this.checkedMap);
  }

  /**
   * 折れ線グラフを描画する
   * @param data
   * @param graphId
   * @param checkedMap
   */
  private drawChart(data: LineDataType[], graphId: string, checkedMap: Map<number, boolean>) {
    const isForPcDeviceSize = window.matchMedia('(min-width: 800px)').matches;
    if (isForPcDeviceSize) {
      LineChart.drawLineChart(data, graphId, checkedMap, 400, 400);
    } else {
      LineChart.drawLineChart(data, graphId, checkedMap, 350, 350);
    }
  }
}
