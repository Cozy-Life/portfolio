(function (definition) {
  DonutChart = definition();
})(function () {
  let mouseOverDonutChartFunc;
  let mouseOutDonutChartFunc;

  const DonutChart = {
    drawDonutChart: (data, id) => {
      const contents = d3.select('#' + id);
      const WIDTH = 300;
      const HEIGHT = 300;
      const RADIUS = Math.min(WIDTH, HEIGHT) / 2;

      const arc = d3
        .arc()
        .innerRadius(RADIUS * 0.5)
        .outerRadius(RADIUS);

      const pie = d3
        .pie()
        .padAngle(3 / RADIUS)
        .sort((a, b) => d3.descending(a.value, b.value))
        .value((d) => d.value);

      const svg = contents
        .append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .attr('viewBox', [-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT]);

      svg
        .append('g')
        .selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('fill', (d) => d.data.color)
        .attr('d', arc)
        .attr('cursor', 'pointer')
        .on('mouseover', (e, d) => mouseOverFunc(e, d))
        .on('mouseout', (e, d) => mouseOutFunc(e, d));

      /**
       * マウスオーバーした時の処理
       * @param {*} e
       * @param {*} targetData
       */
      function mouseOverFunc(e, targetData) {
        setOpacityNotHoverData(svg, targetData.data);
        displayText(svg, targetData.data);
        if (typeof mouseOverDonutChartFunc === 'function') {
          mouseOverDonutChartFunc(targetData);
        }
      }

      /**
       * マウスアウトした時の処理
       * @param {*} e
       * @param {*} targetData
       */
      function mouseOutFunc(e, targetData) {
        setOpacityDefault(svg);
        clearText(svg);
        if (typeof mouseOutDonutChartFunc === 'function') {
          mouseOutDonutChartFunc(targetData);
        }
      }
    },

    mouseOverDonutChart: (mouseOverDonutChartCb) => {
      mouseOverDonutChartFunc = mouseOverDonutChartCb;
    },

    mouseOutDonutChart: (mouseOutDonutChartCb) => {
      mouseOutDonutChartFunc = mouseOutDonutChartCb;
    },

    mouseOverLegend: (id, targetData) => {
      const svg = d3.select('#' + id).select('svg');
      setOpacityNotHoverData(svg, targetData);
      clearText(svg);
      displayText(svg, targetData);
    },

    mouseOutLegend: (id) => {
      const svg = d3.select('#' + id);
      setOpacityDefault(svg);
      clearText(svg);
    },
  };

  /**
   * ターゲットのデータを表示する
   * @param {*} svg
   * @param {*} targetData
   */
  function displayText(svg, targetData) {
    clearText(svg);
    displayName(svg, targetData);
    displayExperience(svg, targetData);
  }

  /**
   * データの名前を円の真ん中に表示する
   * @param {*} svg
   * @param {*} targetData
   */
  function displayName(svg, targetData) {
    svg
      .append('text')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 16)
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(' + 0 + ',' + -20 + ')')
      .attr('font-weight', 'bold')
      .attr('class', 'langulage')
      .call((text) =>
        text
          .append('tspan')
          .attr('class', 'color')
          .style('color', `${targetData.color}`)
          .attr('fill', `${targetData.color}`)
          .text('⚫')
      )
      .call((text) => text.append('tspan').attr('class', 'name').text(`${targetData.name}`));
  }

  /**
   * 円の真ん中に経験年数を表示する
   * @param {*} svg
   * @param {*} targetData
   */
  function displayExperience(svg, targetData) {
    svg
      .append('text')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(' + 0 + ',' + 20 + ')')
      .attr('class', 'experience')
      .text(getExperience(targetData));
  }

  /**
   * 月単位のデータを表示用に加工する
   * @param {*} targetData
   * @returns
   */
  function getExperience(targetData) {
    const MONTH = 12;
    const totalExperienceMonths = targetData.value;
    const experienceYear = Math.floor(totalExperienceMonths / MONTH);
    const experienceMonths = totalExperienceMonths % MONTH;

    return experienceYear
      ? `${experienceYear}年 ${experienceMonths}ヶ月`
      : `${experienceMonths}ヶ月`;
  }

  /**
   * 円グラフの表示をクリアする
   * @param {*} svg
   */
  function clearText(svg) {
    svg.selectAll('text').remove();
  }

  /**
   * 円グラフの透過度をデフォルトにする
   * @param {*} svg
   */
  function setOpacityDefault(svg) {
    svg.selectAll('path').style('opacity', 1);
  }

  /**
   * ホバーしていない円グラフの透過度を薄くする
   * @param {*} svg
   * @param {*} targetData
   */
  function setOpacityNotHoverData(svg, targetData) {
    svg
      .selectAll('path')
      .filter((d) => d.data.key !== targetData.key)
      .style('opacity', 0.1);
  }
  return DonutChart;
});
