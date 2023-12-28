import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { programingData } from '../../../mock/programing';
import { libraryFrameworkData } from '../../../mock/libraryFramework';
import { developmentToolData } from '../../../mock/developmentTool';
import { databaseData } from '../../../mock/database';
import { BaseComponent } from '../../../framework/BaseComponent';
import { UtilCommon } from '../../../util/UtilCommon';

declare var DonutChart: any;

type DataType = {
  key: number;
  name: string;
  value: number;
  color: string;
  part: string;
};

type CategoryMapValuType = {
  data: DataType[];
  graphId: string;
  opacityList: string[];
};

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent extends BaseComponent implements OnInit, AfterViewInit {
  /** 経験データ格納リスト */
  dataList: DataType[][] = [];
  /** 表示カテゴリID */
  showCategoryId = '0';
  /** 凡例データ */
  legendDataList: DataType[] = [];
  /** 凡例データの透過度リスト */
  opacityLegendDataList: string[] = [];

  categoryMap = new Map<string, CategoryMapValuType>();

  constructor(private changeDetector: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.dataList.push(this.getSortedData(programingData));
    this.dataList.push(this.getSortedData(libraryFrameworkData));
    this.dataList.push(this.getSortedData(developmentToolData));
    this.dataList.push(this.getSortedData(databaseData));

    this.setCategoryMap(this.dataList, this.categoryMap);

    this.legendDataList = UtilCommon.deepCopy(this.dataList[0]);
    this.opacityLegendDataList = this.categoryMap.get(this.showCategoryId)?.opacityList || [];
  }

  ngAfterViewInit(): void {
    this.drawChart(this.showCategoryId);
    DonutChart.mouseOverDonutChart(this.mouseOverDonutCb.bind(this));
    DonutChart.mouseOutDonutChart(this.mouseOutDonutCb.bind(this));
  }

  /**
   * サブタブボタンクリック処理
   * @param clickedTabBtnVal
   * @returns
   */
  clickedTabBtn(clickedTabBtnVal: string) {
    if (UtilCommon.isEqual(clickedTabBtnVal, this.showCategoryId)) return;

    this.showCategoryId = clickedTabBtnVal;
    const categoryMapData = this.categoryMap.get(this.showCategoryId);

    if (!categoryMapData) return;

    this.legendDataList = categoryMapData.data;
    this.opacityLegendDataList = this.categoryMap.get(this.showCategoryId)?.opacityList || [];

    this.changeDetector.detectChanges();
    this.drawChart(this.showCategoryId);
  }

  /**
   * 凡例マウスオーバー処理
   * @param showCategoryId
   * @param row
   * @oaran i
   * @returns
   */
  mouseOverLegend(showCategoryId: string, row: DataType, i: number) {
    const categoryMapData = this.categoryMap.get(showCategoryId);
    if (!categoryMapData) return;

    this.setFocusOpacity(categoryMapData, i);
    DonutChart.mouseOverLegend(categoryMapData.graphId, row);
  }

  /**
   * 凡例マウスアウト処理
   * @param showCategoryId
   * @returns
   */
  mouseOutLegend(showCategoryId: string) {
    const categoryMapData = this.categoryMap.get(showCategoryId);
    if (!categoryMapData) return;

    this.setDefaultOpacity(categoryMapData);
    DonutChart.mouseOutLegend(categoryMapData.graphId);
  }

  /**
   * データを値の昇順にする
   * @param data
   * @returns
   */
  private getSortedData(data: DataType[]) {
    return data.sort((a, b) => {
      if (a.value > b.value) return -1;
      else if (a.value < b.value) return 1;
      else return 0;
    });
  }

  /**
   * カテゴリマップにデータをセットする
   * @param dataList
   * @param categoryMap
   * @returns
   */
  private setCategoryMap(dataList: DataType[][], categoryMap: Map<string, CategoryMapValuType>) {
    for (let i = 0; i < dataList.length; i++) {
      const value = this.ctoption.experienceTabOptions[i].value;
      const graphId = this.ctoption.experienceTabOptions[i].graphId;
      if (!graphId) return;

      const opacityList = this.getOpacityList(dataList[i]);
      categoryMap.set(value, {
        data: dataList[i],
        graphId: graphId,
        opacityList: opacityList,
      });
    }
  }

  /**
   * 透過度をセットする
   * @param data
   * @returns
   */
  private getOpacityList(data: DataType[]): string[] {
    const DEFAULT_OPACITY_VALUE = '1';
    const opacityList: string[] = [];
    data.forEach(() => {
      opacityList.push(DEFAULT_OPACITY_VALUE);
    });

    return opacityList;
  }

  /**
   * 凡例をマウスオーバーしたもののみフォーカスする
   * @param categoryMapData
   * @param hoverIndex
   */
  private setFocusOpacity(categoryMapData: CategoryMapValuType, hoverIndex: number) {
    const opacityList = categoryMapData.opacityList;
    for (let i = 0; i < opacityList.length; i++) {
      if (hoverIndex === i) {
        opacityList[i] = '1';
      } else {
        opacityList[i] = '0.3';
      }
    }
  }

  /**
   * 凡例をデフォルトの透明度にする
   * @param categoryMapData
   */
  private setDefaultOpacity(categoryMapData: CategoryMapValuType) {
    const opacityList = categoryMapData.opacityList;
    for (let i = 0; i < opacityList.length; i++) {
      opacityList[i] = '1';
    }
  }

  /**
   * ドーナツチャートのマウスオーバー時のコールバック処理
   * @param data
   * @returns
   */
  private mouseOverDonutCb(data: any) {
    const categoryData = this.categoryMap.get(this.showCategoryId);
    if (!categoryData) return;

    this.setFocusOpacity(categoryData, data.index);
  }

  /**
   * ドーナツチャートのマウスアウト時のコールバック処理
   * @param data
   * @returns
   */
  private mouseOutDonutCb(data: any) {
    const categoryData = this.categoryMap.get(this.showCategoryId);
    if (!categoryData) return;

    this.setDefaultOpacity(categoryData);
  }

  /**
   * ドーナツチャートを描画する処理を呼ぶ処理
   * @param showCategoryId
   * @returns
   */
  private drawChart(showCategoryId: string) {
    const obj = this.categoryMap.get(showCategoryId);
    if (!obj) return;

    this.createChart(obj.data, obj.graphId, 300, 300);
  }

  /**
   * ドーナツチャートを描画する
   * @param data
   * @param graphId
   * @param minWidth
   * @param minHeight
   */
  private createChart(data: any, graphId: string, minWidth: number, minHeight: number) {
    DonutChart.drawDonutChart(data, graphId, minWidth, minHeight);
  }
}
