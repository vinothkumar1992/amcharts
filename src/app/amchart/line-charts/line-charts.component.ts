import { Component, Inject, OnInit, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_usaAlbersLow from '@amcharts/amcharts4-geodata/usaAlbersLow';
import * as am4plugins_timeline from '@amcharts/amcharts4/plugins/timeline';
import * as am4plugins_bullets from '@amcharts/amcharts4/plugins/bullets';
import am4themes_dark from '@amcharts/amcharts4/themes/dark';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
@Component({
  selector: 'app-line-charts',
  templateUrl: './line-charts.component.html',
  styleUrls: ['./line-charts.component.scss'],
})
export class LineChartsComponent implements OnInit {
  title = 'AMcharts';
  private chart: am4charts.XYChart;
  private chart1: am4charts.XYChart;
  stackedData: any;
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  ngAfterViewInit() {
    am4core.useTheme(am4themes_animated);
    this.lineChartRange();
    this.highLightLineChart();
    this.dataGroupChart();
    this.rangeChart();
    this.dateBasedData();
    this.lineChartZoom();
    this.drawingChartSeries();
    this.comparingDataChart();
    this.durationValueAxis();
    this.animateBulletSeries();
    this.upsDownLineChart();
    this.zoomValueAxisChart();
    this.smoothLineChart();
    this.trendLineChart();
    this.lineChartChangingColor();
    this.fullStackedAreaChart();
    this.areaWithTimeChart();
    this.stepLineNoRisers();
    this.lineChartCustomBullet();
    this.verticalLineChart();
    this.liveDataChart();
  }
  liveDataChart = () => {
    let chart: any = am4core.create('liveDataChart', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;

    chart.padding(0, 0, 0, 0);

    chart.zoomOutButton.disabled = true;

    let data = [];
    let visits = 10;
    let i = 0;

    for (i = 0; i <= 30; i++) {
      visits -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date().setSeconds(i - 30), value: visits });
    }

    chart.data = data;

    let dateAxis: any = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;
    dateAxis.dateFormats.setKey('second', 'ss');
    dateAxis.periodChangeDateFormats.setKey('second', '[bold]h:mm a');
    dateAxis.periodChangeDateFormats.setKey('minute', '[bold]h:mm a');
    dateAxis.periodChangeDateFormats.setKey('hour', '[bold]h:mm a');
    dateAxis.renderer.inside = true;
    dateAxis.renderer.axisFills.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.interpolationDuration = 500;
    valueAxis.rangeChangeDuration = 500;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.minLabelPosition = 0.05;
    valueAxis.renderer.maxLabelPosition = 0.95;
    valueAxis.renderer.axisFills.template.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = 'value';
    series.interpolationDuration = 500;
    series.defaultState.transitionDuration = 0;
    series.tensionX = 0.8;

    chart.events.on('datavalidated', function () {
      dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
    });

    dateAxis.interpolationDuration = 500;
    dateAxis.rangeChangeDuration = 500;

    document.addEventListener(
      'visibilitychange',
      function () {
        if (document.hidden) {
          if (interval) {
            clearInterval(interval);
          }
        } else {
          startInterval();
        }
      },
      false
    );

    // add data
    let interval;
    function startInterval() {
      interval = setInterval(function () {
        visits =
          visits +
          Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
        let lastdataItem = series.dataItems.getIndex(
          series.dataItems.length - 1
        );
        chart.addData(
          {
            date: new Date(lastdataItem.dateX.getTime() + 1000),
            value: visits,
          },
          1
        );
      }, 1000);
    }

    startInterval();

    // all the below is optional, makes some fancy effects
    // gradient fill of the series
    series.fillOpacity = 1;
    let gradient: any = new am4core.LinearGradient();
    gradient.addColor(chart.colors.getIndex(0), 0.2);
    gradient.addColor(chart.colors.getIndex(0), 0);
    series.fill = gradient;

    // this makes date axis labels to fade out
    dateAxis.renderer.labels.template.adapter.add('fillOpacity', function (
      fillOpacity,
      target
    ) {
      let dataItem = target.dataItem;
      return dataItem.position;
    });

    // need to set this, otherwise fillOpacity is not changed and not set
    dateAxis.events.on('validated', function () {
      am4core.iter.each(dateAxis.renderer.labels.iterator(), function (
        label: any
      ) {
        label.fillOpacity = label.fillOpacity;
      });
    });

    // this makes date axis labels which are at equal minutes to be rotated
    dateAxis.renderer.labels.template.adapter.add('rotation', function (
      rotation,
      target
    ) {
      let dataItem: any = target.dataItem;
      if (
        dataItem.date &&
        dataItem.date.getTime() ==
          am4core.time
            .round(new Date(dataItem.date.getTime()), 'minute', 2)
            .getTime()
      ) {
        target.verticalCenter = 'middle';
        target.horizontalCenter = 'left';
        return -90;
      } else {
        target.verticalCenter = 'bottom';
        target.horizontalCenter = 'middle';
        return 0;
      }
    });

    // bullet at the front of the line
    let bullet = series.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 5;
    bullet.fillOpacity = 1;
    bullet.fill = chart.colors.getIndex(0);
    bullet.isMeasured = false;

    series.events.on('validated', function () {
      bullet.moveTo(series.dataItems.last.point);
      bullet.validatePosition();
    });
  };
  verticalLineChart = () => {
    // Create chart instance
    let chart: any = am4core.create('verticalLineChart', am4charts.XYChart);

    // Add data
    chart.data = [
      {
        date: '2013-11-30',
        value: 104,
      },
      {
        date: '2013-12-01',
        value: 108,
      },
      {
        date: '2013-12-02',
        value: 103,
      },
      {
        date: '2013-12-03',
        value: 105,
      },
      {
        date: '2013-12-04',
        value: 136,
      },
      {
        date: '2013-12-05',
        value: 138,
      },
      {
        date: '2013-12-06',
        value: 113,
      },
      {
        date: '2013-12-07',
        value: 131,
      },
      {
        date: '2013-12-08',
        value: 114,
      },
      {
        date: '2013-12-09',
        value: 124,
      },
    ];

    // Create axes
    let dateAxis = chart.yAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.inversed = true;

    // Create value axis
    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());

    // Create series
    let series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueX = 'value';
    series1.dataFields.dateY = 'date';
    series1.strokeWidth = 3;
    series1.strokeDasharray = 4;
    series1.bullets.push(new am4charts.CircleBullet());
    series1.tooltipText = '{valueX.value}';

    // Add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'zoomY';

    // Add scrollbar
    chart.scrollbarY = new am4core.Scrollbar();

    // Create ranges
    let range = valueAxis.axisRanges.create();
    range.value = 0;
    range.endValue = 120;
    range.axisFill.fill = chart.colors.getIndex(2);
    range.axisFill.fillOpacity = 0.2;

    let range2 = valueAxis.axisRanges.create();
    range2.value = 120;
    range2.endValue = 200;
    range2.axisFill.fill = chart.colors.getIndex(5);
    range2.axisFill.fillOpacity = 0.2;
  };
  lineChartCustomBullet = () => {
    // Create chart instance
    let chart: any = am4core.create('lineChartCustomBullet', am4charts.XYChart);

    // Add data
    chart.data = [
      {
        date: new Date(2018, 3, 20),
        value: 90,
      },
      {
        date: new Date(2018, 3, 21),
        value: 102,
      },
      {
        date: new Date(2018, 3, 22),
        value: 65,
      },
      {
        date: new Date(2018, 3, 23),
        value: 62,
      },
      {
        date: new Date(2018, 3, 24),
        value: 55,
      },
      {
        date: new Date(2018, 3, 25),
        value: 81,
      },
    ];

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = 'value';
    lineSeries.dataFields.dateX = 'date';
    lineSeries.name = 'Sales';
    lineSeries.strokeWidth = 3;

    // Add simple bullet
    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    let image = bullet.createChild(am4core.Image);
    image.href = 'https://www.amcharts.com/lib/images/star.svg';
    image.width = 30;
    image.height = 30;
    image.horizontalCenter = 'middle';
    image.verticalCenter = 'middle';
  };
  stepLineNoRisers = () => {
    // Create chart
    let chart: any = am4core.create('stepLineNoRisers', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (var i = 1; i < 60; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i), value: visits });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.StepLineSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = 'value';
    series.noRisers = true;
    series.strokeWidth = 2;
    series.fillOpacity = 0.2;
    series.sequencedInterpolation = true;

    series.tooltipText = '{valueY.value}';
    chart.cursor = new am4charts.XYCursor();

    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
  };
  areaWithTimeChart = () => {
    // Create chart
    let chart: any = am4core.create('areaWithTimeChart', am4charts.XYChart);
    chart.paddingRight = 20;

    chart.data = generateChartData();

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.baseInterval = {
      timeUnit: 'minute',
      count: 1,
    };
    dateAxis.tooltipDateFormat = 'HH:mm, d MMMM';

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.title.text = 'Unique visitors';

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = 'visits';
    series.tooltipText = 'Visits: [bold]{valueY}[/]';
    series.fillOpacity = 0.3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineY.opacity = 0;
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);

    dateAxis.start = 0.8;
    dateAxis.keepSelection = true;

    function generateChartData() {
      let chartData = [];
      // current date
      let firstDate = new Date();
      // now set 500 minutes back
      firstDate.setMinutes(firstDate.getDate() - 500);

      // and generate 500 data items
      let visits = 500;
      for (var i = 0; i < 500; i++) {
        let newDate = new Date(firstDate);
        // each time we add one minute
        newDate.setMinutes(newDate.getMinutes() + i);
        // some random number
        visits += Math.round(
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
        );
        // add data item to the array
        chartData.push({
          date: newDate,
          visits: visits,
        });
      }
      return chartData;
    }
  };
  fullStackedAreaChart = () => {
    // Create chart instance
    let chart: any = am4core.create('fullStackedAreaChart', am4charts.XYChart);
    chart.colors.step = 2;

    // Add data
    chart.data = [
      {
        year: '1995',
        cars: 1567,
        motorcycles: 683,
        bicycles: 146,
      },
      {
        year: '1996',
        cars: 1617,
        motorcycles: 691,
        bicycles: 138,
      },
      {
        year: '1997',
        cars: 1630,
        motorcycles: 642,
        bicycles: 127,
      },
      {
        year: '1998',
        cars: 1660,
        motorcycles: 699,
        bicycles: 105,
      },
      {
        year: '1999',
        cars: 1683,
        motorcycles: 721,
        bicycles: 109,
      },
      {
        year: '2000',
        cars: 1691,
        motorcycles: 737,
        bicycles: 112,
      },
      {
        year: '2001',
        cars: 1298,
        motorcycles: 680,
        bicycles: 101,
      },
      {
        year: '2002',
        cars: 1275,
        motorcycles: 664,
        bicycles: 97,
      },
      {
        year: '2003',
        cars: 1246,
        motorcycles: 648,
        bicycles: 93,
      },
      {
        year: '2004',
        cars: 1218,
        motorcycles: 637,
        bicycles: 101,
      },
      {
        year: '2005',
        cars: 1213,
        motorcycles: 633,
        bicycles: 87,
      },
      {
        year: '2006',
        cars: 1199,
        motorcycles: 621,
        bicycles: 79,
      },
      {
        year: '2007',
        cars: 1110,
        motorcycles: 210,
        bicycles: 81,
      },
      {
        year: '2008',
        cars: 1165,
        motorcycles: 232,
        bicycles: 75,
      },
      {
        year: '2009',
        cars: 1145,
        motorcycles: 219,
        bicycles: 88,
      },
      {
        year: '2010',
        cars: 1163,
        motorcycles: 201,
        bicycles: 82,
      },
      {
        year: '2011',
        cars: 1180,
        motorcycles: 285,
        bicycles: 87,
      },
      {
        year: '2012',
        cars: 1159,
        motorcycles: 277,
        bicycles: 71,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.title.text = 'Year';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;

    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Percent';
    valueAxis.calculateTotals = true;
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.labels.template.adapter.add('text', function (text) {
      return text + '%';
    });

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'cars';
    series.dataFields.valueYShow = 'totalPercent';
    series.dataFields.categoryX = 'year';
    series.name = 'Cars';

    series.tooltipHTML =
      "<img src='https://www.amcharts.com/lib/3/images/car.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";

    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = am4core.color('#FFF');

    series.tooltip.getStrokeFromObject = true;
    series.tooltip.background.strokeWidth = 3;

    series.fillOpacity = 0.85;
    series.stacked = true;

    // static
    series.legendSettings.labelText = 'Cars total:';
    series.legendSettings.valueText = '{valueY.close}';

    // hovering
    series.legendSettings.itemLabelText = 'Cars:';
    series.legendSettings.itemValueText = '{valueY}';

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = 'motorcycles';
    series2.dataFields.valueYShow = 'totalPercent';
    series2.dataFields.categoryX = 'year';
    series2.name = 'Motorcycles';

    series2.tooltipHTML =
      "<img src='https://www.amcharts.com/lib/3/images/motorcycle.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";

    series2.tooltip.getFillFromObject = false;
    series2.tooltip.background.fill = am4core.color('#FFF');

    series2.tooltip.getStrokeFromObject = true;
    series2.tooltip.background.strokeWidth = 3;

    series2.fillOpacity = 0.85;
    series2.stacked = true;

    // static
    series2.legendSettings.labelText = 'Motorcycles total:';
    series2.legendSettings.valueText = '{valueY.close}';

    // hovering
    series2.legendSettings.itemLabelText = 'Motorcycles:';
    series2.legendSettings.itemValueText = '{valueY}';

    let series3 = chart.series.push(new am4charts.LineSeries());
    series3.dataFields.valueY = 'bicycles';
    series3.dataFields.valueYShow = 'totalPercent';
    series3.dataFields.categoryX = 'year';
    series3.name = 'Bicycles';
    series3.tooltipText = '{name}: [bold]{valueY}[/]';

    series3.tooltipHTML =
      "<img src='https://www.amcharts.com/lib/3/images/bicycle.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";

    series3.tooltip.getFillFromObject = false;
    series3.tooltip.background.fill = am4core.color('#FFF');

    series3.tooltip.getStrokeFromObject = true;
    series3.tooltip.background.strokeWidth = 3;

    series3.fillOpacity = 0.85;
    series3.stacked = true;

    // static
    series3.legendSettings.labelText = 'Bicycles total:';
    series3.legendSettings.valueText = '{valueY.close}';

    // hovering
    series3.legendSettings.itemLabelText = 'Bicycles:';
    series3.legendSettings.itemValueText = '{valueY}';

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    // add legend
    chart.legend = new am4charts.Legend();
  };
  lineChartChangingColor = () => {
    let chart: any = am4core.create(
      'lineChartChangingColor',
      am4charts.XYChart
    );

    let data = [];

    chart.data = [
      {
        year: '2014',
        income: 23.5,
        expenses: 21.1,
        lineColor: chart.colors.next(),
      },
      {
        year: '2015',
        income: 26.2,
        expenses: 30.5,
      },
      {
        year: '2016',
        income: 30.1,
        expenses: 34.9,
      },
      {
        year: '2017',
        income: 20.5,
        expenses: 23.1,
      },
      {
        year: '2018',
        income: 30.6,
        expenses: 28.2,
        lineColor: chart.colors.next(),
      },
      {
        year: '2019',
        income: 34.1,
        expenses: 31.9,
      },
      {
        year: '2020',
        income: 34.1,
        expenses: 31.9,
      },
      {
        year: '2021',
        income: 34.1,
        expenses: 31.9,
        lineColor: chart.colors.next(),
      },
      {
        year: '2022',
        income: 34.1,
        expenses: 31.9,
      },
      {
        year: '2023',
        income: 34.1,
        expenses: 31.9,
      },
      {
        year: '2024',
        income: 34.1,
        expenses: 31.9,
      },
    ];

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.dataFields.category = 'year';
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.6;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.min = 0;

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = 'year';
    lineSeries.dataFields.valueY = 'income';
    lineSeries.tooltipText = 'income: {valueY.value}';
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.stroke = 'lineColor';
    lineSeries.propertyFields.fill = 'lineColor';

    let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 6;
    bullet.circle.fill = am4core.color('#fff');
    bullet.circle.strokeWidth = 3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'panX';
    chart.cursor.lineX.opacity = 0;
    chart.cursor.lineY.opacity = 0;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;
  };
  trendLineChart = () => {
    // Create chart instance
    let chart: any = am4core.create('trendLineChart', am4charts.XYChart);

    // Enable chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    // Enable scrollbar
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [
      {
        date: '2012-01-01',
        value: 8,
      },
      {
        date: '2012-01-02',
        value: 10,
      },
      {
        date: '2012-01-03',
        value: 12,
      },
      {
        date: '2012-01-04',
        value: 14,
      },
      {
        date: '2012-01-05',
        value: 11,
      },
      {
        date: '2012-01-06',
        value: 6,
      },
      {
        date: '2012-01-07',
        value: 7,
      },
      {
        date: '2012-01-08',
        value: 9,
      },
      {
        date: '2012-01-09',
        value: 13,
      },
      {
        date: '2012-01-10',
        value: 15,
      },
      {
        date: '2012-01-11',
        value: 19,
      },
      {
        date: '2012-01-12',
        value: 21,
      },
      {
        date: '2012-01-13',
        value: 22,
      },
      {
        date: '2012-01-14',
        value: 20,
      },
      {
        date: '2012-01-15',
        value: 18,
      },
      {
        date: '2012-01-16',
        value: 14,
      },
      {
        date: '2012-01-17',
        value: 16,
        opacity: 0,
      },
      {
        date: '2012-01-18',
        value: 18,
      },
      {
        date: '2012-01-19',
        value: 17,
      },
      {
        date: '2012-01-20',
        value: 15,
      },
      {
        date: '2012-01-21',
        value: 12,
      },
      {
        date: '2012-01-22',
        value: 10,
      },
      {
        date: '2012-01-23',
        value: 8,
      },
    ];

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0.5;
    dateAxis.dateFormatter.inputDateFormat = 'yyyy-MM-dd';
    dateAxis.renderer.minGridDistance = 40;
    dateAxis.tooltipDateFormat = 'MMM dd, yyyy';
    dateAxis.dateFormats.setKey('day', 'dd');

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.tooltipText = '{date}\n[bold font-size: 17px]value: {valueY}[/]';
    series.dataFields.valueY = 'value';
    series.dataFields.dateX = 'date';
    series.strokeDasharray = 3;
    series.strokeWidth = 2;
    series.strokeOpacity = 0.3;
    series.strokeDasharray = '3,3';

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.strokeWidth = 2;
    bullet.stroke = am4core.color('#fff');
    bullet.setStateOnChildren = true;
    bullet.propertyFields.fillOpacity = 'opacity';
    bullet.propertyFields.strokeOpacity = 'opacity';

    let hoverState = bullet.states.create('hover');
    hoverState.properties.scale = 1.7;

    function createTrendLine(data) {
      let trend = chart.series.push(new am4charts.LineSeries());
      trend.dataFields.valueY = 'value';
      trend.dataFields.dateX = 'date';
      trend.strokeWidth = 2;
      trend.stroke = trend.fill = am4core.color('#c00');
      trend.data = data;

      let bullet = trend.bullets.push(new am4charts.CircleBullet());
      bullet.tooltipText = '{date}\n[bold font-size: 17px]value: {valueY}[/]';
      bullet.strokeWidth = 2;
      bullet.stroke = am4core.color('#fff');
      bullet.circle.fill = trend.stroke;

      let hoverState = bullet.states.create('hover');
      hoverState.properties.scale = 1.7;

      return trend;
    }

    createTrendLine([
      { date: '2012-01-02', value: 10 },
      { date: '2012-01-11', value: 19 },
    ]);

    let lastTrend = createTrendLine([
      { date: '2012-01-17', value: 16 },
      { date: '2012-01-22', value: 10 },
    ]);

    // Initial zoom once chart is ready
    lastTrend.events.once('datavalidated', function () {
      series.xAxis.zoomToDates(new Date(2012, 0, 2), new Date(2012, 0, 13));
    });
  };
  smoothLineChart = () => {
    // Create chart instance
    let chart: any = am4core.create('smoothLineChart', am4charts.XYChart);
    chart.paddingRight = 20;

    // Add data
    chart.data = [
      {
        year: '1950',
        value: -0.307,
      },
      {
        year: '1951',
        value: -0.168,
      },
      {
        year: '1952',
        value: -0.073,
      },
      {
        year: '1953',
        value: -0.027,
      },
      {
        year: '1954',
        value: -0.251,
      },
      {
        year: '1955',
        value: -0.281,
      },
      {
        year: '1956',
        value: -0.348,
      },
      {
        year: '1957',
        value: -0.074,
      },
      {
        year: '1958',
        value: -0.011,
      },
      {
        year: '1959',
        value: -0.074,
      },
      {
        year: '1960',
        value: -0.124,
      },
      {
        year: '1961',
        value: -0.024,
      },
      {
        year: '1962',
        value: -0.022,
      },
      {
        year: '1963',
        value: 0,
      },
      {
        year: '1964',
        value: -0.296,
      },
      {
        year: '1965',
        value: -0.217,
      },
      {
        year: '1966',
        value: -0.147,
      },
      {
        year: '1967',
        value: -0.15,
      },
      {
        year: '1968',
        value: -0.16,
      },
      {
        year: '1969',
        value: -0.011,
      },
      {
        year: '1970',
        value: -0.068,
      },
      {
        year: '1971',
        value: -0.19,
      },
      {
        year: '1972',
        value: -0.056,
      },
      {
        year: '1973',
        value: 0.077,
      },
      {
        year: '1974',
        value: -0.213,
      },
      {
        year: '1975',
        value: -0.17,
      },
      {
        year: '1976',
        value: -0.254,
      },
      {
        year: '1977',
        value: 0.019,
      },
      {
        year: '1978',
        value: -0.063,
      },
      {
        year: '1979',
        value: 0.05,
      },
      {
        year: '1980',
        value: 0.077,
      },
      {
        year: '1981',
        value: 0.12,
      },
      {
        year: '1982',
        value: 0.011,
      },
      {
        year: '1983',
        value: 0.177,
      },
      {
        year: '1984',
        value: -0.021,
      },
      {
        year: '1985',
        value: -0.037,
      },
      {
        year: '1986',
        value: 0.03,
      },
      {
        year: '1987',
        value: 0.179,
      },
      {
        year: '1988',
        value: 0.18,
      },
      {
        year: '1989',
        value: 0.104,
      },
      {
        year: '1990',
        value: 0.255,
      },
      {
        year: '1991',
        value: 0.21,
      },
      {
        year: '1992',
        value: 0.065,
      },
      {
        year: '1993',
        value: 0.11,
      },
      {
        year: '1994',
        value: 0.172,
      },
      {
        year: '1995',
        value: 0.269,
      },
      {
        year: '1996',
        value: 0.141,
      },
      {
        year: '1997',
        value: 0.353,
      },
      {
        year: '1998',
        value: 0.548,
      },
      {
        year: '1999',
        value: 0.298,
      },
      {
        year: '2000',
        value: 0.267,
      },
      {
        year: '2001',
        value: 0.411,
      },
      {
        year: '2002',
        value: 0.462,
      },
      {
        year: '2003',
        value: 0.47,
      },
      {
        year: '2004',
        value: 0.445,
      },
      {
        year: '2005',
        value: 0.47,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'year';
    series.strokeWidth = 2;
    series.tensionX = 0.77;

    // bullet is added because we add tooltip to a bullet for it to change color
    let bullet = series.bullets.push(new am4charts.Bullet());
    bullet.tooltipText = '{valueY}';

    bullet.adapter.add('fill', function (fill, target) {
      if (target.dataItem.valueY < 0) {
        return am4core.color('#FF0000');
      }
      return fill;
    });
    let range = valueAxis.createSeriesRange(series);
    range.value = 0;
    range.endValue = -1000;
    range.contents.stroke = am4core.color('#FF0000');
    range.contents.fill = range.contents.stroke;

    // Add scrollbar
    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    chart.cursor = new am4charts.XYCursor();
  };
  zoomValueAxisChart = () => {
    // Create chart instance
    let chart = am4core.create('zoomValueAxisChart', am4charts.XYChart);

    // Add data
    chart.data = [
      {
        date: '2012-07-27',
        value: 13,
      },
      {
        date: '2012-07-28',
        value: 11,
      },
      {
        date: '2012-07-29',
        value: 15,
      },
      {
        date: '2012-07-30',
        value: 16,
      },
      {
        date: '2012-07-31',
        value: 18,
      },
      {
        date: '2012-08-01',
        value: 13,
      },
      {
        date: '2012-08-02',
        value: 22,
      },
      {
        date: '2012-08-03',
        value: 23,
      },
      {
        date: '2012-08-04',
        value: 20,
      },
      {
        date: '2012-08-05',
        value: 17,
      },
      {
        date: '2012-08-06',
        value: 16,
      },
      {
        date: '2012-08-07',
        value: 18,
      },
      {
        date: '2012-08-08',
        value: 21,
      },
      {
        date: '2012-08-09',
        value: 26,
      },
      {
        date: '2012-08-10',
        value: 24,
      },
      {
        date: '2012-08-11',
        value: 29,
      },
      {
        date: '2012-08-12',
        value: 32,
      },
      {
        date: '2012-08-13',
        value: 18,
      },
      {
        date: '2012-08-14',
        value: 24,
      },
      {
        date: '2012-08-15',
        value: 22,
      },
      {
        date: '2012-08-16',
        value: 18,
      },
      {
        date: '2012-08-17',
        value: 19,
      },
      {
        date: '2012-08-18',
        value: 14,
      },
      {
        date: '2012-08-19',
        value: 15,
      },
      {
        date: '2012-08-20',
        value: 12,
      },
      {
        date: '2012-08-21',
        value: 8,
      },
      {
        date: '2012-08-22',
        value: 9,
      },
      {
        date: '2012-08-23',
        value: 8,
      },
      {
        date: '2012-08-24',
        value: 7,
      },
      {
        date: '2012-08-25',
        value: 5,
      },
      {
        date: '2012-08-26',
        value: 11,
      },
      {
        date: '2012-08-27',
        value: 13,
      },
      {
        date: '2012-08-28',
        value: 18,
      },
      {
        date: '2012-08-29',
        value: 20,
      },
      {
        date: '2012-08-30',
        value: 29,
      },
      {
        date: '2012-08-31',
        value: 33,
      },
      {
        date: '2012-09-01',
        value: 42,
      },
      {
        date: '2012-09-02',
        value: 35,
      },
      {
        date: '2012-09-03',
        value: 31,
      },
      {
        date: '2012-09-04',
        value: 47,
      },
      {
        date: '2012-09-05',
        value: 52,
      },
      {
        date: '2012-09-06',
        value: 46,
      },
      {
        date: '2012-09-07',
        value: 41,
      },
      {
        date: '2012-09-08',
        value: 43,
      },
      {
        date: '2012-09-09',
        value: 40,
      },
      {
        date: '2012-09-10',
        value: 39,
      },
      {
        date: '2012-09-11',
        value: 34,
      },
      {
        date: '2012-09-12',
        value: 29,
      },
      {
        date: '2012-09-13',
        value: 34,
      },
      {
        date: '2012-09-14',
        value: 37,
      },
      {
        date: '2012-09-15',
        value: 42,
      },
      {
        date: '2012-09-16',
        value: 49,
      },
      {
        date: '2012-09-17',
        value: 46,
      },
      {
        date: '2012-09-18',
        value: 47,
      },
      {
        date: '2012-09-19',
        value: 55,
      },
      {
        date: '2012-09-20',
        value: 59,
      },
      {
        date: '2012-09-21',
        value: 58,
      },
      {
        date: '2012-09-22',
        value: 57,
      },
      {
        date: '2012-09-23',
        value: 61,
      },
      {
        date: '2012-09-24',
        value: 59,
      },
      {
        date: '2012-09-25',
        value: 67,
      },
      {
        date: '2012-09-26',
        value: 65,
      },
      {
        date: '2012-09-27',
        value: 61,
      },
      {
        date: '2012-09-28',
        value: 66,
      },
      {
        date: '2012-09-29',
        value: 69,
      },
      {
        date: '2012-09-30',
        value: 71,
      },
      {
        date: '2012-10-01',
        value: 67,
      },
      {
        date: '2012-10-02',
        value: 63,
      },
      {
        date: '2012-10-03',
        value: 46,
      },
      {
        date: '2012-10-04',
        value: 32,
      },
      {
        date: '2012-10-05',
        value: 21,
      },
      {
        date: '2012-10-06',
        value: 18,
      },
      {
        date: '2012-10-07',
        value: 21,
      },
      {
        date: '2012-10-08',
        value: 28,
      },
      {
        date: '2012-10-09',
        value: 27,
      },
      {
        date: '2012-10-10',
        value: 36,
      },
      {
        date: '2012-10-11',
        value: 33,
      },
      {
        date: '2012-10-12',
        value: 31,
      },
      {
        date: '2012-10-13',
        value: 30,
      },
      {
        date: '2012-10-14',
        value: 34,
      },
      {
        date: '2012-10-15',
        value: 38,
      },
      {
        date: '2012-10-16',
        value: 37,
      },
      {
        date: '2012-10-17',
        value: 44,
      },
      {
        date: '2012-10-18',
        value: 49,
      },
      {
        date: '2012-10-19',
        value: 53,
      },
      {
        date: '2012-10-20',
        value: 57,
      },
      {
        date: '2012-10-21',
        value: 60,
      },
      {
        date: '2012-10-22',
        value: 61,
      },
      {
        date: '2012-10-23',
        value: 69,
      },
      {
        date: '2012-10-24',
        value: 67,
      },
      {
        date: '2012-10-25',
        value: 72,
      },
      {
        date: '2012-10-26',
        value: 77,
      },
      {
        date: '2012-10-27',
        value: 75,
      },
      {
        date: '2012-10-28',
        value: 70,
      },
      {
        date: '2012-10-29',
        value: 72,
      },
      {
        date: '2012-10-30',
        value: 70,
      },
      {
        date: '2012-10-31',
        value: 72,
      },
      {
        date: '2012-11-01',
        value: 73,
      },
      {
        date: '2012-11-02',
        value: 67,
      },
      {
        date: '2012-11-03',
        value: 68,
      },
      {
        date: '2012-11-04',
        value: 65,
      },
      {
        date: '2012-11-05',
        value: 71,
      },
      {
        date: '2012-11-06',
        value: 75,
      },
      {
        date: '2012-11-07',
        value: 74,
      },
      {
        date: '2012-11-08',
        value: 71,
      },
      {
        date: '2012-11-09',
        value: 76,
      },
      {
        date: '2012-11-10',
        value: 77,
      },
      {
        date: '2012-11-11',
        value: 81,
      },
      {
        date: '2012-11-12',
        value: 83,
      },
      {
        date: '2012-11-13',
        value: 80,
      },
      {
        date: '2012-11-14',
        value: 81,
      },
      {
        date: '2012-11-15',
        value: 87,
      },
      {
        date: '2012-11-16',
        value: 82,
      },
      {
        date: '2012-11-17',
        value: 86,
      },
      {
        date: '2012-11-18',
        value: 80,
      },
      {
        date: '2012-11-19',
        value: 87,
      },
      {
        date: '2012-11-20',
        value: 83,
      },
      {
        date: '2012-11-21',
        value: 85,
      },
      {
        date: '2012-11-22',
        value: 84,
      },
      {
        date: '2012-11-23',
        value: 82,
      },
      {
        date: '2012-11-24',
        value: 73,
      },
      {
        date: '2012-11-25',
        value: 71,
      },
      {
        date: '2012-11-26',
        value: 75,
      },
      {
        date: '2012-11-27',
        value: 79,
      },
      {
        date: '2012-11-28',
        value: 70,
      },
      {
        date: '2012-11-29',
        value: 73,
      },
      {
        date: '2012-11-30',
        value: 61,
      },
      {
        date: '2012-12-01',
        value: 62,
      },
      {
        date: '2012-12-02',
        value: 66,
      },
      {
        date: '2012-12-03',
        value: 65,
      },
      {
        date: '2012-12-04',
        value: 73,
      },
      {
        date: '2012-12-05',
        value: 79,
      },
      {
        date: '2012-12-06',
        value: 78,
      },
      {
        date: '2012-12-07',
        value: 78,
      },
      {
        date: '2012-12-08',
        value: 78,
      },
      {
        date: '2012-12-09',
        value: 74,
      },
      {
        date: '2012-12-10',
        value: 73,
      },
      {
        date: '2012-12-11',
        value: 75,
      },
      {
        date: '2012-12-12',
        value: 70,
      },
      {
        date: '2012-12-13',
        value: 77,
      },
      {
        date: '2012-12-14',
        value: 67,
      },
      {
        date: '2012-12-15',
        value: 62,
      },
      {
        date: '2012-12-16',
        value: 64,
      },
      {
        date: '2012-12-17',
        value: 61,
      },
      {
        date: '2012-12-18',
        value: 59,
      },
      {
        date: '2012-12-19',
        value: 53,
      },
      {
        date: '2012-12-20',
        value: 54,
      },
      {
        date: '2012-12-21',
        value: 56,
      },
      {
        date: '2012-12-22',
        value: 59,
      },
      {
        date: '2012-12-23',
        value: 58,
      },
      {
        date: '2012-12-24',
        value: 55,
      },
      {
        date: '2012-12-25',
        value: 52,
      },
      {
        date: '2012-12-26',
        value: 54,
      },
      {
        date: '2012-12-27',
        value: 50,
      },
      {
        date: '2012-12-28',
        value: 50,
      },
      {
        date: '2012-12-29',
        value: 51,
      },
      {
        date: '2012-12-30',
        value: 52,
      },
      {
        date: '2012-12-31',
        value: 58,
      },
      {
        date: '2013-01-01',
        value: 60,
      },
      {
        date: '2013-01-02',
        value: 67,
      },
      {
        date: '2013-01-03',
        value: 64,
      },
      {
        date: '2013-01-04',
        value: 66,
      },
      {
        date: '2013-01-05',
        value: 60,
      },
      {
        date: '2013-01-06',
        value: 63,
      },
      {
        date: '2013-01-07',
        value: 61,
      },
      {
        date: '2013-01-08',
        value: 60,
      },
      {
        date: '2013-01-09',
        value: 65,
      },
      {
        date: '2013-01-10',
        value: 75,
      },
      {
        date: '2013-01-11',
        value: 77,
      },
      {
        date: '2013-01-12',
        value: 78,
      },
      {
        date: '2013-01-13',
        value: 70,
      },
      {
        date: '2013-01-14',
        value: 70,
      },
      {
        date: '2013-01-15',
        value: 73,
      },
      {
        date: '2013-01-16',
        value: 71,
      },
      {
        date: '2013-01-17',
        value: 74,
      },
      {
        date: '2013-01-18',
        value: 78,
      },
      {
        date: '2013-01-19',
        value: 85,
      },
      {
        date: '2013-01-20',
        value: 82,
      },
      {
        date: '2013-01-21',
        value: 83,
      },
      {
        date: '2013-01-22',
        value: 88,
      },
      {
        date: '2013-01-23',
        value: 85,
      },
      {
        date: '2013-01-24',
        value: 85,
      },
      {
        date: '2013-01-25',
        value: 80,
      },
      {
        date: '2013-01-26',
        value: 87,
      },
      {
        date: '2013-01-27',
        value: 84,
      },
      {
        date: '2013-01-28',
        value: 83,
      },
      {
        date: '2013-01-29',
        value: 84,
      },
      {
        date: '2013-01-30',
        value: 81,
      },
    ];

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.dateX = 'date';
    series.strokeWidth = 3;
    series.fillOpacity = 0.5;

    // Add vertical scrollbar
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.marginLeft = 0;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'zoomY';
    chart.cursor.lineX.disabled = true;
  };
  upsDownLineChart = () => {
    let chart = am4core.create('upsDownLineChart', am4charts.XYChart);
    chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    let previousValue;

    for (var i = 0; i < 100; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

      if (i > 0) {
        // add color to previous data item depending on whether current value is less or more than previous value
        if (previousValue <= visits) {
          data[i - 1].color = chart.colors.getIndex(0);
        } else {
          data[i - 1].color = chart.colors.getIndex(5);
        }
      }

      data.push({ date: new Date(2018, 0, i + 1), value: visits });
      previousValue = visits;
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.axisFills.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.renderer.axisFills.template.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = 'value';
    series.strokeWidth = 2;
    series.tooltipText = 'value: {valueY}, day change: {valueY.previousChange}';

    // set stroke property field
    series.propertyFields.stroke = 'color';

    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX = scrollbarX;

    dateAxis.start = 0.7;
    dateAxis.keepSelection = true;
  };
  animateBulletSeries = () => {
    let chart = am4core.create('animateBulletSeries', am4charts.XYChart);

    // Add data
    chart.data = [
      {
        date: new Date(2018, 3, 20),
        value: 90,
      },
      {
        date: new Date(2018, 3, 21),
        value: 102,
      },
      {
        date: new Date(2018, 3, 22),
        value: 65,
      },
      {
        date: new Date(2018, 3, 23),
        value: 62,
      },
      {
        date: new Date(2018, 3, 24),
        value: 55,
      },
      {
        date: new Date(2018, 3, 25),
        value: 81,
        disabled: false,
      },
    ];

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = 'value';
    lineSeries.dataFields.dateX = 'date';
    lineSeries.name = 'Sales';
    lineSeries.strokeWidth = 3;
    lineSeries.strokeDasharray = '5,4';

    // Add simple bullet
    let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    bullet.disabled = true;
    bullet.propertyFields.disabled = 'disabled';

    let secondCircle = bullet.createChild(am4core.Circle);
    secondCircle.radius = 6;
    secondCircle.fill = chart.colors.getIndex(8);

    bullet.events.on('inited', function (event) {
      animateBullet(event.target.circle);
    });

    function animateBullet(bullet) {
      let animation = bullet.animate(
        [
          { property: 'scale', from: 1, to: 5 },
          { property: 'opacity', from: 1, to: 0 },
        ],
        1000,
        am4core.ease.circleOut
      );
      animation.events.on('animationended', function (event) {
        animateBullet(event.target.object);
      });
    }
  };
  lineChartRange = () => {
    // Create chart instance
    let chart = am4core.create('lineChartRange', am4charts.XYChart);

    // Add data
    chart.data = generateChartData();

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'visits';
    series.dataFields.dateX = 'date';
    series.strokeWidth = 1;
    series.minBulletDistance = 10;
    series.tooltipText = '{valueY}';
    series.fillOpacity = 0.1;
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12, 12, 12, 12);

    let seriesRange = dateAxis.createSeriesRange(series);
    seriesRange.contents.strokeDasharray = '2,3';
    seriesRange.contents.stroke = chart.colors.getIndex(8);
    seriesRange.contents.strokeWidth = 1;

    let pattern = new am4core.LinePattern();
    pattern.rotation = -45;
    pattern.stroke = seriesRange.contents.stroke;
    pattern.width = 1000;
    pattern.height = 1000;
    pattern.gap = 6;
    seriesRange.contents.fill = pattern;
    seriesRange.contents.fillOpacity = 0.5;

    // Add scrollbar
    chart.scrollbarX = new am4core.Scrollbar();

    function generateChartData() {
      let chartData = [];
      let firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 200);
      let visits = 1200;
      for (var i = 0; i < 200; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        let newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        visits += Math.round(
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
        );

        chartData.push({
          date: newDate,
          visits: visits,
        });
      }
      return chartData;
    }

    // add range
    let range: any = dateAxis.axisRanges.push(new am4charts.DateAxisDataItem());
    range.grid.stroke = chart.colors.getIndex(0);
    range.grid.strokeOpacity = 1;
    range.bullet = new am4core.ResizeButton();
    range.bullet.background.fill = chart.colors.getIndex(0);
    range.bullet.background.states.copyFrom(
      chart.zoomOutButton.background.states
    );
    range.bullet.minX = 0;
    range.bullet.adapter.add('minY', function (minY, target) {
      target.maxY = chart.plotContainer.maxHeight;
      target.maxX = chart.plotContainer.maxWidth;
      return chart.plotContainer.maxHeight;
    });

    range.bullet.events.on('dragged', function () {
      range.value = dateAxis.xToValue(range.bullet.pixelX);
      seriesRange.value = range.value;
    });

    let firstTime = chart.data[0].date.getTime();
    let lastTime = chart.data[chart.data.length - 1].date.getTime();
    let date = new Date(firstTime + (lastTime - firstTime) / 2);

    range.date = date;

    seriesRange.date = date;
    seriesRange.endDate = chart.data[chart.data.length - 1].date;
  };
  highLightLineChart = () => {
    // Create chart instance
    let chart: any = am4core.create('highLightLineChart', am4charts.XYChart);

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    for (var i = 0; i < 10; i++) {
      createSeries('value' + i, 'Series #' + i);
    }

    // Create series
    function createSeries(s, name) {
      let series: any = chart.series.push(new am4charts.LineSeries() as any);
      series.dataFields.valueY = 'value' + s;
      series.dataFields.dateX = 'date';
      series.name = name;

      let segment = series.segments.template;
      segment.interactionsEnabled = true;

      let hoverState = segment.states.create('hover');
      hoverState.properties.strokeWidth = 3;

      let dimmed = segment.states.create('dimmed');
      dimmed.properties.stroke = am4core.color('#dadada');

      segment.events.on('over', function (event) {
        processOver(event.target.parent.parent.parent);
      });

      segment.events.on('out', function (event) {
        processOut(event.target.parent.parent.parent);
      });

      let data = [];
      let value = Math.round(Math.random() * 100) + 100;
      for (var i = 1; i < 100; i++) {
        value += Math.round(
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 30 + i / 5
        );
        let dataItem = { date: new Date(2018, 0, i) };
        dataItem['value' + s] = value;
        data.push(dataItem);
      }

      series.data = data;
      return series;
    }

    chart.legend = new am4charts.Legend();
    chart.legend.position = 'right';
    chart.legend.scrollable = true;
    chart.legend.itemContainers.template.events.on('over', function (event) {
      processOver(event.target.dataItem.dataContext);
    });

    chart.legend.itemContainers.template.events.on('out', function (event) {
      processOut(event.target.dataItem.dataContext);
    });

    function processOver(hoveredSeries) {
      hoveredSeries.toFront();

      hoveredSeries.segments.each(function (segment) {
        segment.setState('hover');
      });
      chart.series.each(function (series) {
        if (series != hoveredSeries) {
          series.segments.each(function (segment) {
            segment.setState('dimmed');
          });
          series.bulletsContainer.setState('dimmed');
        }
      });
    }

    function processOut(hoveredSeries) {
      let processChartSeries = chart.series as any;
      processChartSeries.each(function (series) {
        series.segments.each(function (segment) {
          segment.setState('default');
        });
        series.bulletsContainer.setState('default');
      });
    }
  };
  dataGroupChart = () => {
    let chart = am4core.create('dataGroupChart', am4charts.XYChart);
    chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (var i = 1; i < 50000; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i), value: visits });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.minZoomCount = 5;

    // this makes the data to be grouped
    dateAxis.groupData = true;
    dateAxis.groupCount = 500;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = 'value';
    series.tooltipText = '{valueY}';
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.background.fillOpacity = 0.5;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;

    let scrollbarX = new am4core.Scrollbar();
    scrollbarX.marginBottom = 20;
    chart.scrollbarX = scrollbarX;
  };
  rangeChart = () => {
    let chart = am4core.create('rangeChart', am4charts.XYChart);

    chart.data = [
      { date: 1577743200000, open: 122, close: 104 },
      { date: 1577829600000, open: 121, close: 70 },
      { date: 1577916000000, open: 101, close: 55 },
      { date: 1578002400000, open: 103, close: 45 },
      { date: 1578088800000, open: 153, close: 85 },
      { date: 1578175200000, open: 150, close: 116 },
      { date: 1578261600000, open: 135, close: 153 },
      { date: 1578348000000, open: 98, close: 152 },
      { date: 1578434400000, open: 101, close: 192 },
      { date: 1578520800000, open: 110, close: 225 },
      { date: 1578607200000, open: 157, close: 233 },
      { date: 1578693600000, open: 128, close: 232 },
      { date: 1578780000000, open: 101, close: 235 },
      { date: 1578866400000, open: 109, close: 200 },
      { date: 1578952800000, open: 142, close: 214 },
      { date: 1579039200000, open: 123, close: 224 },
      { date: 1579125600000, open: 99, close: 176 },
      { date: 1579212000000, open: 100, close: 172 },
      { date: 1579298400000, open: 67, close: 138 },
      { date: 1579384800000, open: 81, close: 127 },
      { date: 1579471200000, open: 39, close: 137 },
      { date: 1579557600000, open: 73, close: 127 },
      { date: 1579644000000, open: 78, close: 154 },
      { date: 1579730400000, open: 116, close: 127 },
      { date: 1579816800000, open: 136, close: 78 },
      { date: 1579903200000, open: 139, close: 61 },
      { date: 1579989600000, open: 162, close: 13 },
      { date: 1580076000000, open: 201, close: 41 },
      { date: 1580162400000, open: 221, close: 72 },
      { date: 1580248800000, open: 257, close: 87 },
      { date: 1580335200000, open: 211, close: 114 },
      { date: 1580421600000, open: 233, close: 138 },
      { date: 1580508000000, open: 261, close: 141 },
      { date: 1580594400000, open: 279, close: 130 },
    ];

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 60;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    // only for the legend
    let iconSeries = chart.series.push(new am4charts.ColumnSeries());
    iconSeries.fill = am4core.color('#ec0800');
    iconSeries.strokeOpacity = 0;
    iconSeries.stroke = am4core.color('#ec0800');
    iconSeries.name = 'Events';
    iconSeries.dataFields.dateX = 'date';
    iconSeries.dataFields.valueY = 'v';

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.openValueY = 'open';
    series.dataFields.valueY = 'close';
    series.tooltipText = 'open: {openValueY.value} close: {valueY.value}';
    series.sequencedInterpolation = true;
    series.stroke = am4core.color('#1b7cb3');
    series.strokeWidth = 2;
    series.name = 'District Metered Usage';
    series.stroke = chart.colors.getIndex(0);
    series.fill = series.stroke;
    series.fillOpacity = 0.8;

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.fill = new am4core.InterfaceColorSet().getFor('background');
    bullet.fillOpacity = 1;
    bullet.strokeWidth = 2;
    bullet.circle.radius = 4;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.dateX = 'date';
    series2.dataFields.valueY = 'open';
    series2.sequencedInterpolation = true;
    series2.strokeWidth = 2;
    series2.tooltip.getFillFromObject = false;
    series2.tooltip.getStrokeFromObject = true;
    series2.tooltip.label.fill = am4core.color('#000');
    series2.name = 'SP Aggregate usage';
    series2.stroke = chart.colors.getIndex(7);
    series2.fill = series2.stroke;

    let bullet2 = series2.bullets.push(new am4charts.CircleBullet());
    bullet2.fill = bullet.fill;
    bullet2.fillOpacity = 1;
    bullet2.strokeWidth = 2;
    bullet2.circle.radius = 4;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.scrollbarX = new am4core.Scrollbar();

    // create ranges
    let negativeRange;

    // create ranges
    chart.events.on('datavalidated', function () {
      series.dataItems.each(function (s1DataItem) {
        let s1PreviousDataItem;
        let s2PreviousDataItem;

        let s2DataItem = series2.dataItems.getIndex(s1DataItem.index);

        if (s1DataItem.index > 0) {
          s1PreviousDataItem = series.dataItems.getIndex(s1DataItem.index - 1);
          s2PreviousDataItem = series2.dataItems.getIndex(s1DataItem.index - 1);
        }

        let startTime = am4core.time
          .round(
            new Date(s1DataItem.dateX.getTime()),
            dateAxis.baseInterval.timeUnit,
            dateAxis.baseInterval.count
          )
          .getTime();

        // intersections
        if (s1PreviousDataItem && s2PreviousDataItem) {
          let x0 =
            am4core.time
              .round(
                new Date(s1PreviousDataItem.dateX.getTime()),
                dateAxis.baseInterval.timeUnit,
                dateAxis.baseInterval.count
              )
              .getTime() +
            dateAxis.baseDuration / 2;
          let y01 = s1PreviousDataItem.valueY;
          let y02 = s2PreviousDataItem.valueY;

          let x1 = startTime + dateAxis.baseDuration / 2;
          let y11 = s1DataItem.valueY;
          let y12 = s2DataItem.valueY;

          let intersection = am4core.math.getLineIntersection(
            { x: x0, y: y01 },
            { x: x1, y: y11 },
            { x: x0, y: y02 },
            { x: x1, y: y12 }
          );

          startTime = Math.round(intersection.x);
        }

        // start range here
        if (s2DataItem.valueY > s1DataItem.valueY) {
          if (!negativeRange) {
            negativeRange = dateAxis.createSeriesRange(series);
            negativeRange.date = new Date(startTime);
            negativeRange.contents.fill = series2.fill;
            negativeRange.contents.fillOpacity = 0.8;
          }
        } else {
          // if negative range started
          if (negativeRange) {
            negativeRange.endDate = new Date(startTime);
          }
          negativeRange = undefined;
        }
        // end if last
        if (s1DataItem.index == series.dataItems.length - 1) {
          if (negativeRange) {
            negativeRange.endDate = new Date(
              s1DataItem.dateX.getTime() + dateAxis.baseDuration / 2
            );
            negativeRange = undefined;
          }
        }
      });
    });
  };
  dateBasedData = () => {
    // Create chart instance
    let chart: any = am4core.create('dateBasedData', am4charts.XYChart);

    // Add data
    chart.data = [
      {
        date: '2012-07-27',
        value: 13,
      },
      {
        date: '2012-07-28',
        value: 11,
      },
      {
        date: '2012-07-29',
        value: 15,
      },
      {
        date: '2012-07-30',
        value: 16,
      },
      {
        date: '2012-07-31',
        value: 18,
      },
      {
        date: '2012-08-01',
        value: 13,
      },
      {
        date: '2012-08-02',
        value: 22,
      },
      {
        date: '2012-08-03',
        value: 23,
      },
      {
        date: '2012-08-04',
        value: 20,
      },
      {
        date: '2012-08-05',
        value: 17,
      },
      {
        date: '2012-08-06',
        value: 16,
      },
      {
        date: '2012-08-07',
        value: 18,
      },
      {
        date: '2012-08-08',
        value: 21,
      },
      {
        date: '2012-08-09',
        value: 26,
      },
      {
        date: '2012-08-10',
        value: 24,
      },
      {
        date: '2012-08-11',
        value: 29,
      },
      {
        date: '2012-08-12',
        value: 32,
      },
      {
        date: '2012-08-13',
        value: 18,
      },
      {
        date: '2012-08-14',
        value: 24,
      },
      {
        date: '2012-08-15',
        value: 22,
      },
      {
        date: '2012-08-16',
        value: 18,
      },
      {
        date: '2012-08-17',
        value: 19,
      },
      {
        date: '2012-08-18',
        value: 14,
      },
      {
        date: '2012-08-19',
        value: 15,
      },
      {
        date: '2012-08-20',
        value: 12,
      },
      {
        date: '2012-08-21',
        value: 8,
      },
      {
        date: '2012-08-22',
        value: 9,
      },
      {
        date: '2012-08-23',
        value: 8,
      },
      {
        date: '2012-08-24',
        value: 7,
      },
      {
        date: '2012-08-25',
        value: 5,
      },
      {
        date: '2012-08-26',
        value: 11,
      },
      {
        date: '2012-08-27',
        value: 13,
      },
      {
        date: '2012-08-28',
        value: 18,
      },
      {
        date: '2012-08-29',
        value: 20,
      },
      {
        date: '2012-08-30',
        value: 29,
      },
      {
        date: '2012-08-31',
        value: 33,
      },
      {
        date: '2012-09-01',
        value: 42,
      },
      {
        date: '2012-09-02',
        value: 35,
      },
      {
        date: '2012-09-03',
        value: 31,
      },
      {
        date: '2012-09-04',
        value: 47,
      },
      {
        date: '2012-09-05',
        value: 52,
      },
      {
        date: '2012-09-06',
        value: 46,
      },
      {
        date: '2012-09-07',
        value: 41,
      },
      {
        date: '2012-09-08',
        value: 43,
      },
      {
        date: '2012-09-09',
        value: 40,
      },
      {
        date: '2012-09-10',
        value: 39,
      },
      {
        date: '2012-09-11',
        value: 34,
      },
      {
        date: '2012-09-12',
        value: 29,
      },
      {
        date: '2012-09-13',
        value: 34,
      },
      {
        date: '2012-09-14',
        value: 37,
      },
      {
        date: '2012-09-15',
        value: 42,
      },
      {
        date: '2012-09-16',
        value: 49,
      },
      {
        date: '2012-09-17',
        value: 46,
      },
      {
        date: '2012-09-18',
        value: 47,
      },
      {
        date: '2012-09-19',
        value: 55,
      },
      {
        date: '2012-09-20',
        value: 59,
      },
      {
        date: '2012-09-21',
        value: 58,
      },
      {
        date: '2012-09-22',
        value: 57,
      },
      {
        date: '2012-09-23',
        value: 61,
      },
      {
        date: '2012-09-24',
        value: 59,
      },
      {
        date: '2012-09-25',
        value: 67,
      },
      {
        date: '2012-09-26',
        value: 65,
      },
      {
        date: '2012-09-27',
        value: 61,
      },
      {
        date: '2012-09-28',
        value: 66,
      },
      {
        date: '2012-09-29',
        value: 69,
      },
      {
        date: '2012-09-30',
        value: 71,
      },
      {
        date: '2012-10-01',
        value: 67,
      },
      {
        date: '2012-10-02',
        value: 63,
      },
      {
        date: '2012-10-03',
        value: 46,
      },
      {
        date: '2012-10-04',
        value: 32,
      },
      {
        date: '2012-10-05',
        value: 21,
      },
      {
        date: '2012-10-06',
        value: 18,
      },
      {
        date: '2012-10-07',
        value: 21,
      },
      {
        date: '2012-10-08',
        value: 28,
      },
      {
        date: '2012-10-09',
        value: 27,
      },
      {
        date: '2012-10-10',
        value: 36,
      },
      {
        date: '2012-10-11',
        value: 33,
      },
      {
        date: '2012-10-12',
        value: 31,
      },
      {
        date: '2012-10-13',
        value: 30,
      },
      {
        date: '2012-10-14',
        value: 34,
      },
      {
        date: '2012-10-15',
        value: 38,
      },
      {
        date: '2012-10-16',
        value: 37,
      },
      {
        date: '2012-10-17',
        value: 44,
      },
      {
        date: '2012-10-18',
        value: 49,
      },
      {
        date: '2012-10-19',
        value: 53,
      },
      {
        date: '2012-10-20',
        value: 57,
      },
      {
        date: '2012-10-21',
        value: 60,
      },
      {
        date: '2012-10-22',
        value: 61,
      },
      {
        date: '2012-10-23',
        value: 69,
      },
      {
        date: '2012-10-24',
        value: 67,
      },
      {
        date: '2012-10-25',
        value: 72,
      },
      {
        date: '2012-10-26',
        value: 77,
      },
      {
        date: '2012-10-27',
        value: 75,
      },
      {
        date: '2012-10-28',
        value: 70,
      },
      {
        date: '2012-10-29',
        value: 72,
      },
      {
        date: '2012-10-30',
        value: 70,
      },
      {
        date: '2012-10-31',
        value: 72,
      },
      {
        date: '2012-11-01',
        value: 73,
      },
      {
        date: '2012-11-02',
        value: 67,
      },
      {
        date: '2012-11-03',
        value: 68,
      },
      {
        date: '2012-11-04',
        value: 65,
      },
      {
        date: '2012-11-05',
        value: 71,
      },
      {
        date: '2012-11-06',
        value: 75,
      },
      {
        date: '2012-11-07',
        value: 74,
      },
      {
        date: '2012-11-08',
        value: 71,
      },
      {
        date: '2012-11-09',
        value: 76,
      },
      {
        date: '2012-11-10',
        value: 77,
      },
      {
        date: '2012-11-11',
        value: 81,
      },
      {
        date: '2012-11-12',
        value: 83,
      },
      {
        date: '2012-11-13',
        value: 80,
      },
      {
        date: '2012-11-14',
        value: 81,
      },
      {
        date: '2012-11-15',
        value: 87,
      },
      {
        date: '2012-11-16',
        value: 82,
      },
      {
        date: '2012-11-17',
        value: 86,
      },
      {
        date: '2012-11-18',
        value: 80,
      },
      {
        date: '2012-11-19',
        value: 87,
      },
      {
        date: '2012-11-20',
        value: 83,
      },
      {
        date: '2012-11-21',
        value: 85,
      },
      {
        date: '2012-11-22',
        value: 84,
      },
      {
        date: '2012-11-23',
        value: 82,
      },
      {
        date: '2012-11-24',
        value: 73,
      },
      {
        date: '2012-11-25',
        value: 71,
      },
      {
        date: '2012-11-26',
        value: 75,
      },
      {
        date: '2012-11-27',
        value: 79,
      },
      {
        date: '2012-11-28',
        value: 70,
      },
      {
        date: '2012-11-29',
        value: 73,
      },
      {
        date: '2012-11-30',
        value: 61,
      },
      {
        date: '2012-12-01',
        value: 62,
      },
      {
        date: '2012-12-02',
        value: 66,
      },
      {
        date: '2012-12-03',
        value: 65,
      },
      {
        date: '2012-12-04',
        value: 73,
      },
      {
        date: '2012-12-05',
        value: 79,
      },
      {
        date: '2012-12-06',
        value: 78,
      },
      {
        date: '2012-12-07',
        value: 78,
      },
      {
        date: '2012-12-08',
        value: 78,
      },
      {
        date: '2012-12-09',
        value: 74,
      },
      {
        date: '2012-12-10',
        value: 73,
      },
      {
        date: '2012-12-11',
        value: 75,
      },
      {
        date: '2012-12-12',
        value: 70,
      },
      {
        date: '2012-12-13',
        value: 77,
      },
      {
        date: '2012-12-14',
        value: 67,
      },
      {
        date: '2012-12-15',
        value: 62,
      },
      {
        date: '2012-12-16',
        value: 64,
      },
      {
        date: '2012-12-17',
        value: 61,
      },
      {
        date: '2012-12-18',
        value: 59,
      },
      {
        date: '2012-12-19',
        value: 53,
      },
      {
        date: '2012-12-20',
        value: 54,
      },
      {
        date: '2012-12-21',
        value: 56,
      },
      {
        date: '2012-12-22',
        value: 59,
      },
      {
        date: '2012-12-23',
        value: 58,
      },
      {
        date: '2012-12-24',
        value: 55,
      },
      {
        date: '2012-12-25',
        value: 52,
      },
      {
        date: '2012-12-26',
        value: 54,
      },
      {
        date: '2012-12-27',
        value: 50,
      },
      {
        date: '2012-12-28',
        value: 50,
      },
      {
        date: '2012-12-29',
        value: 51,
      },
      {
        date: '2012-12-30',
        value: 52,
      },
      {
        date: '2012-12-31',
        value: 58,
      },
      {
        date: '2013-01-01',
        value: 60,
      },
      {
        date: '2013-01-02',
        value: 67,
      },
      {
        date: '2013-01-03',
        value: 64,
      },
      {
        date: '2013-01-04',
        value: 66,
      },
      {
        date: '2013-01-05',
        value: 60,
      },
      {
        date: '2013-01-06',
        value: 63,
      },
      {
        date: '2013-01-07',
        value: 61,
      },
      {
        date: '2013-01-08',
        value: 60,
      },
      {
        date: '2013-01-09',
        value: 65,
      },
      {
        date: '2013-01-10',
        value: 75,
      },
      {
        date: '2013-01-11',
        value: 77,
      },
      {
        date: '2013-01-12',
        value: 78,
      },
      {
        date: '2013-01-13',
        value: 70,
      },
      {
        date: '2013-01-14',
        value: 70,
      },
      {
        date: '2013-01-15',
        value: 73,
      },
      {
        date: '2013-01-16',
        value: 71,
      },
      {
        date: '2013-01-17',
        value: 74,
      },
      {
        date: '2013-01-18',
        value: 78,
      },
      {
        date: '2013-01-19',
        value: 85,
      },
      {
        date: '2013-01-20',
        value: 82,
      },
      {
        date: '2013-01-21',
        value: 83,
      },
      {
        date: '2013-01-22',
        value: 88,
      },
      {
        date: '2013-01-23',
        value: 85,
      },
      {
        date: '2013-01-24',
        value: 85,
      },
      {
        date: '2013-01-25',
        value: 80,
      },
      {
        date: '2013-01-26',
        value: 87,
      },
      {
        date: '2013-01-27',
        value: 84,
      },
      {
        date: '2013-01-28',
        value: 83,
      },
      {
        date: '2013-01-29',
        value: 84,
      },
      {
        date: '2013-01-30',
        value: 81,
      },
    ];

    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.dateX = 'date';
    series.tooltipText = '{value}';
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = 'middle';
    series.tooltip.label.textValign = 'middle';

    // Make bullets grow on hover
    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color('#fff');

    let bullethover = bullet.states.create('hover');
    bullethover.properties.scale = 1.3;

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'panXY';
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    // Create vertical scrollbar and place it before the value axis
    chart.scrollbarY = new am4core.Scrollbar() as any;
    chart.scrollbarY.parent = chart.leftAxesContainer;
    chart.scrollbarY.toBack();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    //let chartScrollbarX = chart.scrollbarX as any;
    chart.scrollbarX = new am4charts.XYChartScrollbar() as any;
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    dateAxis.start = 0.79;
    dateAxis.keepSelection = true;
  };
  lineChartZoom = () => {
    // Create chart instance
    let chart: any = am4core.create('lineChartZoom', am4charts.XYChart);

    // Add data
    chart.data = generateChartData();

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'visits';
    series.dataFields.dateX = 'date';
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = '{valueY}';
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12, 12, 12, 12);

    // Add scrollbar
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    function generateChartData() {
      let chartData = [];
      let firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 1000);
      let visits = 1200;
      for (var i = 0; i < 500; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        let newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        visits += Math.round(
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
        );

        chartData.push({
          date: newDate,
          visits: visits,
        });
      }
      return chartData;
    }
  };
  drawingChartSeries = () => {
    let chart: any = am4core.create('drawingChartSeries', am4charts.XYChart);
    chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (var i = 1; i < 500; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i, 0, 0, 0, 0), value: visits });
    }

    chart.data = data;

    let popup = chart.openPopup(
      '<div>Click on plot area to add points<br>Drag bullets to change values<br>Double click on bullet to remove</div>'
    );
    popup.top = 60;
    popup.right = 30;
    popup.defaultStyles = false;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 60;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    //valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = 'value';
    //series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.background.fillOpacity = 0.5;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.behavior = 'none';

    let scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX = scrollbarX;

    let newSeries;
    let addingPointsDisabled = false;

    addSeries();

    function addSeries() {
      newSeries = chart.series.push(new am4charts.LineSeries());
      newSeries.data = [];
      newSeries.dataFields.dateX = 'date';
      newSeries.dataFields.valueY = 'newValue';
      newSeries.interpolationDuration = 0;

      let bullet = newSeries.bullets.push(new am4charts.CircleBullet());
      bullet.draggable = true;

      bullet.events.on('dragged', function (event) {
        let bullet = event.target;

        let x = bullet.pixelX;
        //x = dateAxis.getX(bullet.dataItem, "dateX"); //  uncomment this line if you want to allow draggin bullets only along y axis

        bullet.moveTo({ x: x, y: bullet.pixelY }, undefined, undefined, true);
        bullet.dataItem.valueY = valueAxis.yToValue(bullet.pixelY);
        bullet.dataItem.dataContext.newValue = bullet.dataItem.valueY;

        // remove the following three lines if you want to allow draggin bullets only along y axis
        bullet.dataItem.dateX = dateAxis.xToValue(bullet.pixelX);
        bullet.dataItem.dataContext.date = bullet.dataItem.dateX;
        dateAxis.postProcessSeriesDataItem(bullet.dataItem);
      });

      bullet.events.on('down', function (event) {
        addingPointsDisabled = true;

        chart.cursor.triggerMove(
          { x: series.tooltipX, y: series.tooltipY },
          'hard'
        ); // sticks cursor to the point
      });

      bullet.events.on('dragstop', function (event) {
        let bullet = event.target;

        chart.cursor.triggerMove(
          { x: series.tooltipX, y: series.tooltipY },
          'none'
        ); // enables mouse following again

        addingPointsDisabled = false;
      });

      bullet.events.on('doublehit', function (event) {
        addingPointsDisabled = false;
        let dataItem = event.target.dataItem;
        let dataContext = dataItem.dataContext;
        newSeries.data.splice(newSeries.data.indexOf(dataContext), 1);
        newSeries.invalidateData();

        chart.cursor.triggerMove(
          { x: series.tooltipX, y: series.tooltipY },
          'none'
        ); // enables mouse following again
      });
    }

    let interaction = am4core.getInteraction();

    interaction.events.on('up', function (event) {
      if (newSeries && !addingPointsDisabled && chart.cursor.visible) {
        let date = series.tooltipDataItem.dateX;
        let point = am4core.utils.documentPointToSprite(
          event.pointer.point,
          chart.seriesContainer
        );
        let value = valueAxis.yToValue(point.y);
        if (value > valueAxis.min && value < valueAxis.max) {
          newSeries.data.push({ date: date, newValue: value });
          sortData();
          newSeries.invalidateData();
        }
      }
    });

    function sortData() {
      newSeries.data.sort(function (a, b) {
        let atime = a.date.getTime();
        let btime = b.date.getTime();

        if (atime < btime) {
          return -1;
        } else if (atime == btime) {
          return 0;
        } else {
          return 1;
        }
      });
    }
  };
  comparingDataChart = () => {
    // Create chart instance
    let chart = am4core.create('comparingDataChart', am4charts.XYChart);

    // Add data
    chart.data = [
      {
        date: new Date(2019, 5, 12),
        value1: 50,
        value2: 48,
        previousDate: new Date(2019, 5, 5),
      },
      {
        date: new Date(2019, 5, 13),
        value1: 53,
        value2: 51,
        previousDate: new Date(2019, 5, 6),
      },
      {
        date: new Date(2019, 5, 14),
        value1: 56,
        value2: 58,
        previousDate: new Date(2019, 5, 7),
      },
      {
        date: new Date(2019, 5, 15),
        value1: 52,
        value2: 53,
        previousDate: new Date(2019, 5, 8),
      },
      {
        date: new Date(2019, 5, 16),
        value1: 48,
        value2: 44,
        previousDate: new Date(2019, 5, 9),
      },
      {
        date: new Date(2019, 5, 17),
        value1: 47,
        value2: 42,
        previousDate: new Date(2019, 5, 10),
      },
      {
        date: new Date(2019, 5, 18),
        value1: 59,
        value2: 55,
        previousDate: new Date(2019, 5, 11),
      },
    ];

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'value1';
    series.dataFields.dateX = 'date';
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText =
      '[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}';
    series.tooltip.pointerOrientation = 'vertical';

    // Create series
    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = 'value2';
    series2.dataFields.dateX = 'date';
    series2.strokeWidth = 2;
    series2.strokeDasharray = '3,4';
    series2.stroke = series.stroke;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
  };
  durationValueAxis = () => {
    // Create chart instance
    let chart = am4core.create('durationValueAxis', am4charts.XYChart);

    chart.colors.step = 2;
    chart.maskBullets = false;

    // Add data
    chart.data = [
      {
        date: '2012-01-01',
        distance: 227,
        townName: 'New York',
        townName2: 'New York',
        townSize: 12,
        latitude: 40.71,
        duration: 408,
      },
      {
        date: '2012-01-02',
        distance: 371,
        townName: 'Washington',
        townSize: 7,
        latitude: 38.89,
        duration: 482,
      },
      {
        date: '2012-01-03',
        distance: 433,
        townName: 'Wilmington',
        townSize: 3,
        latitude: 34.22,
        duration: 562,
      },
      {
        date: '2012-01-04',
        distance: 345,
        townName: 'Jacksonville',
        townSize: 3.5,
        latitude: 30.35,
        duration: 379,
      },
      {
        date: '2012-01-05',
        distance: 480,
        townName: 'Miami',
        townName2: 'Miami',
        townSize: 5,
        latitude: 25.83,
        duration: 501,
      },
      {
        date: '2012-01-06',
        distance: 386,
        townName: 'Tallahassee',
        townSize: 3.5,
        latitude: 30.46,
        duration: 443,
      },
      {
        date: '2012-01-07',
        distance: 348,
        townName: 'New Orleans',
        townSize: 5,
        latitude: 29.94,
        duration: 405,
      },
      {
        date: '2012-01-08',
        distance: 238,
        townName: 'Houston',
        townName2: 'Houston',
        townSize: 8,
        latitude: 29.76,
        duration: 309,
      },
      {
        date: '2012-01-09',
        distance: 218,
        townName: 'Dalas',
        townSize: 8,
        latitude: 32.8,
        duration: 287,
      },
      {
        date: '2012-01-10',
        distance: 349,
        townName: 'Oklahoma City',
        townSize: 5,
        latitude: 35.49,
        duration: 485,
      },
      {
        date: '2012-01-11',
        distance: 603,
        townName: 'Kansas City',
        townSize: 5,
        latitude: 39.1,
        duration: 890,
      },
      {
        date: '2012-01-12',
        distance: 534,
        townName: 'Denver',
        townName2: 'Denver',
        townSize: 9,
        latitude: 39.74,
        duration: 810,
      },
      {
        date: '2012-01-13',
        townName: 'Salt Lake City',
        townSize: 6,
        distance: 425,
        duration: 670,
        latitude: 40.75,
        dashLength: 8,
        alpha: 0.4,
      },
      {
        date: '2012-01-14',
        latitude: 36.1,
        duration: 470,
        townName: 'Las Vegas',
        townName2: 'Las Vegas',
      },
      {
        date: '2012-01-15',
      },
      {
        date: '2012-01-16',
      },
      {
        date: '2012-01-17',
      },
    ];

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.renderer.fullWidthTooltip = true;

    let distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
    distanceAxis.title.text = 'Distance';
    //distanceAxis.renderer.grid.template.disabled = true;

    let durationAxis = chart.yAxes.push(new am4charts.DurationAxis());
    durationAxis.title.text = 'Duration';
    durationAxis.baseUnit = 'minute';
    //durationAxis.renderer.grid.template.disabled = true;
    durationAxis.renderer.opposite = true;
    durationAxis.syncWithAxis = distanceAxis;

    durationAxis.durationFormatter.durationFormat = "hh'h' mm'min'";

    let latitudeAxis = chart.yAxes.push(new am4charts.ValueAxis());
    latitudeAxis.renderer.grid.template.disabled = true;
    latitudeAxis.renderer.labels.template.disabled = true;
    latitudeAxis.syncWithAxis = distanceAxis;

    // Create series
    let distanceSeries = chart.series.push(new am4charts.ColumnSeries());
    distanceSeries.dataFields.valueY = 'distance';
    distanceSeries.dataFields.dateX = 'date';
    distanceSeries.yAxis = distanceAxis;
    distanceSeries.tooltipText = '{valueY} miles';
    distanceSeries.name = 'Distance';
    distanceSeries.columns.template.fillOpacity = 0.7;
    distanceSeries.columns.template.propertyFields.strokeDasharray =
      'dashLength';
    distanceSeries.columns.template.propertyFields.fillOpacity = 'alpha';
    distanceSeries.showOnInit = true;

    let distanceState = distanceSeries.columns.template.states.create('hover');
    distanceState.properties.fillOpacity = 0.9;

    let durationSeries = chart.series.push(new am4charts.LineSeries());
    durationSeries.dataFields.valueY = 'duration';
    durationSeries.dataFields.dateX = 'date';
    durationSeries.yAxis = durationAxis;
    durationSeries.name = 'Duration';
    durationSeries.strokeWidth = 2;
    durationSeries.propertyFields.strokeDasharray = 'dashLength';
    durationSeries.tooltipText = '{valueY.formatDuration()}';
    durationSeries.showOnInit = true;

    let durationBullet = durationSeries.bullets.push(new am4charts.Bullet());
    let durationRectangle = durationBullet.createChild(am4core.Rectangle);
    durationBullet.horizontalCenter = 'middle';
    durationBullet.verticalCenter = 'middle';
    durationBullet.width = 7;
    durationBullet.height = 7;
    durationRectangle.width = 7;
    durationRectangle.height = 7;

    let durationState = durationBullet.states.create('hover');
    durationState.properties.scale = 1.2;

    let latitudeSeries = chart.series.push(new am4charts.LineSeries());
    latitudeSeries.dataFields.valueY = 'latitude';
    latitudeSeries.dataFields.dateX = 'date';
    latitudeSeries.yAxis = latitudeAxis;
    latitudeSeries.name = 'Duration';
    latitudeSeries.strokeWidth = 2;
    latitudeSeries.propertyFields.strokeDasharray = 'dashLength';
    latitudeSeries.tooltipText = 'Latitude: {valueY} ({townName})';
    latitudeSeries.showOnInit = true;

    let latitudeBullet = latitudeSeries.bullets.push(
      new am4charts.CircleBullet()
    );
    latitudeBullet.circle.fill = am4core.color('#fff');
    latitudeBullet.circle.strokeWidth = 2;
    latitudeBullet.circle.propertyFields.radius = 'townSize';

    let latitudeState = latitudeBullet.states.create('hover');
    latitudeState.properties.scale = 1.2;

    let latitudeLabel = latitudeSeries.bullets.push(
      new am4charts.LabelBullet()
    );
    latitudeLabel.label.text = '{townName2}';
    latitudeLabel.label.horizontalCenter = 'left';
    latitudeLabel.label.dx = 14;

    // Add legend
    chart.legend = new am4charts.Legend();

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.fullWidthLineX = true;
    chart.cursor.xAxis = dateAxis;
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineX.fill = am4core.color('#000');
    chart.cursor.lineX.fillOpacity = 0.1;
  };
  ngOnInit(): void {}
  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
