import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { programingData } from '../../../mock/programing';
import { libraryFrameworkData } from '../../../mock/libraryFramework';
import { developmentToolData } from '../../../mock/developmentTool';
import { databaseData } from '../../../mock/database';
import { BaseComponent } from '../../../framework/BaseComponent';
import { CtType } from 'src/app/constants/CtType';
import { UtilCommon } from '../../../util/UtilCommon';

declare var DonutChart: any;

type DataType = {
  key: number;
  name: string;
  value: number;
  color: string;
  part: string;
};

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent extends BaseComponent implements OnInit, AfterViewInit {
  programingData: DataType[] = programingData;
  libraryFrameworkData: DataType[] = libraryFrameworkData;
  developmentToolData: DataType[] = developmentToolData;
  databaseData: DataType[] = databaseData;

  showCategoryId = '0';
  legendData: DataType[];

  categoryMap = new Map<
    string,
    { data: DataType[]; id: string; minWidth: number; minHeight: number }
  >();

  constructor(private changeDetector: ChangeDetectorRef) {
    super();

    this.legendData = UtilCommon.deepCopy(programingData);
  }

  ngOnInit(): void {
    this.categoryMap.set(CtType.programingLanguage, {
      data: this.programingData,
      id: 'donut-chart-programing',
      minWidth: 300,
      minHeight: 300,
    });
    this.categoryMap.set(CtType.frameworkLibrary, {
      data: this.libraryFrameworkData,
      id: 'donut-chart-library-framework',
      minWidth: 300,
      minHeight: 300,
    });
    this.categoryMap.set(CtType.tool, {
      data: this.developmentToolData,
      id: 'donut-chart-development-tool',
      minWidth: 300,
      minHeight: 300,
    });
    this.categoryMap.set(CtType.db, {
      data: this.databaseData,
      id: 'donut-chart-database',
      minWidth: 300,
      minHeight: 300,
    });
  }

  ngAfterViewInit(): void {
    this.drawChart(this.showCategoryId);
  }

  clickedTabBtn(clickedTabBtnVal: string) {
    if (UtilCommon.isEqual(clickedTabBtnVal, this.showCategoryId)) return;

    this.showCategoryId = clickedTabBtnVal;
    const categoryMapData = this.categoryMap.get(this.showCategoryId);

    if (!categoryMapData) return;

    this.legendData = categoryMapData.data;
    this.changeDetector.detectChanges();
    this.drawChart(this.showCategoryId);
  }

  mouseOverLegend(showCategoryId: string, row: DataType) {
    const categoryMapData = this.categoryMap.get(showCategoryId);
    if (!categoryMapData) return;

    DonutChart.mouseOverLegend(categoryMapData.id, row);
  }

  mouseOutLegend(showCategoryId: string) {
    const categoryMapData = this.categoryMap.get(showCategoryId);
    if (!categoryMapData) return;
    DonutChart.mouseOutLegend(categoryMapData.id);
  }

  private createChart(data: any, id: string, minWidth: number, minHeight: number) {
    DonutChart.drawDonutChart(data, id, minWidth, minHeight);
  }

  private drawChart(showCategoryId: string) {
    const obj = this.categoryMap.get(showCategoryId);
    if (!obj) return;

    this.createChart(obj.data, obj.id, obj.minWidth, obj.minHeight);
  }
}
