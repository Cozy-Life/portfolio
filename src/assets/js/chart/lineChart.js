(function (definition) {
  LineChart = definition();
})(function () {
  const LineChart = {
    drawLineChart: (data, id, checkedMap, minWidth, minHeight) => {
      const contents = d3.select('#' + id);
      const contentsWidth = Number(contents.style('width').replace(/px/, ''));
      const contentsHeight = (contentsWidth * minHeight) / minWidth;
      const WIDTH = d3.max([contentsWidth, minWidth]);
      const HEIGHT = d3.max([contentsHeight, minHeight]);
      const MARGIN = { TOP: 30, RIGHT: 30, BOTTOM: 60, LEFT: 60 };
      const plotWidth = WIDTH - MARGIN.LEFT - MARGIN.RIGHT;
      const plotHeight = HEIGHT - MARGIN.TOP - MARGIN.BOTTOM;

      const editData = getEditData(data);
      const checkedSortMaxValueData = getCheckedSortMaxValueData(editData, checkedMap);
      const bisectDate = d3.bisector((d) => d.date).left;

      const xMax = d3.max(editData[0].like, (like) => like.date);
      const xMin = d3.min(editData[0].like, (like) => like.date);

      const yMax = checkedSortMaxValueData[0]
        ? d3.max(checkedSortMaxValueData[0].like, (like) => like.value)
        : d3.max(editData[0].like, (like) => like.value);
      const yMin = checkedSortMaxValueData[0]
        ? d3.min(checkedSortMaxValueData[0].like, (like) => like.value)
        : d3.min(editData[0].like, (like) => like.value);

      const xScale = d3
        .scaleTime()
        .domain([xMin, xMax])
        .range([MARGIN.LEFT, WIDTH - MARGIN.RIGHT]);

      const yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([HEIGHT - MARGIN.BOTTOM, MARGIN.TOP]);

      const xAxis = d3
        .axisBottom(xScale)
        .ticks(d3.timeMonth.filter((d) => d.getMonth() === 6))
        .tickFormat(d3.timeFormat('%Y年'))
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickPadding(10);

      const yAxis = d3.axisLeft(yScale).ticks(5);

      const makeGridLineX = (xScale) => {
        return d3.axisBottom(xScale).ticks(d3.timeMonth.filter((d) => d.getMonth() === 0));
      };

      const makeGridLineY = (yScale) => {
        return d3.axisLeft(yScale);
      };

      // 再描画するために一度消してから描画する
      d3.selectAll('#' + id + ' *').remove();
      const svg = contents.append('svg').attr('width', WIDTH).attr('height', HEIGHT);
      svg
        .append('g')
        .attr('transform', 'translate(' + 0 + ',' + (HEIGHT - MARGIN.BOTTOM) + ')')
        .call(xAxis);

      svg
        .append('g')
        .attr('stroke', '#2e3ed')
        .attr('stroke-opacity', 0.1)
        .attr('transform', 'translate(' + 0 + ',' + (HEIGHT - MARGIN.BOTTOM) + ')')
        .call(
          makeGridLineX(xScale)
            .tickSizeInner(-plotHeight)
            .tickSizeOuter(0)
            .tickFormat((d) => '')
        );

      svg
        .append('g')
        .attr('transform', 'translate(' + MARGIN.LEFT + ',' + 0 + ')')
        .call(yAxis)
        .append('text')
        .attr('fill', 'black')
        .attr('x', -plotHeight / 2 - MARGIN.TOP)
        .attr('y', -35)
        .attr('transform', 'rotate(-90)')
        .attr('font-weight', 'bold')
        .attr('font-size', '10pt')
        .text('好き度');

      svg
        .append('g')
        .attr('stroke', '#2e3ed')
        .attr('stroke-opacity', 0.1)
        .attr('transform', 'translate(' + MARGIN.LEFT + ',' + 0 + ')')
        .call(
          makeGridLineY(yScale)
            .tickSizeInner(-plotWidth)
            .tickSizeOuter(0)
            .tickFormat((d) => '')
        )
        .selectAll('.tick')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4.2');

      // ホバー時のグリッド線
      const hoverLine = svg
        .append('line')
        .attr('class', 'grid-line')
        .attr('y1', MARGIN.TOP)
        .attr('y2', HEIGHT - MARGIN.BOTTOM)
        .attr('stroke', 'red')
        .attr('stroke-width', 1.4)
        .attr('display', 'none')
        .style('opacity', '0.5');

      const tooltip = contents
        .append('span')
        .attr('class', 'tooltip')
        .style('opacity', 0.7)
        .style('position', 'absolute')
        .style('background', '#000')
        .style('border-radius', 8 + 'px')
        .style('color', '#fff')
        .style('text-align', 'center')
        .style('pointer-events', 'none')
        .style('display', 'none')
        .style('top', 0 + 'px')
        .style('left', 0 + 'px')
        .style('padding', 10 + 'px')
        .style('white-space', 'nowrap');

      const tooltipYear = tooltip
        .append('div')
        .attr('class', 'year')
        .style('width', 100 + '%')
        .style('padding-top', 3 + 'px')
        .style('padding-bottom', 3 + 'px')
        .style('white-space', 'nowrap');

      const tooltipJob = tooltip
        .append('div')
        .attr('class', 'job')
        .style('width', 100 + '%')
        .style('padding-top', 3 + 'px')
        .style('padding-bottom', 3 + 'px')
        .style('white-space', 'nowrap');

      svg
        .append('rect')
        .attr('transform', 'translate(' + MARGIN.LEFT + ',' + MARGIN.TOP + ')')
        .attr('class', 'overlay')
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .attr('width', plotWidth)
        .attr('height', plotHeight)
        .on('mouseover', (e) => mouseOverLineChart())
        .on('mouseout', (e) => mouseOutLineChart())
        .on('mousemove', (e) => mouseMoveLineChart(e));

      // 各データの折れ線グラフを作成
      editData.forEach((d) => {
        const isChecked = checkedMap.get(d.key);
        createGraph(svg, d, isChecked, xScale, yScale);
      });

      function mouseOverLineChart() {
        tooltip.style('display', 'block');
        hoverLine.attr('display', 'block');
      }

      function mouseOutLineChart() {
        tooltip.style('display', 'none');
        hoverLine.attr('display', 'none');
      }

      function mouseMoveLineChart(e) {
        const mouseX = e.offsetX;
        const focusData = getFocusData(e);
        setTooltipData(focusData);
        tooltip
          .transition()
          .duration(200)
          .ease(d3.easeLinear)
          .style('left', mouseX + toolTipPosX(e) + 'px')
          .style('top', toolTipPosY(e) + 'px');

        // ホバー線の位置を設定
        hoverLine.attr('x1', mouseX).attr('x2', mouseX).attr('opacity', 1);
      }

      /**
       * マウス位置から1番近いデータを取得する
       * @param {*} event
       * @returns
       */
      function getFocusData(event) {
        // カーソルの位置からX軸の値を取得
        const x = xScale.invert(d3.pointer(event)[0] + MARGIN.LEFT);
        const i =
          bisectDate(editData[0].like, x, 1) < bisectDate(editData[0].like, xMax, 1)
            ? bisectDate(editData[0].like, x, 1)
            : bisectDate(editData[0].like, xMax, 1);

        const d0 = editData[0].like[i - 1];
        const d1 = editData[0].like[i];

        return x - d0.date > d1.date - x ? d1 : d0;
      }

      function setTooltipData(d) {
        tooltipYear.html(() => {
          const timeFormat = d3.timeFormat('%Y年%m月');
          return timeFormat(d.date);
        });
        tooltipJob.html(d.job);
      }

      function toolTipPosX(event) {
        const rightPos = 0;
        const toolTipPos =
          d3.pointer(event)[0] > plotWidth / 2
            ? -rightPos - tooltip.node().getBoundingClientRect().width
            : rightPos;
        return toolTipPos;
      }

      function toolTipPosY(event) {
        return d3.pointer(event)[1];
      }
    },
  };

  /**
   * データをグラフ用に編集する
   * 1. 好き度の日付をstring型からDate型にする
   * 2. 好き度の値の最大値を取得し、プロパティに追加
   * @param {*} data
   * @returns
   */
  function getEditData(data) {
    return data.map((d) => {
      return {
        key: d.key,
        title: d.title,
        color: d.color,
        like: d.like.map((like) => {
          return { date: new Date(like.date), value: like.value, job: like.job };
        }),
        maxValue: Math.max(...d.like.map((like) => like.value)),
      };
    });
  }

  /**
   * チェックの付いた好き度の最大値順にデータをソートする
   *
   * 「目的」：Y軸をチェックの付いたデータで動的にするため
   * @param {*} data
   * @param {*} checkedMap
   * @returns
   */
  function getCheckedSortMaxValueData(data, checkedMap) {
    return data
      .filter((data) => checkedMap.get(data.key))
      .sort((a, b) => {
        if (a.maxValue > b.maxValue) {
          return -1;
        } else if (a.MaxValue < b.maxValue) {
          return 1;
        } else {
          return 0;
        }
      });
  }

  /**
   * データを基に折れ線グラフを描画する
   * @param {*} svg
   * @param {*} dataSection
   * @param {*} isChecked
   * @param {*} xScale
   * @param {*} yScale
   * @returns
   */
  function createGraph(svg, dataSection, isChecked, xScale, yScale) {
    svg
      .append('path')
      .datum(dataSection.like)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('key', `${dataSection.key}`)
      .attr('stroke', dataSection.color)
      .attr('stroke-width', 4.0)
      .attr('visibility', isChecked ? 'visible' : 'hidden')
      .attr('pointer-events', 'none')
      .attr(
        'd',
        d3
          .line()
          .x((d) => xScale(d.date))
          .y((d) => yScale(d.value))
      );
  }
  return LineChart;
});
