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
import * as am4plugins_venn from '@amcharts/amcharts4/plugins/venn';
@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.scss'],
})
export class ChartListComponent implements OnInit {
  private chart: am4charts.XYChart;
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    am4core.useTheme(am4themes_animated);
    this.ganttChart();
    this.stackedAreaChart();
    this.venndiagramChart();
    this.rangeAreaChart();
    this.stepLineChart();
    this.scatterChart();
    this.waterFallChart();
    this.donutChart();
    this.nestedDonutChart();
    this.semiCirclePieChart();
    this.clusteredBarChart();
    this.stackedBarChart();
  }
  ganttChart = () => {
    let chart = am4core.create('ganttChart', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 30;
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm';

    let colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = [
      {
        name: 'John',
        fromDate: '2018-01-01 08:00',
        toDate: '2018-01-01 10:00',
        color: colorSet.getIndex(0).brighten(0),
      },
      {
        name: 'John',
        fromDate: '2018-01-01 12:00',
        toDate: '2018-01-01 15:00',
        color: colorSet.getIndex(0).brighten(0.4),
      },
      {
        name: 'John',
        fromDate: '2018-01-01 15:30',
        toDate: '2018-01-01 21:30',
        color: colorSet.getIndex(0).brighten(0.8),
      },

      {
        name: 'Jane',
        fromDate: '2018-01-01 09:00',
        toDate: '2018-01-01 12:00',
        color: colorSet.getIndex(2).brighten(0),
      },
      {
        name: 'Jane',
        fromDate: '2018-01-01 13:00',
        toDate: '2018-01-01 17:00',
        color: colorSet.getIndex(2).brighten(0.4),
      },

      {
        name: 'Peter',
        fromDate: '2018-01-01 11:00',
        toDate: '2018-01-01 16:00',
        color: colorSet.getIndex(4).brighten(0),
      },
      {
        name: 'Peter',
        fromDate: '2018-01-01 16:00',
        toDate: '2018-01-01 19:00',
        color: colorSet.getIndex(4).brighten(0.4),
      },

      {
        name: 'Melania',
        fromDate: '2018-01-01 16:00',
        toDate: '2018-01-01 20:00',
        color: colorSet.getIndex(6).brighten(0),
      },
      {
        name: 'Melania',
        fromDate: '2018-01-01 20:30',
        toDate: '2018-01-01 24:00',
        color: colorSet.getIndex(6).brighten(0.4),
      },

      {
        name: 'Donald',
        fromDate: '2018-01-01 13:00',
        toDate: '2018-01-01 24:00',
        color: colorSet.getIndex(8).brighten(0),
      },
    ];

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormatter.dateFormat = 'yyyy-MM-dd HH:mm';
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 30, timeUnit: 'minute' };
    dateAxis.max = new Date(2018, 0, 1, 24, 0, 0, 0).getTime();
    dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText = '{name}: {openDateX} - {dateX}';

    series1.dataFields.openDateX = 'fromDate';
    series1.dataFields.dateX = 'toDate';
    series1.dataFields.categoryY = 'name';
    series1.columns.template.propertyFields.fill = 'color'; // get color from data
    series1.columns.template.propertyFields.stroke = 'color';
    series1.columns.template.strokeOpacity = 1;

    chart.scrollbarX = new am4core.Scrollbar();
  };
  stackedAreaChart = () => {
    let chart = am4core.create('stackedAreaChart', am4charts.XYChart);

    chart.data = [
      {
        year: '1994',
        cars: 1587,
        motorcycles: 650,
        bicycles: 121,
      },
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
        cars: 1318,
        motorcycles: 697,
        bicycles: 111,
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

    chart.dateFormatter.inputDateFormat = 'yyyy';
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;
    dateAxis.baseInterval = {
      timeUnit: 'year',
      count: 1,
    };

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'year';
    series.name = 'cars';
    series.dataFields.valueY = 'cars';
    series.tooltipHTML =
      "<img src='https://www.amcharts.com/lib/3/images/car.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
    series.tooltipText = '[#000]{valueY.value}[/]';
    series.tooltip.background.fill = am4core.color('#FFF');
    series.tooltip.getStrokeFromObject = true;
    series.tooltip.background.strokeWidth = 3;
    series.tooltip.getFillFromObject = false;
    series.fillOpacity = 0.6;
    series.strokeWidth = 2;
    series.stacked = true;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = 'motorcycles';
    series2.dataFields.dateX = 'year';
    series2.dataFields.valueY = 'motorcycles';
    series2.tooltipHTML =
      "<img src='https://www.amcharts.com/lib/3/images/motorcycle.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
    series2.tooltipText = '[#000]{valueY.value}[/]';
    series2.tooltip.background.fill = am4core.color('#FFF');
    series2.tooltip.getFillFromObject = false;
    series2.tooltip.getStrokeFromObject = true;
    series2.tooltip.background.strokeWidth = 3;
    series2.sequencedInterpolation = true;
    series2.fillOpacity = 0.6;
    series2.stacked = true;
    series2.strokeWidth = 2;

    let series3 = chart.series.push(new am4charts.LineSeries());
    series3.name = 'bicycles';
    series3.dataFields.dateX = 'year';
    series3.dataFields.valueY = 'bicycles';
    series3.tooltipHTML =
      "<img src='https://www.amcharts.com/lib/3/images/bicycle.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
    series3.tooltipText = '[#000]{valueY.value}[/]';
    series3.tooltip.background.fill = am4core.color('#FFF');
    series3.tooltip.getFillFromObject = false;
    series3.tooltip.getStrokeFromObject = true;
    series3.tooltip.background.strokeWidth = 3;
    series3.sequencedInterpolation = true;
    series3.fillOpacity = 0.6;
    series3.defaultState.transitionDuration = 1000;
    series3.stacked = true;
    series3.strokeWidth = 2;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.scrollbarX = new am4core.Scrollbar();

    // Add a legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top';

    // axis ranges
    let range = dateAxis.axisRanges.create();
    range.date = new Date(2001, 0, 1);
    range.endDate = new Date(2003, 0, 1);
    range.axisFill.fill = chart.colors.getIndex(7);
    range.axisFill.fillOpacity = 0.2;

    range.label.text = 'Fines for speeding increased';
    range.label.inside = true;
    range.label.rotation = 90;
    range.label.horizontalCenter = 'right';
    range.label.verticalCenter = 'bottom';

    let range2 = dateAxis.axisRanges.create();
    range2.date = new Date(2007, 0, 1);
    range2.grid.stroke = chart.colors.getIndex(7);
    range2.grid.strokeOpacity = 0.6;
    range2.grid.strokeDasharray = '5,2';

    range2.label.text = 'Motorcycle fee introduced';
    range2.label.inside = true;
    range2.label.rotation = 90;
    range2.label.horizontalCenter = 'right';
    range2.label.verticalCenter = 'bottom';
  };
  venndiagramChart = () => {
    let data = [
      { name: 'A', value: 10 },
      { name: 'B', value: 10 },
      { name: 'C', value: 10 },
      { name: 'X', value: 2, sets: ['A', 'B'] },
      { name: 'Y', value: 2, sets: ['A', 'C'] },
      { name: 'Z', value: 2, sets: ['B', 'C'] },
      { name: 'Q', value: 1, sets: ['A', 'B', 'C'] },
    ];

    let chart = am4core.create('venndiagramChart', am4plugins_venn.VennDiagram);
    let series = chart.series.push(new am4plugins_venn.VennSeries());

    series.dataFields.category = 'name';
    series.dataFields.value = 'value';
    series.dataFields.intersections = 'sets';
    series.data = data;

    chart.legend = new am4charts.Legend();
    chart.legend.marginTop = 40;
  };
  rangeAreaChart = () => {
    let chart = am4core.create('rangeAreaChart', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    let data = [];
    let open = 100;
    let close = 250;

    for (var i = 1; i < 120; i++) {
      open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 4);
      close = Math.round(
        open +
          Math.random() * 5 +
          i / 5 -
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2
      );
      data.push({ date: new Date(2018, 0, i), open: open, close: close });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.openValueY = 'open';
    series.dataFields.valueY = 'close';
    series.tooltipText = 'open: {openValueY.value} close: {valueY.value}';
    series.sequencedInterpolation = true;
    series.fillOpacity = 0.3;
    series.defaultState.transitionDuration = 1000;
    series.tensionX = 0.8;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.dateX = 'date';
    series2.dataFields.valueY = 'open';
    series2.sequencedInterpolation = true;
    series2.defaultState.transitionDuration = 1500;
    series2.stroke = chart.colors.getIndex(6);
    series2.tensionX = 0.8;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.scrollbarX = new am4core.Scrollbar();
  };
  stepLineChart = () => {
    // Create chart
    let chart = am4core.create('stepLineChart', am4charts.XYChart);
    chart.paddingRight = 20;

    let data = [
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

    chart.data = data;
    chart.dateFormatter.inputDateFormat = 'yyyy';

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.baseInterval = { timeUnit: 'year', count: 1 };

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    let series = chart.series.push(new am4charts.StepLineSeries());
    series.dataFields.dateX = 'year';
    series.dataFields.valueY = 'value';
    series.tooltipText = '{valueY.value}';
    series.strokeWidth = 3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.fullWidthLineX = true;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = chart.colors.getIndex(2);
    chart.cursor.lineX.fillOpacity = 0.1;

    chart.scrollbarX = new am4core.Scrollbar();
  };
  scatterChart = () => {
    // Create chart instance
    let chart = am4core.create('scatterChart', am4charts.XYChart);

    // Add data
    chart.data = [
      {
        ax: 1,
        ay: 0.5,
        bx: 1,
        by: 2.2,
      },
      {
        ax: 2,
        ay: 1.3,
        bx: 2,
        by: 4.9,
      },
      {
        ax: 3,
        ay: 2.3,
        bx: 3,
        by: 5.1,
      },
      {
        ax: 4,
        ay: 2.8,
        bx: 4,
        by: 5.3,
      },
      {
        ax: 5,
        ay: 3.5,
        bx: 5,
        by: 6.1,
      },
      {
        ax: 6,
        ay: 5.1,
        bx: 6,
        by: 8.3,
      },
      {
        ax: 7,
        ay: 6.7,
        bx: 7,
        by: 10.5,
      },
      {
        ax: 8,
        ay: 8,
        bx: 8,
        by: 12.3,
      },
      {
        ax: 9,
        ay: 8.9,
        bx: 9,
        by: 14.5,
      },
      {
        ax: 10,
        ay: 9.7,
        bx: 10,
        by: 15,
      },
      {
        ax: 11,
        ay: 10.4,
        bx: 11,
        by: 18.8,
      },
      {
        ax: 12,
        ay: 11.7,
        bx: 12,
        by: 19,
      },
    ];

    // Create axes
    let valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxisX.title.text = 'X Axis';
    valueAxisX.renderer.minGridDistance = 40;

    // Create value axis
    let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxisY.title.text = 'Y Axis';

    // Create series
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = 'ay';
    lineSeries.dataFields.valueX = 'ax';
    lineSeries.strokeOpacity = 0;

    let lineSeries2 = chart.series.push(new am4charts.LineSeries());
    lineSeries2.dataFields.valueY = 'by';
    lineSeries2.dataFields.valueX = 'bx';
    lineSeries2.strokeOpacity = 0;

    // Add a bullet
    let bullet = lineSeries.bullets.push(new am4charts.Bullet());

    // Add a triangle to act as am arrow
    let arrow = bullet.createChild(am4core.Triangle);
    arrow.horizontalCenter = 'middle';
    arrow.verticalCenter = 'middle';
    arrow.strokeWidth = 0;
    arrow.fill = chart.colors.getIndex(0);
    arrow.direction = 'top';
    arrow.width = 12;
    arrow.height = 12;

    // Add a bullet
    let bullet2 = lineSeries2.bullets.push(new am4charts.Bullet());

    // Add a triangle to act as am arrow
    let arrow2 = bullet2.createChild(am4core.Triangle);
    arrow2.horizontalCenter = 'middle';
    arrow2.verticalCenter = 'middle';
    arrow2.rotation = 180;
    arrow2.strokeWidth = 0;
    arrow2.fill = chart.colors.getIndex(3);
    arrow2.direction = 'top';
    arrow2.width = 12;
    arrow2.height = 12;

    //add the trendlines
    let trend = chart.series.push(new am4charts.LineSeries());
    trend.dataFields.valueY = 'value2';
    trend.dataFields.valueX = 'value';
    trend.strokeWidth = 2;
    trend.stroke = chart.colors.getIndex(0);
    trend.strokeOpacity = 0.7;
    trend.data = [
      { value: 1, value2: 2 },
      { value: 12, value2: 11 },
    ];

    let trend2 = chart.series.push(new am4charts.LineSeries());
    trend2.dataFields.valueY = 'value2';
    trend2.dataFields.valueX = 'value';
    trend2.strokeWidth = 2;
    trend2.stroke = chart.colors.getIndex(3);
    trend2.strokeOpacity = 0.7;
    trend2.data = [
      { value: 1, value2: 1 },
      { value: 12, value2: 19 },
    ];

    //scrollbars
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();
  };
  waterFallChart = () => {
    let chart = am4core.create('waterFallChart', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    // using math in the data instead of final values just to illustrate the idea of Waterfall chart
    // a separate data field for step series is added because we don't need last step (notice, the last data item doesn't have stepValue)
    chart.data = [
      {
        category: 'Net revenue',
        value: 8786,
        open: 0,
        stepValue: 8786,
        color: chart.colors.getIndex(13),
        displayValue: 8786,
      },
      {
        category: 'Cost of sales',
        value: 8786 - 2786,
        open: 8786,
        stepValue: 8786 - 2786,
        color: chart.colors.getIndex(8),
        displayValue: 2786,
      },
      {
        category: 'Operating expenses',
        value: 8786 - 2786 - 1786,
        open: 8786 - 2786,
        stepValue: 8786 - 2786 - 1786,
        color: chart.colors.getIndex(9),
        displayValue: 1786,
      },
      {
        category: 'Amortisation',
        value: 8786 - 2786 - 1786 - 453,
        open: 8786 - 2786 - 1786,
        stepValue: 8786 - 2786 - 1786 - 453,
        color: chart.colors.getIndex(10),
        displayValue: 453,
      },
      {
        category: 'Income from equity',
        value: 8786 - 2786 - 1786 - 453 + 1465,
        open: 8786 - 2786 - 1786 - 453,
        stepValue: 8786 - 2786 - 1786 - 453 + 1465,
        color: chart.colors.getIndex(16),
        displayValue: 1465,
      },
      {
        category: 'Operating income',
        value: 8786 - 2786 - 1786 - 453 + 1465,
        open: 0,
        color: chart.colors.getIndex(17),
        displayValue: 8786 - 2786 - 1786 - 453 + 1465,
      },
    ];

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.minGridDistance = 40;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.dataFields.categoryX = 'category';
    columnSeries.dataFields.valueY = 'value';
    columnSeries.dataFields.openValueY = 'open';
    columnSeries.fillOpacity = 0.8;
    columnSeries.sequencedInterpolation = true;
    columnSeries.interpolationDuration = 1500;

    let columnTemplate = columnSeries.columns.template;
    columnTemplate.strokeOpacity = 0;
    columnTemplate.propertyFields.fill = 'color';

    let label = columnTemplate.createChild(am4core.Label);
    label.text = "{displayValue.formatNumber('$#,## a')}";
    label.align = 'center';
    label.valign = 'middle';

    let stepSeries = chart.series.push(new am4charts.StepLineSeries());
    stepSeries.dataFields.categoryX = 'category';
    stepSeries.dataFields.valueY = 'stepValue';
    stepSeries.noRisers = true;
    stepSeries.stroke = new am4core.InterfaceColorSet().getFor(
      'alternativeBackground'
    );
    stepSeries.strokeDasharray = '3,3';
    stepSeries.interpolationDuration = 2000;
    stepSeries.sequencedInterpolation = true;

    // because column width is 80%, we modify start/end locations so that step would start with column and end with next column
    stepSeries.startLocation = 0.1;
    stepSeries.endLocation = 1.1;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'none';
  };
  donutChart = () => {
    // Create chart instance
    let chart = am4core.create('donutChart', am4charts.PieChart);

    // Add data
    chart.data = [
      {
        country: 'Lithuania',
        litres: 501.9,
      },
      {
        country: 'Czech Republic',
        litres: 301.9,
      },
      {
        country: 'Ireland',
        litres: 201.1,
      },
      {
        country: 'Germany',
        litres: 165.8,
      },
      {
        country: 'Australia',
        litres: 139.9,
      },
      {
        country: 'Austria',
        litres: 128.3,
      },
      {
        country: 'UK',
        litres: 99,
      },
      {
        country: 'Belgium',
        litres: 60,
      },
      {
        country: 'The Netherlands',
        litres: 50,
      },
    ];

    // Set inner radius
    chart.innerRadius = am4core.percent(50);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'litres';
    pieSeries.dataFields.category = 'country';
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
  };
  nestedDonutChart = () => {
    // Create chart instance
    let chart = am4core.create('nestedDonutChart', am4charts.PieChart);

    // Let's cut a hole in our Pie chart the size of 40% the radius
    chart.innerRadius = am4core.percent(40);

    // Add data
    chart.data = [
      {
        country: 'Lithuania',
        litres: 501.9,
        bottles: 1500,
      },
      {
        country: 'Czech Republic',
        litres: 301.9,
        bottles: 990,
      },
      {
        country: 'Ireland',
        litres: 201.1,
        bottles: 785,
      },
      {
        country: 'Germany',
        litres: 165.8,
        bottles: 255,
      },
      {
        country: 'Australia',
        litres: 139.9,
        bottles: 452,
      },
      {
        country: 'Austria',
        litres: 128.3,
        bottles: 332,
      },
      {
        country: 'UK',
        litres: 99,
        bottles: 150,
      },
      {
        country: 'Belgium',
        litres: 60,
        bottles: 178,
      },
      {
        country: 'The Netherlands',
        litres: 50,
        bottles: 50,
      },
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'litres';
    pieSeries.dataFields.category = 'country';
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // Disabling labels and ticks on inner circle
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    // Disable sliding out of slices
    pieSeries.slices.template.states.getKey('hover').properties.shiftRadius = 0;
    pieSeries.slices.template.states.getKey('hover').properties.scale = 0.9;

    // Add second series
    let pieSeries2 = chart.series.push(new am4charts.PieSeries());
    pieSeries2.dataFields.value = 'bottles';
    pieSeries2.dataFields.category = 'country';
    pieSeries2.slices.template.stroke = am4core.color('#fff');
    pieSeries2.slices.template.strokeWidth = 2;
    pieSeries2.slices.template.strokeOpacity = 1;
    pieSeries2.slices.template.states.getKey(
      'hover'
    ).properties.shiftRadius = 0;
    pieSeries2.slices.template.states.getKey('hover').properties.scale = 1.1;
  };
  semiCirclePieChart = () => {
    let chart = am4core.create('semiCirclePieChart', am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        country: 'Lithuania',
        value: 401,
      },
      {
        country: 'Czech Republic',
        value: 300,
      },
      {
        country: 'Ireland',
        value: 200,
      },
      {
        country: 'Germany',
        value: 165,
      },
      {
        country: 'Australia',
        value: 139,
      },
      {
        country: 'Austria',
        value: 128,
      },
    ];
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = 'value';
    series.dataFields.category = 'country';

    series.slices.template.cornerRadius = 10;
    series.slices.template.innerCornerRadius = 7;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;
    series.alignLabels = false;

    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;

    chart.legend = new am4charts.Legend();
  };
  clusteredBarChart = () => {
    // Create chart instance
    let chart = am4core.create('clusteredBarChart', am4charts.XYChart);

    // Add data
    chart.data = [
      {
        year: 2005,
        income: 23.5,
        expenses: 18.1,
      },
      {
        year: 2006,
        income: 26.2,
        expenses: 22.8,
      },
      {
        year: 2007,
        income: 30.1,
        expenses: 23.9,
      },
      {
        year: 2008,
        income: 29.5,
        expenses: 25.1,
      },
      {
        year: 2009,
        income: 24.6,
        expenses: 25,
      },
    ];

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.numberFormatter.numberFormat = '#';
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;

    // Create series
    function createSeries(field, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = 'year';
      series.name = name;
      series.columns.template.tooltipText = '{name}: [bold]{valueX}[/]';
      series.columns.template.height = am4core.percent(100);
      series.sequencedInterpolation = true;

      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = '{valueX}';
      valueLabel.label.horizontalCenter = 'left';
      valueLabel.label.dx = 10;
      valueLabel.label.hideOversized = false;
      valueLabel.label.truncate = false;

      let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
      categoryLabel.label.text = '{name}';
      categoryLabel.label.horizontalCenter = 'right';
      categoryLabel.label.dx = -10;
      categoryLabel.label.fill = am4core.color('#fff');
      categoryLabel.label.hideOversized = false;
      categoryLabel.label.truncate = false;
    }

    createSeries('income', 'Income');
    createSeries('expenses', 'Expenses');
  };
  stackedBarChart = () => {
    // Create chart instance
    let chart = am4core.create('stackedBarChart', am4charts.XYChart);

    // Add data
    chart.data = [
      {
        year: '2016',
        europe: 2.5,
        namerica: 2.5,
        asia: 2.1,
        lamerica: 0.3,
        meast: 0.2,
        africa: 0.1,
      },
      {
        year: '2017',
        europe: 2.6,
        namerica: 2.7,
        asia: 2.2,
        lamerica: 0.3,
        meast: 0.3,
        africa: 0.1,
      },
      {
        year: '2018',
        europe: 2.8,
        namerica: 2.9,
        asia: 2.4,
        lamerica: 0.3,
        meast: 0.3,
        africa: 0.1,
      },
    ];

    chart.legend = new am4charts.Legend();
    chart.legend.position = 'right';

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.renderer.grid.template.opacity = 0;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.grid.template.opacity = 0;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.stroke = am4core.color('#495C43');
    valueAxis.renderer.ticks.template.length = 10;
    valueAxis.renderer.line.strokeOpacity = 0.5;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.minGridDistance = 40;

    // Create series
    function createSeries(field, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = 'year';
      series.stacked = true;
      series.name = name;

      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.locationX = 0.5;
      labelBullet.label.text = '{valueX}';
      labelBullet.label.fill = am4core.color('#fff');
    }

    createSeries('europe', 'Europe');
    createSeries('namerica', 'North America');
    createSeries('asia', 'Asia');
    createSeries('lamerica', 'Latin America');
    createSeries('meast', 'Middle East');
    createSeries('africa', 'Africa');
  };
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
