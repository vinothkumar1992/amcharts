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

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss'],
})
export class PiechartComponent implements OnInit {
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
    this.pieChart();
    this.pulletChart();
    this.lineChart();
    this.pyramidChart();
    this.guageChart();
    this.funnelChart();
    this.pictorialColumnChart();
    this.worldMapBubbles();
    this.barBulletChart();
    this.cyclinder3DChart();
    this.column3DChart();
    this.stackedColumn3DCharts();
    this.barChartRace();
    this.radarColumnSort();
    this.timeLineChart();
    this.radialHistogramChart();
    this.polarAreaChart();
    this.lineGraphChart();
    this.radialLineGraph();
    this.dumblePlotChat();
    this.chordChard();
    this.directedTreeChart();

    // chart1 code goes in here

    //
  }
  pieChart = () => {
    // Create chart instance
    let chart = am4core.create('pieChart', am4charts.PieChart);

    // Add data
    chart.data = [
      {
        country: 'Lithuania',
        litres: 501.9,
      },
      {
        country: 'Czechia',
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
  //Pullet Chart
  pulletChart = () => {
    let chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingBottom = 30;

    chart.data = [
      {
        name: 'Monica',
        steps: 45688,
        href: 'https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg',
      },
      {
        name: 'Joey',
        steps: 35781,
        href: 'https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg',
      },
      {
        name: 'Ross',
        steps: 25464,
        href: 'https://www.amcharts.com/wp-content/uploads/2019/04/ross.jpg',
      },
      {
        name: 'Phoebe',
        steps: 18788,
        href: 'https://www.amcharts.com/wp-content/uploads/2019/04/phoebe.jpg',
      },
      {
        name: 'Rachel',
        steps: 15465,
        href: 'https://www.amcharts.com/wp-content/uploads/2019/04/rachel.jpg',
      },
      {
        name: 'Chandler',
        steps: 11561,
        href:
          'https://www.amcharts.com/wp-content/uploads/2019/04/chandler.jpg',
      },
    ];

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.dy = 35;
    categoryAxis.renderer.tooltip.dy = 35;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.fillOpacity = 0.3;
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.baseGrid.strokeOpacity = 0;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'steps';
    series.dataFields.categoryX = 'name';
    series.tooltipText = '{valueY.value}';
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.dy = -6;
    series.columnsContainer.zIndex = 100;

    let columnTemplate = series.columns.template;
    columnTemplate.width = am4core.percent(50);
    columnTemplate.maxWidth = 66;
    columnTemplate.column.cornerRadius(60, 60, 10, 10);
    columnTemplate.strokeOpacity = 0;

    series.heatRules.push({
      target: columnTemplate,
      property: 'fill',
      dataField: 'valueY',
      min: am4core.color('#e5dc36'),
      max: am4core.color('#5faa46'),
    });
    series.mainContainer.mask = undefined;

    let cursor = new am4charts.XYCursor();
    chart.cursor = cursor;
    cursor.lineX.disabled = true;
    cursor.lineY.disabled = true;
    cursor.behavior = 'none';

    let bullet = columnTemplate.createChild(am4charts.CircleBullet);
    //bullet.mouseOptions={}
    bullet.circle.radius = 30;
    bullet.valign = 'bottom';
    bullet.align = 'center';
    bullet.isMeasured = true;
    bullet.mouseOptions.sensitivity = 0.5;
    bullet.verticalCenter = 'bottom';
    bullet.interactionsEnabled = false;

    let hoverState = bullet.states.create('hover');
    let outlineCircle = bullet.createChild(am4core.Circle);
    outlineCircle.adapter.add('radius', function (radius, target) {
      let circleBullet: any = target.parent;
      console.log(circleBullet.circle);
      return circleBullet.circle.pixelRadius + 10;
    });

    let image = bullet.createChild(am4core.Image);
    image.width = 60;
    image.height = 60;
    image.horizontalCenter = 'middle';
    image.verticalCenter = 'middle';
    image.propertyFields.href = 'href';

    image.adapter.add('mask', function (mask, target) {
      let circleBullet: any = target.parent;
      console.log(circleBullet);
      return circleBullet.circle;
    });

    let previousBullet;
    chart.cursor.events.on('cursorpositionchanged', function (event) {
      let dataItem: any = series.tooltipDataItem;

      if (dataItem.column) {
        let bullet = dataItem.column.children.getIndex(1);

        if (previousBullet && previousBullet != bullet) {
          previousBullet.isHover = false;
        }

        if (previousBullet != bullet) {
          let hs = bullet.states.getKey('hover');
          hs.properties.dy = -bullet.parent.pixelHeight + 30;
          bullet.isHover = true;

          previousBullet = bullet;
        }
      }
    });
  };
  lineChart = () => {
    let chart1 = am4core.create('chartdiv1', am4charts.XYChart);

    chart1.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({
        date: new Date(2018, 0, i),
        name: 'name' + i,
        value: visits,
      });
    }

    chart1.data = data;

    let dateAxis = chart1.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis1 = chart1.yAxes.push(new am4charts.ValueAxis());
    valueAxis1.tooltip.disabled = true;
    valueAxis1.renderer.minWidth = 35;

    let series1 = chart1.series.push(new am4charts.LineSeries());
    series1.dataFields.dateX = 'date';
    series1.dataFields.valueY = 'value';
    series1.tooltipText = '{valueY.value}';

    chart1.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series1);
    chart1.scrollbarX = scrollbarX;

    this.chart1 = chart1;
  };

  pyramidChart = () => {
    let chart = am4core.create('pyramidChart', am4charts.SlicedChart);
    chart.paddingBottom = 30;
    chart.data = [
      {
        name: 'Stage #1',
        value: 600,
      },
      {
        name: 'Stage #2',
        value: 300,
      },
      {
        name: 'Stage #3',
        value: 200,
      },
      {
        name: 'Stage #4',
        value: 180,
      },
      {
        name: 'Stage #5',
        value: 50,
      },
      {
        name: 'Stage #6',
        value: 20,
      },
      {
        name: 'Stage #7',
        value: 280,
      },
    ];

    let series = chart.series.push(new am4charts.PyramidSeries());
    series.dataFields.value = 'value';
    series.dataFields.category = 'name';
    series.alignLabels = true;
    series.valueIs = 'height';
  };
  guageChart = () => {
    // create guageChart
    let chart = am4core.create('guageChart', am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.innerRadius = -25;

    let axis: any = chart.xAxes.push(new am4charts.ValueAxis() as any);
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor(
      'background'
    );
    axis.renderer.grid.template.strokeOpacity = 0.3;

    let colorSet = new am4core.ColorSet();

    let range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 50;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);
    range0.axisFill.zIndex = -1;

    let range1 = axis.axisRanges.create();
    range1.value = 50;
    range1.endValue = 80;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(2);
    range1.axisFill.zIndex = -1;

    let range2 = axis.axisRanges.create();
    range2.value = 80;
    range2.endValue = 100;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = colorSet.getIndex(4);
    range2.axisFill.zIndex = -1;

    let hand = chart.hands.push(new am4charts.ClockHand());

    // using chart.setTimeout method as the timeout will be disposed together with a chart
    chart.setTimeout(randomValue, 2000);

    function randomValue() {
      hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
      chart.setTimeout(randomValue, 2000);
    }
  };
  funnelChart = () => {
    let chart = am4core.create('funnelChart', am4charts.SlicedChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.data = [
      {
        name: 'The first',
        value: 600,
      },
      {
        name: 'The second',
        value: 300,
      },
      {
        name: 'The third',
        value: 200,
      },
      {
        name: 'The fourth',
        value: 180,
      },
      {
        name: 'The fifth',
        value: 50,
      },
      {
        name: 'The sixth',
        value: 20,
      },
      {
        name: 'The seventh',
        value: 10,
      },
    ];

    let series = chart.series.push(new am4charts.FunnelSeries());
    series.colors.step = 2;
    series.dataFields.value = 'value';
    series.dataFields.category = 'name';
    series.alignLabels = true;

    series.labelsContainer.paddingLeft = 15;
    series.labelsContainer.width = 200;

    //series.orientation = "horizontal";
    //series.bottomRatio = 1;

    chart.legend = new am4charts.Legend();
    chart.legend.position = 'left';
    chart.legend.valign = 'bottom';
    chart.legend.margin(5, 5, 20, 5);
  };
  pictorialColumnChart = () => {
    // Define icons
    let icon1 =
      'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTc2IiBoZWlnaHQ9Ijg4OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNODcuODIuMDY2djc2LjQzNmwtNC4wNjUgMi45ODR2NjUuNDE4bC0yLjkwNCAzLjQ0My0uNzc0IDYzLjEyMy01LjIyOCA1LjczOHY2MS45NzVsLTIuMzIzIDQuODItLjc3NCAxNzguNTgtOS42OCAyLjI5Ni0uNzc1IDEyOC41NC05LjEgMy4yMTR2MTE5LjU4OWwtNS42MTQgMS4xNDgtLjc3NCA4NC4wMS03LjU1IDEuMTQ4djQ5LjM1aC04LjMyNnYxMS4wMThoLTYuOTd2OC4yNjRILjd2MjAuNjU4aDE3NC40MzdWODcxLjE2aC0xNy40MjR2LTguMjY0aC0xMS4yM3YtOS42NGwtNy4zNTYtLjIzLS45NjgtNzMuNjgxLTcuNTUtLjkxOC45NjctOTguOTMtNy45MzgtMS44MzctLjc3NC0xMjIuMTE0LTYuOTctMS44MzYtMS4zNTUtMTM4LjE4Mi01LjYxNC03LjU3NFYzMDcuMTg3bC02LjAwMi05LjQxMXYuMjMtMzkuOTRsLTQuMjYtMy42NzMtLjc3NC0zNi45NTVoLS45Njh2LTQ2LjU5NmwtMy44NzItNi44ODZ2LTYwLjEzOWwtMy42NzgtMi45ODQtLjM4OC0yMS4xMTdWLjA2NmgtMS4xNjF6IiBmaWxsPSIjMDAwMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=';

    let icon2 =
      'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTAzIiBoZWlnaHQ9IjU3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAzIDU3Ny45VjI4OC41YzAtMS4xLTEuMi0yLjEtMi4yLTIuMWgtOFYxODIuMWMwLTEtMS4xLTIuMS0yLjEtMi4xSDc0LjRWOTguNWMwLTEtMS0yLTIuMS0ySDU5LjJzLjEtMS45LjEtMy0xLjEtMS4xLTEuMS0xLjFWNDIuN2gtMi4xVjhoLTN2ODQuNGgtMlY0Ni44aC0xLjl2NDUuOEgzNC45di00N2gtMS4ydjQ2LjloLTIuOVYuNWgtNC4ydjkyaC01LjF2NGgtOC4xYy0xLjEgMC0yIDEtMiAydjE4OEgyLjJjLTEuMSAwLTIuMSAxLTIuMSAydjI4OS40SDEwM3oiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==';

    let icon3 =
      'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iODMiIGhlaWdodD0iNTU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0zOS44Ljh2NTYuNWwtNS4xIDEuM3Y1aDN2M2gxLjh2MmgtMy44Yy0uOSAwLTIuMSAxLTIuMSAydjE2LjloLTRzLjkgMTUuOS45IDE2LjljMCAxIDEuMSAyIDIuMSAyaDF2MTYuOWgtNy4xYy0xIDAtMiAxLTIgMnY5aC04LjFjLTEuMSAwLTIgMS0yIDJ2MS45aC0ybDQuMSAzOC43aC0zbDMuOSAzNy45aC0zLjlsMy43IDM3LjdoLTMuOWw0LjQgMzcuN2gtNC4zbDMuOSAzNi44aC00bDQuMiAzNi45aC00LjNsNC40IDM4LjdoLTQuM2w0IDM5LjhzLTEuNy0uMS0yLjUgMGMtLjggMC0xLjEgMS4xLTEuMyAxLjgtLjIuNy0xMy4xIDExNS0xMy4xIDExNWw0MS0uMmguN2w0MSAuMlM3MC4yIDQ0NC45IDcwIDQ0NC4yYy0uMi0uNy0uNS0xLjgtMS4zLTEuOC0uOC0uMS0yLjUgMC0yLjUgMGw0LTM5LjhoLTQuM2w0LjQtMzguN0g2Nmw0LjItMzYuOWgtNGwzLjktMzYuOGgtNC4zbDQuNC0zNy43aC0zLjlsMy43LTM3LjdoLTMuOWwzLjktMzcuOWgtM2w0LjEtMzguN2gtMnYtMS45YzAtMS4xLS45LTItMi0ySDU5di05YzAtMS0xLTItMi0yaC03LjF2LTE2LjloMWMxIDAgMi4xLTEgMi4xLTJzLjktMTYuOS45LTE2LjloLTRWNzAuNmMwLTEtMS4xLTItMi4xLTJINDR2LTJoMS44di0zaDN2LTVsLTUuMS0xLjNWLjhoLTMuOXoiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==';

    let icon4 =
      'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjQ5MyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAuNy40djQwLjhoLTJ2NmgydjIuNWwtMSAzLjVoLTFjLTEgMC0yIDEtMiAydjJoLTFjLS45IDAtMiAxLTIgMnY1LjloLTFjLTEuMSAwLTIuMSAxLTIuMSAydjhoLTFjLTEgMC0yIDEtMiAyVjg2aC0xYy0xIDAtMi4xIDEtMi4xIDJ2MTYuOWgtMi4xYy0xIDAtMiAuOS0yIDJ2MjMuOWgtMmMtMSAwLTIgMS0yIDJ2NDAuN2gtMmMtMSAwLTIgMS0yIDJ2NTEuN2MwIC45LTIuMSAxLjItMi4xIDJ2MjY2LjJsMzEuOCAxaDFsMjguOC0uOWg1Ni4ybDI4LjguOWgxbDMxLjgtMVYyMjkuMmMwLS44LTIuMS0xLjEtMi4xLTJ2LTUxLjdjMC0xLTEtMi0yLTJoLTJ2LTQwLjdjMC0uOS0xLjEtMi0yLjEtMmgtMnYtMjMuOWMwLTEtMS4xLTItMi0yaC0yLjFWODhjMC0xLTEtMi0yLjEtMmgtMXYtOC45YzAtMS0xLTItMi0yaC0xdi04YzAtMS0xLTItMi0yaC0xLjF2LTUuOWMwLTEtMS4xLTItMi0yaC0xdi0yYzAtMS0xLTItMi0yaC0xbC0xLTMuNXYtMi41aDJ2LTZoLTJWLjRoLTMuOHY0MC44aC0ydjZoMnYyLjVsLTEgMy41aC0xYy0xIDAtMiAxLTIgMnYyaC0xYy0uOSAwLTIgMS0yIDJ2NS45aC0xYy0xLjEgMC0yLjEgMS0yLjEgMnY4aC0xYy0xIDAtMiAxLTIgMlY4NmgtMWMtMSAwLTIuMSAxLTIuMSAydjE2LjloLTIuMWMtMSAwLTIgLjktMiAydjIzLjloLTJjLTEgMC0yIDEtMiAydjQwLjdoLTJjLTEgMC0yIDEtMiAydjUxLjdjMCAuOS0yLjEgMS4yLTIuMSAydjczLjVINjV2LTczLjVjMC0uOC0yLjEtMS4xLTIuMS0ydi01MS43YzAtMS0xLTItMi0yaC0ydi00MC43YzAtLjktMS4xLTItMi4xLTJoLTJ2LTIzLjljMC0xLTEuMS0yLTItMmgtMi4xVjg4YzAtMS0xLTItMi4xLTJoLTF2LTguOWMwLTEtMS0yLTItMmgtMXYtOGMwLTEtMS0yLTItMmgtMS4xdi01LjljMC0xLTEuMS0yLTItMmgtMXYtMmMwLTEtMS0yLTItMmgtMWwtMS0zLjV2LTIuNWgydi02aC0yVi40aC0zLjh6TTY1IDMxMy42aDIzLjRsLjEuMUw2NSAzNTkuMXYtNDUuNXptMjYuNyAwaDIzLjZ2NDUuOGwtMjMuNi00NS44em0tMS43IDMuM2wyNS4yIDQ5Ljd2MTA2LjNINjVWMzY2LjJsMjUtNDkuM3oiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==';

    let icon5 =
      'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTQ0IiBoZWlnaHQ9IjQ4NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjkuOS4zdjQwSDY5Yy0uOCAwLTIuMSAxLjEtMi4xIDIuMXYyOC43YzAgMS4xLTEuMi45LTEuMiAyLjF2MjUuOWMwIC45LTEgMS4xLTEgMnY5LjRsLTcuMiAxOS40aC00Yy0xIDAtMi4xIDEtMi4xIDJ2NWgtM2MtMSAwLTIuMSAxLTIuMSAydjI3LjhoLTNjLTEgMC0yLjEuOS0yLjEgMnYzMy44YzAgMS40LTMgMi4xLTMgM3YxNjIuMWgtNWMtMSAwLTIuMSAxLTIuMSAydjM1LjhIMjBjLTEgMC0yLjEgMS0yLjEgMnY1My43SDIuN2MtMSAwLTIgMS0yIDJ2MjQuNWw3MS4xLjdoLjZsNzEuMS0uN3YtMjQuNWMwLTEtMS0yLTItMmgtMTUuMnYtNTMuN2MwLTEtMS0yLTIuMS0yaC0xMS4xdi0zNS44YzAtMS0xLTItMi4xLTJoLTVWMjA1LjVjMC0xLTMuMS0xLjYtMy4xLTN2LTMzLjhjMC0xLTEtMi0yLTJoLTN2LTI3LjhjMC0uOS0xLTItMi4xLTJoLTN2LTVjMC0xLTEtMi0yLTJoLTRsLTcuMi0xOS40di05LjRjMC0uOS0xLTEuMS0xLTJWNzMuMmMwLTEuMi0xLjItMS0xLjItMi4xVjQyLjRjMC0xLTEuMi0yLjEtMi4xLTIuMWgtLjlWLjNoLTQuNXoiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==';

    // Create chart instance
    let chart = am4core.create('pictorialColumnChart', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;
    chart.defaultState.transitionDuration = 5000;

    // Add data
    chart.data = [
      {
        category: 'Burj Khalifa',
        height: 828,
        ratio: 1 / 5.12,
        icon: icon1,
      },
      {
        category: 'Willis Tower',
        height: 527,
        ratio: 1 / 5.06,
        icon: icon2,
      },
      {
        category: 'Taipei 101',
        height: 508,
        ratio: 1 / 6.73,
        icon: icon3,
      },
      {
        category: 'Petronas Towers',
        height: 452,
        ratio: 1 / 2.76,
        icon: icon4,
      },
      {
        category: 'Empire State Building',
        height: 449,
        ratio: 1 / 3.41,
        icon: icon5,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.fill = am4core.color('#ffffff');
    categoryAxis.renderer.labels.template.fillOpacity = 0.5;
    categoryAxis.renderer.inside = true;

    chart.paddingBottom = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 1000;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.grid.template.strokeDasharray = '4,4';
    valueAxis.renderer.minLabelPosition = 0.05;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'height';
    series.dataFields.categoryX = 'category';
    series.columns.template.disabled = true;

    let bullet = series.bullets.push(new am4charts.Bullet());
    bullet.defaultState.properties.opacity = 0.5;

    let hoverState = bullet.states.create('hover');
    hoverState.properties.opacity = 0.9;

    let image = bullet.createChild(am4core.Image);
    image.horizontalCenter = 'middle';
    image.verticalCenter = 'top';

    image.propertyFields.href = 'icon';
    image.height = am4core.percent(100);
    image.propertyFields.widthRatio = 'ratio';

    bullet.events.on('positionchanged', function (event) {
      event.target.deepInvalidate();
    });

    let label = series.bullets.push(new am4charts.LabelBullet());
    label.label.text = '{height} metres';
    label.dy = -15;

    let gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color('#f0b24f'));
    gradient.addColor(am4core.color('#ca6c46'));
    gradient.addColor(am4core.color('#0c0524'));
    gradient.rotation = 90;
    chart.background.fill = gradient;
  };
  worldMapBubbles = () => {
    // Create map instance
    let chart = am4core.create('worldMapBubbles', am4maps.MapChart);

    let title = chart.titles.create();
    title.text =
      '[bold font-size: 20]Population of the World in 2011[/]\nsource: Gapminder';
    title.textAlign = 'middle';

    let mapData = [
      {
        id: 'AF',
        name: 'Afghanistan',
        value: 32358260,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'AL',
        name: 'Albania',
        value: 3215988,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'DZ',
        name: 'Algeria',
        value: 35980193,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'AO',
        name: 'Angola',
        value: 19618432,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'AR',
        name: 'Argentina',
        value: 40764561,
        color: chart.colors.getIndex(3),
      },
      {
        id: 'AM',
        name: 'Armenia',
        value: 3100236,
        color: chart.colors.getIndex(1),
      },
      { id: 'AU', name: 'Australia', value: 22605732, color: '#8aabb0' },
      {
        id: 'AT',
        name: 'Austria',
        value: 8413429,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'AZ',
        name: 'Azerbaijan',
        value: 9306023,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'BH',
        name: 'Bahrain',
        value: 1323535,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'BD',
        name: 'Bangladesh',
        value: 150493658,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'BY',
        name: 'Belarus',
        value: 9559441,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'BE',
        name: 'Belgium',
        value: 10754056,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'BJ',
        name: 'Benin',
        value: 9099922,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'BT',
        name: 'Bhutan',
        value: 738267,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'BO',
        name: 'Bolivia',
        value: 10088108,
        color: chart.colors.getIndex(3),
      },
      {
        id: 'BA',
        name: 'Bosnia and Herzegovina',
        value: 3752228,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'BW',
        name: 'Botswana',
        value: 2030738,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'BR',
        name: 'Brazil',
        value: 196655014,
        color: chart.colors.getIndex(3),
      },
      {
        id: 'BN',
        name: 'Brunei',
        value: 405938,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'BG',
        name: 'Bulgaria',
        value: 7446135,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'BF',
        name: 'Burkina Faso',
        value: 16967845,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'BI',
        name: 'Burundi',
        value: 8575172,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'KH',
        name: 'Cambodia',
        value: 14305183,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'CM',
        name: 'Cameroon',
        value: 20030362,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'CA',
        name: 'Canada',
        value: 34349561,
        color: chart.colors.getIndex(4),
      },
      {
        id: 'CV',
        name: 'Cape Verde',
        value: 500585,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'CF',
        name: 'Central African Rep.',
        value: 4486837,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'TD',
        name: 'Chad',
        value: 11525496,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'CL',
        name: 'Chile',
        value: 17269525,
        color: chart.colors.getIndex(3),
      },
      {
        id: 'CN',
        name: 'China',
        value: 1347565324,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'CO',
        name: 'Colombia',
        value: 46927125,
        color: chart.colors.getIndex(3),
      },
      {
        id: 'KM',
        name: 'Comoros',
        value: 753943,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'CD',
        name: 'Congo, Dem. Rep.',
        value: 67757577,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'CG',
        name: 'Congo, Rep.',
        value: 4139748,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'CR',
        name: 'Costa Rica',
        value: 4726575,
        color: chart.colors.getIndex(4),
      },
      {
        id: 'CI',
        name: "Cote d'Ivoire",
        value: 20152894,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'HR',
        name: 'Croatia',
        value: 4395560,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'CU',
        name: 'Cuba',
        value: 11253665,
        color: chart.colors.getIndex(4),
      },
      {
        id: 'CY',
        name: 'Cyprus',
        value: 1116564,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'CZ',
        name: 'Czech Rep.',
        value: 10534293,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'DK',
        name: 'Denmark',
        value: 5572594,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'DJ',
        name: 'Djibouti',
        value: 905564,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'DO',
        name: 'Dominican Rep.',
        value: 10056181,
        color: chart.colors.getIndex(4),
      },
      {
        id: 'EC',
        name: 'Ecuador',
        value: 14666055,
        color: chart.colors.getIndex(3),
      },
      {
        id: 'EG',
        name: 'Egypt',
        value: 82536770,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'SV',
        name: 'El Salvador',
        value: 6227491,
        color: chart.colors.getIndex(4),
      },
      {
        id: 'GQ',
        name: 'Equatorial Guinea',
        value: 720213,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'ER',
        name: 'Eritrea',
        value: 5415280,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'EE',
        name: 'Estonia',
        value: 1340537,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'ET',
        name: 'Ethiopia',
        value: 84734262,
        color: chart.colors.getIndex(2),
      },
      { id: 'FJ', name: 'Fiji', value: 868406, color: '#8aabb0' },
      {
        id: 'FI',
        name: 'Finland',
        value: 5384770,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'FR',
        name: 'France',
        value: 63125894,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'GA',
        name: 'Gabon',
        value: 1534262,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'GM',
        name: 'Gambia',
        value: 1776103,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'GE',
        name: 'Georgia',
        value: 4329026,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'DE',
        name: 'Germany',
        value: 82162512,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'GH',
        name: 'Ghana',
        value: 24965816,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'GR',
        name: 'Greece',
        value: 11390031,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'GT',
        name: 'Guatemala',
        value: 14757316,
        color: chart.colors.getIndex(4),
      },
      {
        id: 'GN',
        name: 'Guinea',
        value: 10221808,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'GW',
        name: 'Guinea-Bissau',
        value: 1547061,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'GY',
        name: 'Guyana',
        value: 756040,
        color: chart.colors.getIndex(3),
      },
      {
        id: 'HT',
        name: 'Haiti',
        value: 10123787,
        color: chart.colors.getIndex(4),
      },
      {
        id: 'HN',
        name: 'Honduras',
        value: 7754687,
        color: chart.colors.getIndex(4),
      },
      {
        id: 'HK',
        name: 'Hong Kong, China',
        value: 7122187,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'HU',
        name: 'Hungary',
        value: 9966116,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'IS',
        name: 'Iceland',
        value: 324366,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'IN',
        name: 'India',
        value: 1241491960,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'ID',
        name: 'Indonesia',
        value: 242325638,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'IR',
        name: 'Iran',
        value: 74798599,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'IQ',
        name: 'Iraq',
        value: 32664942,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'IE',
        name: 'Ireland',
        value: 4525802,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'IL',
        name: 'Israel',
        value: 7562194,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'IT',
        name: 'Italy',
        value: 60788694,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'JM',
        name: 'Jamaica',
        value: 2751273,
        color: chart.colors.getIndex(4),
      },
      {
        id: 'JP',
        name: 'Japan',
        value: 126497241,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'JO',
        name: 'Jordan',
        value: 6330169,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'KZ',
        name: 'Kazakhstan',
        value: 16206750,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'KE',
        name: 'Kenya',
        value: 41609728,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'KP',
        name: 'Korea, Dem. Rep.',
        value: 24451285,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'KR',
        name: 'Korea, Rep.',
        value: 48391343,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'KW',
        name: 'Kuwait',
        value: 2818042,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'KG',
        name: 'Kyrgyzstan',
        value: 5392580,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'LA',
        name: 'Laos',
        value: 6288037,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'LV',
        name: 'Latvia',
        value: 2243142,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'LB',
        name: 'Lebanon',
        value: 4259405,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'LS',
        name: 'Lesotho',
        value: 2193843,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'LR',
        name: 'Liberia',
        value: 4128572,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'LY',
        name: 'Libya',
        value: 6422772,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'LT',
        name: 'Lithuania',
        value: 3307481,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'LU',
        name: 'Luxembourg',
        value: 515941,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'MK',
        name: 'Macedonia, FYR',
        value: 2063893,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'MG',
        name: 'Madagascar',
        value: 21315135,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'MW',
        name: 'Malawi',
        value: 15380888,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'MY',
        name: 'Malaysia',
        value: 28859154,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'ML',
        name: 'Mali',
        value: 15839538,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'MR',
        name: 'Mauritania',
        value: 3541540,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'MU',
        name: 'Mauritius',
        value: 1306593,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'MX',
        name: 'Mexico',
        value: 114793341,
        color: chart.colors.getIndex(4),
      },
      {
        id: 'MD',
        name: 'Moldova',
        value: 3544864,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'MN',
        name: 'Mongolia',
        value: 2800114,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'ME',
        name: 'Montenegro',
        value: 632261,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'MA',
        name: 'Morocco',
        value: 32272974,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'MZ',
        name: 'Mozambique',
        value: 23929708,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'MM',
        name: 'Myanmar',
        value: 48336763,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'NA',
        name: 'Namibia',
        value: 2324004,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'NP',
        name: 'Nepal',
        value: 30485798,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'NL',
        name: 'Netherlands',
        value: 16664746,
        color: chart.colors.getIndex(1),
      },
      { id: 'NZ', name: 'New Zealand', value: 4414509, color: '#8aabb0' },
      {
        id: 'NI',
        name: 'Nicaragua',
        value: 5869859,
        color: chart.colors.getIndex(4),
      },
      {
        id: 'NE',
        name: 'Niger',
        value: 16068994,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'NG',
        name: 'Nigeria',
        value: 162470737,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'NO',
        name: 'Norway',
        value: 4924848,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'OM',
        name: 'Oman',
        value: 2846145,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'PK',
        name: 'Pakistan',
        value: 176745364,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'PA',
        name: 'Panama',
        value: 3571185,
        color: chart.colors.getIndex(4),
      },
      { id: 'PG', name: 'Papua New Guinea', value: 7013829, color: '#8aabb0' },
      {
        id: 'PY',
        name: 'Paraguay',
        value: 6568290,
        color: chart.colors.getIndex(3),
      },
      {
        id: 'PE',
        name: 'Peru',
        value: 29399817,
        color: chart.colors.getIndex(3),
      },
      {
        id: 'PH',
        name: 'Philippines',
        value: 94852030,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'PL',
        name: 'Poland',
        value: 38298949,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'PT',
        name: 'Portugal',
        value: 10689663,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'PR',
        name: 'Puerto Rico',
        value: 3745526,
        color: chart.colors.getIndex(4),
      },
      {
        id: 'QA',
        name: 'Qatar',
        value: 1870041,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'RO',
        name: 'Romania',
        value: 21436495,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'RU',
        name: 'Russia',
        value: 142835555,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'RW',
        name: 'Rwanda',
        value: 10942950,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'SA',
        name: 'Saudi Arabia',
        value: 28082541,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'SN',
        name: 'Senegal',
        value: 12767556,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'RS',
        name: 'Serbia',
        value: 9853969,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'SL',
        name: 'Sierra Leone',
        value: 5997486,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'SG',
        name: 'Singapore',
        value: 5187933,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'SK',
        name: 'Slovak Republic',
        value: 5471502,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'SI',
        name: 'Slovenia',
        value: 2035012,
        color: chart.colors.getIndex(1),
      },
      { id: 'SB', name: 'Solomon Islands', value: 552267, color: '#8aabb0' },
      {
        id: 'SO',
        name: 'Somalia',
        value: 9556873,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'ZA',
        name: 'South Africa',
        value: 50459978,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'ES',
        name: 'Spain',
        value: 46454895,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'LK',
        name: 'Sri Lanka',
        value: 21045394,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'SD',
        name: 'Sudan',
        value: 34735288,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'SR',
        name: 'Suriname',
        value: 529419,
        color: chart.colors.getIndex(3),
      },
      {
        id: 'SZ',
        name: 'Swaziland',
        value: 1203330,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'SE',
        name: 'Sweden',
        value: 9440747,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'CH',
        name: 'Switzerland',
        value: 7701690,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'SY',
        name: 'Syria',
        value: 20766037,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'TW',
        name: 'Taiwan',
        value: 23072000,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'TJ',
        name: 'Tajikistan',
        value: 6976958,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'TZ',
        name: 'Tanzania',
        value: 46218486,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'TH',
        name: 'Thailand',
        value: 69518555,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'TG',
        name: 'Togo',
        value: 6154813,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'TT',
        name: 'Trinidad and Tobago',
        value: 1346350,
        color: chart.colors.getIndex(4),
      },
      {
        id: 'TN',
        name: 'Tunisia',
        value: 10594057,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'TR',
        name: 'Turkey',
        value: 73639596,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'TM',
        name: 'Turkmenistan',
        value: 5105301,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'UG',
        name: 'Uganda',
        value: 34509205,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'UA',
        name: 'Ukraine',
        value: 45190180,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'AE',
        name: 'United Arab Emirates',
        value: 7890924,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'GB',
        name: 'United Kingdom',
        value: 62417431,
        color: chart.colors.getIndex(1),
      },
      {
        id: 'US',
        name: 'United States',
        value: 313085380,
        color: chart.colors.getIndex(4),
      },
      {
        id: 'UY',
        name: 'Uruguay',
        value: 3380008,
        color: chart.colors.getIndex(3),
      },
      {
        id: 'UZ',
        name: 'Uzbekistan',
        value: 27760267,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'VE',
        name: 'Venezuela',
        value: 29436891,
        color: chart.colors.getIndex(3),
      },
      {
        id: 'PS',
        name: 'West Bank and Gaza',
        value: 4152369,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'VN',
        name: 'Vietnam',
        value: 88791996,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'YE',
        name: 'Yemen, Rep.',
        value: 24799880,
        color: chart.colors.getIndex(0),
      },
      {
        id: 'ZM',
        name: 'Zambia',
        value: 13474959,
        color: chart.colors.getIndex(2),
      },
      {
        id: 'ZW',
        name: 'Zimbabwe',
        value: 12754378,
        color: chart.colors.getIndex(2),
      },
    ];

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ['AQ'];
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeWidth = 0.5;
    polygonSeries.calculateVisualCenter = true;

    let imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.data = mapData;
    imageSeries.dataFields.value = 'value';

    let imageTemplate = imageSeries.mapImages.template;
    imageTemplate.nonScaling = true;

    let circle = imageTemplate.createChild(am4core.Circle);
    circle.fillOpacity = 0.7;
    circle.propertyFields.fill = 'color';
    circle.tooltipText = '{name}: [bold]{value}[/]';

    imageSeries.heatRules.push({
      target: circle,
      property: 'radius',
      min: 4,
      max: 30,
      dataField: 'value',
    });

    imageTemplate.adapter.add('latitude', function (latitude, target) {
      let x: any = target.dataItem.dataContext;
      let polygon: any = polygonSeries.getPolygonById(x.id);
      if (polygon) {
        return polygon.visualLatitude;
      }
      return latitude;
    });

    imageTemplate.adapter.add('longitude', function (longitude, target) {
      let y: any = target.dataItem.dataContext;
      let polygon = polygonSeries.getPolygonById(y.id);
      if (polygon) {
        return polygon.visualLongitude;
      }
      return longitude;
    });
  };
  barBulletChart = () => {
    let chart = am4core.create('barBulletChart', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 40;

    chart.data = [
      {
        name: 'Monica',
        steps: 45688,
        href: 'https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg',
      },
      {
        name: 'Joey',
        steps: 35781,
        href: 'https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg',
      },
      {
        name: 'Ross',
        steps: 25464,
        href: 'https://www.amcharts.com/wp-content/uploads/2019/04/ross.jpg',
      },
      {
        name: 'Phoebe',
        steps: 18788,
        href: 'https://www.amcharts.com/wp-content/uploads/2019/04/phoebe.jpg',
      },
      {
        name: 'Rachel',
        steps: 15465,
        href: 'https://www.amcharts.com/wp-content/uploads/2019/04/rachel.jpg',
      },
      {
        name: 'Chandler',
        steps: 11561,
        href:
          'https://www.amcharts.com/wp-content/uploads/2019/04/chandler.jpg',
      },
    ];

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.dx = -40;
    categoryAxis.renderer.minWidth = 120;
    categoryAxis.renderer.tooltip.dx = -40;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.fillOpacity = 0.3;
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.baseGrid.strokeOpacity = 0;
    valueAxis.renderer.labels.template.dy = 20;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = 'steps';
    series.dataFields.categoryY = 'name';
    series.tooltipText = '{valueX.value}';
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.dy = -30;
    series.columnsContainer.zIndex = 100;

    let columnTemplate = series.columns.template;
    columnTemplate.height = am4core.percent(50);
    columnTemplate.maxHeight = 50;
    columnTemplate.column.cornerRadius(60, 10, 60, 10);
    columnTemplate.strokeOpacity = 0;

    series.heatRules.push({
      target: columnTemplate,
      property: 'fill',
      dataField: 'valueX',
      min: am4core.color('#e5dc36'),
      max: am4core.color('#5faa46'),
    });
    series.mainContainer.mask = undefined;

    let cursor = new am4charts.XYCursor();
    chart.cursor = cursor;
    cursor.lineX.disabled = true;
    cursor.lineY.disabled = true;
    cursor.behavior = 'none';

    let bullet = columnTemplate.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 30;
    bullet.valign = 'middle';
    bullet.align = 'left';
    bullet.isMeasured = true;
    bullet.interactionsEnabled = false;
    bullet.horizontalCenter = 'right';
    bullet.interactionsEnabled = false;

    let hoverState = bullet.states.create('hover');
    let outlineCircle = bullet.createChild(am4core.Circle);
    outlineCircle.adapter.add('radius', function (radius, target) {
      let circleBullet: any = target.parent;
      return circleBullet.circle.pixelRadius + 10;
    });

    let image = bullet.createChild(am4core.Image);
    image.width = 60;
    image.height = 60;
    image.horizontalCenter = 'middle';
    image.verticalCenter = 'middle';
    image.propertyFields.href = 'href';

    image.adapter.add('mask', function (mask, target) {
      let circleBullet: any = target.parent;
      return circleBullet.circle;
    });

    let previousBullet;
    chart.cursor.events.on('cursorpositionchanged', function (event) {
      let dataItem = series.tooltipDataItem as any;

      if (dataItem.column) {
        let bullet = dataItem.column.children.getIndex(1);

        if (previousBullet && previousBullet != bullet) {
          previousBullet.isHover = false;
        }

        if (previousBullet != bullet) {
          let hs = bullet.states.getKey('hover');
          hs.properties.dx = dataItem.column.pixelWidth;
          bullet.isHover = true;

          previousBullet = bullet;
        }
      }
    });
  };
  cyclinder3DChart = () => {
    let chart = am4core.create('cyclinder3DChart', am4charts.XYChart3D);
    chart.paddingBottom = 30;
    chart.angle = 35;

    // Add data
    chart.data = [
      {
        country: 'USA',
        visits: 4025,
      },
      {
        country: 'China',
        visits: 1882,
      },
      {
        country: 'Japan',
        visits: 1809,
      },
      {
        country: 'Germany',
        visits: 1322,
      },
      {
        country: 'UK',
        visits: 1122,
      },
      {
        country: 'France',
        visits: 1114,
      },
      {
        country: 'India',
        visits: 984,
      },
      {
        country: 'Spain',
        visits: 711,
      },
      {
        country: 'Netherlands',
        visits: 665,
      },
      {
        country: 'Russia',
        visits: 580,
      },
      {
        country: 'South Korea',
        visits: 443,
      },
      {
        country: 'Canada',
        visits: 441,
      },
      {
        country: 'Brazil',
        visits: 395,
      },
      {
        country: 'Italy',
        visits: 386,
      },
      {
        country: 'Taiwan',
        visits: 338,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'country';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.inside = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let labelTemplate = categoryAxis.renderer.labels.template;
    labelTemplate.rotation = -90;
    labelTemplate.horizontalCenter = 'left';
    labelTemplate.verticalCenter = 'middle';
    labelTemplate.dy = 10; // moves it a bit down;
    labelTemplate.inside = false; // this is done to avoid settings which are not suitable when label is rotated

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = true;

    // Create series
    let series = chart.series.push(new am4charts.ConeSeries());
    series.dataFields.valueY = 'visits';
    series.dataFields.categoryX = 'country';
    // series.name = 'Visits';
    // series.tooltipText = '{categoryX}: [bold]{valueY}[/]';

    let columnTemplate = series.columns.template;
    columnTemplate.adapter.add('fill', function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    columnTemplate.adapter.add('stroke', function (stroke, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });
  };
  column3DChart = () => {
    // Create chart instance
    let chart = am4core.create('column3DChart', am4charts.XYChart3D);

    // Add data
    chart.data = [
      {
        country: 'USA',
        visits: 4025,
      },
      {
        country: 'China',
        visits: 1882,
      },
      {
        country: 'Japan',
        visits: 1809,
      },
      {
        country: 'Germany',
        visits: 1322,
      },
      {
        country: 'UK',
        visits: 1122,
      },
      {
        country: 'France',
        visits: 1114,
      },
      {
        country: 'India',
        visits: 984,
      },
      {
        country: 'Spain',
        visits: 711,
      },
      {
        country: 'Netherlands',
        visits: 665,
      },
      {
        country: 'Russia',
        visits: 580,
      },
      {
        country: 'South Korea',
        visits: 443,
      },
      {
        country: 'Canada',
        visits: 441,
      },
      {
        country: 'Brazil',
        visits: 395,
      },
      {
        country: 'Italy',
        visits: 386,
      },
      {
        country: 'Australia',
        visits: 384,
      },
      {
        country: 'Taiwan',
        visits: 338,
      },
      {
        country: 'Poland',
        visits: 328,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'country';
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.renderer.labels.template.hideOversized = false;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.verticalCenter = 'middle';
    categoryAxis.tooltip.label.rotation = 270;
    categoryAxis.tooltip.label.horizontalCenter = 'right';
    categoryAxis.tooltip.label.verticalCenter = 'middle';

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Countries';
    valueAxis.title.fontWeight = 'bold';

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = 'visits';
    series.dataFields.categoryX = 'country';
    series.name = 'Visits';
    series.tooltipText = '{categoryX}: [bold]{valueY}[/]';
    series.columns.template.fillOpacity = 0.8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    columnTemplate.stroke = am4core.color('#FFFFFF');

    columnTemplate.adapter.add('fill', function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    columnTemplate.adapter.add('stroke', function (stroke, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineY.strokeOpacity = 0;
  };
  stackedColumn3DCharts = () => {
    // Create chart instance
    let chart = am4core.create('stackedColumn3DCharts', am4charts.XYChart3D);

    // Add data
    chart.data = [
      {
        country: 'USA',
        year2017: 3.5,
        year2018: 4.2,
      },
      {
        country: 'UK',
        year2017: 1.7,
        year2018: 3.1,
      },
      {
        country: 'Canada',
        year2017: 2.8,
        year2018: 2.9,
      },
      {
        country: 'Japan',
        year2017: 2.6,
        year2018: 2.3,
      },
      {
        country: 'France',
        year2017: 1.4,
        year2018: 2.1,
      },
      {
        country: 'Brazil',
        year2017: 2.6,
        year2018: 4.9,
      },
      {
        country: 'Russia',
        year2017: 6.4,
        year2018: 7.2,
      },
      {
        country: 'India',
        year2017: 8,
        year2018: 7.1,
      },
      {
        country: 'China',
        year2017: 9.9,
        year2018: 10.1,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'country';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'GDP growth rate';
    valueAxis.renderer.labels.template.adapter.add('text', function (text) {
      return text + '%';
    });

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = 'year2017';
    series.dataFields.categoryX = 'country';
    series.name = 'Year 2017';
    series.clustered = false;
    series.columns.template.tooltipText =
      'GDP grow in {category} (2017): [bold]{valueY}[/]';
    series.columns.template.fillOpacity = 0.9;

    let series2 = chart.series.push(new am4charts.ColumnSeries3D());
    series2.dataFields.valueY = 'year2018';
    series2.dataFields.categoryX = 'country';
    series2.name = 'Year 2018';
    series2.clustered = false;
    series2.columns.template.tooltipText =
      'GDP grow in {category} (2017): [bold]{valueY}[/]';
  };
  barChartRace = () => {
    let chart = am4core.create('barChartRace', am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    chart.numberFormatter.bigNumberPrefixes = [
      { number: 1e3, suffix: 'K' },
      { number: 1e6, suffix: 'M' },
      { number: 1e9, suffix: 'B' },
    ];

    let label = chart.plotContainer.createChild(am4core.Label);
    label.x = am4core.percent(97);
    label.y = am4core.percent(95);
    label.horizontalCenter = 'right';
    label.verticalCenter = 'middle';
    label.dx = -15;
    label.fontSize = 50;

    let playButton = chart.plotContainer.createChild(am4core.PlayButton);
    playButton.x = am4core.percent(97);
    playButton.y = am4core.percent(95);
    playButton.dy = -2;
    playButton.verticalCenter = 'middle';
    playButton.events.on('toggled', function (event) {
      if (event.target.isActive) {
        play();
      } else {
        stop();
      }
    });

    let stepDuration = 4000;

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'network';
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.rangeChangeEasing = am4core.ease.linear;
    valueAxis.rangeChangeDuration = stepDuration;
    valueAxis.extraMax = 0.1;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = 'network';
    series.dataFields.valueX = 'MAU';
    series.tooltipText = '{valueX.value}';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.interpolationDuration = stepDuration;
    series.interpolationEasing = am4core.ease.linear;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.horizontalCenter = 'right';
    labelBullet.label.text =
      "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.label.textAlign = 'end';
    labelBullet.label.dx = -10;

    chart.zoomOutButton.disabled = true;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add('fill', function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    let year = 2003;
    label.text = year.toString();

    let interval;

    function play() {
      interval = setInterval(function () {
        nextYear();
      }, stepDuration);
      nextYear();
    }

    function stop() {
      if (interval) {
        clearInterval(interval);
      }
    }

    function nextYear() {
      year++;

      if (year > 2018) {
        year = 2003;
      }

      let newData = allData[year];
      let itemsWithNonZero = 0;
      for (var i = 0; i < chart.data.length; i++) {
        chart.data[i].MAU = newData[i].MAU;
        if (chart.data[i].MAU > 0) {
          itemsWithNonZero++;
        }
      }

      if (year == 2003) {
        series.interpolationDuration = stepDuration / 4;
        valueAxis.rangeChangeDuration = stepDuration / 4;
      } else {
        series.interpolationDuration = stepDuration;
        valueAxis.rangeChangeDuration = stepDuration;
      }

      chart.invalidateRawData();
      label.text = year.toString();

      categoryAxis.zoom({
        start: 0,
        end: itemsWithNonZero / categoryAxis.dataItems.length,
      });
    }

    categoryAxis.sortBySeries = series;

    let allData = {
      '2003': [
        {
          network: 'Facebook',
          MAU: 0,
        },
        {
          network: 'Flickr',
          MAU: 0,
        },
        {
          network: 'Google Buzz',
          MAU: 0,
        },

        {
          network: 'Friendster',
          MAU: 4470000,
        },
        {
          network: 'Google+',
          MAU: 0,
        },
        {
          network: 'Hi5',
          MAU: 0,
        },
        {
          network: 'Instagram',
          MAU: 0,
        },
        {
          network: 'MySpace',
          MAU: 0,
        },
        {
          network: 'Orkut',
          MAU: 0,
        },
        {
          network: 'Pinterest',
          MAU: 0,
        },
        {
          network: 'Reddit',
          MAU: 0,
        },
        {
          network: 'Snapchat',
          MAU: 0,
        },
        {
          network: 'TikTok',
          MAU: 0,
        },
        {
          network: 'Tumblr',
          MAU: 0,
        },
        {
          network: 'Twitter',
          MAU: 0,
        },
        {
          network: 'WeChat',
          MAU: 0,
        },
        {
          network: 'Weibo',
          MAU: 0,
        },
        {
          network: 'Whatsapp',
          MAU: 0,
        },
        {
          network: 'YouTube',
          MAU: 0,
        },
      ],
      '2004': [
        {
          network: 'Facebook',
          MAU: 0,
        },
        {
          network: 'Flickr',
          MAU: 3675135,
        },
        {
          network: 'Friendster',
          MAU: 5970054,
        },
        {
          network: 'Google Buzz',
          MAU: 0,
        },
        {
          network: 'Google+',
          MAU: 0,
        },
        {
          network: 'Hi5',
          MAU: 0,
        },
        {
          network: 'Instagram',
          MAU: 0,
        },
        {
          network: 'MySpace',
          MAU: 980036,
        },
        {
          network: 'Orkut',
          MAU: 4900180,
        },
        {
          network: 'Pinterest',
          MAU: 0,
        },
        {
          network: 'Reddit',
          MAU: 0,
        },
        {
          network: 'Snapchat',
          MAU: 0,
        },
        {
          network: 'TikTok',
          MAU: 0,
        },
        {
          network: 'Tumblr',
          MAU: 0,
        },
        {
          network: 'Twitter',
          MAU: 0,
        },
        {
          network: 'WeChat',
          MAU: 0,
        },
        {
          network: 'Weibo',
          MAU: 0,
        },
        {
          network: 'Whatsapp',
          MAU: 0,
        },
        {
          network: 'YouTube',
          MAU: 0,
        },
      ],
      '2005': [
        {
          network: 'Facebook',
          MAU: 0,
        },
        {
          network: 'Flickr',
          MAU: 7399354,
        },
        {
          network: 'Friendster',
          MAU: 7459742,
        },
        {
          network: 'Google Buzz',
          MAU: 0,
        },
        {
          network: 'Google+',
          MAU: 0,
        },
        {
          network: 'Hi5',
          MAU: 9731610,
        },
        {
          network: 'Instagram',
          MAU: 0,
        },
        {
          network: 'MySpace',
          MAU: 19490059,
        },
        {
          network: 'Orkut',
          MAU: 9865805,
        },
        {
          network: 'Pinterest',
          MAU: 0,
        },
        {
          network: 'Reddit',
          MAU: 0,
        },
        {
          network: 'Snapchat',
          MAU: 0,
        },
        {
          network: 'TikTok',
          MAU: 0,
        },
        {
          network: 'Tumblr',
          MAU: 0,
        },
        {
          network: 'Twitter',
          MAU: 0,
        },
        {
          network: 'WeChat',
          MAU: 0,
        },
        {
          network: 'Weibo',
          MAU: 0,
        },
        {
          network: 'Whatsapp',
          MAU: 0,
        },
        {
          network: 'YouTube',
          MAU: 1946322,
        },
      ],
      '2006': [
        {
          network: 'Facebook',
          MAU: 0,
        },
        {
          network: 'Flickr',
          MAU: 14949270,
        },
        {
          network: 'Friendster',
          MAU: 8989854,
        },
        {
          network: 'Google Buzz',
          MAU: 0,
        },
        {
          network: 'Google+',
          MAU: 0,
        },
        {
          network: 'Hi5',
          MAU: 19932360,
        },
        {
          network: 'Instagram',
          MAU: 0,
        },
        {
          network: 'MySpace',
          MAU: 54763260,
        },
        {
          network: 'Orkut',
          MAU: 14966180,
        },
        {
          network: 'Pinterest',
          MAU: 0,
        },
        {
          network: 'Reddit',
          MAU: 248309,
        },
        {
          network: 'Snapchat',
          MAU: 0,
        },
        {
          network: 'TikTok',
          MAU: 0,
        },
        {
          network: 'Tumblr',
          MAU: 0,
        },
        {
          network: 'Twitter',
          MAU: 0,
        },
        {
          network: 'WeChat',
          MAU: 0,
        },
        {
          network: 'Weibo',
          MAU: 0,
        },
        {
          network: 'Whatsapp',
          MAU: 0,
        },
        {
          network: 'YouTube',
          MAU: 19878248,
        },
      ],
      '2007': [
        {
          network: 'Facebook',
          MAU: 0,
        },
        {
          network: 'Flickr',
          MAU: 29299875,
        },
        {
          network: 'Friendster',
          MAU: 24253200,
        },
        {
          network: 'Google Buzz',
          MAU: 0,
        },
        {
          network: 'Google+',
          MAU: 0,
        },
        {
          network: 'Hi5',
          MAU: 29533250,
        },
        {
          network: 'Instagram',
          MAU: 0,
        },
        {
          network: 'MySpace',
          MAU: 69299875,
        },
        {
          network: 'Orkut',
          MAU: 26916562,
        },
        {
          network: 'Pinterest',
          MAU: 0,
        },
        {
          network: 'Reddit',
          MAU: 488331,
        },
        {
          network: 'Snapchat',
          MAU: 0,
        },
        {
          network: 'TikTok',
          MAU: 0,
        },
        {
          network: 'Tumblr',
          MAU: 0,
        },
        {
          network: 'Twitter',
          MAU: 0,
        },
        {
          network: 'WeChat',
          MAU: 0,
        },
        {
          network: 'Weibo',
          MAU: 0,
        },
        {
          network: 'Whatsapp',
          MAU: 0,
        },
        {
          network: 'YouTube',
          MAU: 143932250,
        },
      ],
      '2008': [
        {
          network: 'Facebook',
          MAU: 100000000,
        },
        {
          network: 'Flickr',
          MAU: 30000000,
        },
        {
          network: 'Friendster',
          MAU: 51008911,
        },
        {
          network: 'Google Buzz',
          MAU: 0,
        },
        {
          network: 'Google+',
          MAU: 0,
        },
        {
          network: 'Hi5',
          MAU: 55045618,
        },
        {
          network: 'Instagram',
          MAU: 0,
        },
        {
          network: 'MySpace',
          MAU: 72408233,
        },
        {
          network: 'Orkut',
          MAU: 44357628,
        },
        {
          network: 'Pinterest',
          MAU: 0,
        },
        {
          network: 'Reddit',
          MAU: 1944940,
        },
        {
          network: 'Snapchat',
          MAU: 0,
        },
        {
          network: 'TikTok',
          MAU: 0,
        },
        {
          network: 'Tumblr',
          MAU: 0,
        },
        {
          network: 'Twitter',
          MAU: 0,
        },
        {
          network: 'WeChat',
          MAU: 0,
        },
        {
          network: 'Weibo',
          MAU: 0,
        },
        {
          network: 'Whatsapp',
          MAU: 0,
        },
        {
          network: 'YouTube',
          MAU: 294493950,
        },
      ],
      '2009': [
        {
          network: 'Facebook',
          MAU: 276000000,
        },
        {
          network: 'Flickr',
          MAU: 41834525,
        },
        {
          network: 'Friendster',
          MAU: 28804331,
        },
        {
          network: 'Google Buzz',
          MAU: 0,
        },
        {
          network: 'Google+',
          MAU: 0,
        },
        {
          network: 'Hi5',
          MAU: 57893524,
        },
        {
          network: 'Instagram',
          MAU: 0,
        },
        {
          network: 'MySpace',
          MAU: 70133095,
        },
        {
          network: 'Orkut',
          MAU: 47366905,
        },
        {
          network: 'Pinterest',
          MAU: 0,
        },
        {
          network: 'Reddit',
          MAU: 3893524,
        },
        {
          network: 'Snapchat',
          MAU: 0,
        },
        {
          network: 'TikTok',
          MAU: 0,
        },
        {
          network: 'Tumblr',
          MAU: 0,
        },
        {
          network: 'Twitter',
          MAU: 0,
        },
        {
          network: 'WeChat',
          MAU: 0,
        },
        {
          network: 'Weibo',
          MAU: 0,
        },
        {
          network: 'Whatsapp',
          MAU: 0,
        },
        {
          network: 'YouTube',
          MAU: 413611440,
        },
      ],
      '2010': [
        {
          network: 'Facebook',
          MAU: 517750000,
        },
        {
          network: 'Flickr',
          MAU: 54708063,
        },
        {
          network: 'Friendster',
          MAU: 0,
        },
        {
          network: 'Google Buzz',
          MAU: 166029650,
        },
        {
          network: 'Google+',
          MAU: 0,
        },
        {
          network: 'Hi5',
          MAU: 59953290,
        },
        {
          network: 'Instagram',
          MAU: 0,
        },
        {
          network: 'MySpace',
          MAU: 68046710,
        },
        {
          network: 'Orkut',
          MAU: 49941613,
        },
        {
          network: 'Pinterest',
          MAU: 0,
        },
        {
          network: 'Reddit',
          MAU: 0,
        },
        {
          network: 'Snapchat',
          MAU: 0,
        },
        {
          network: 'TikTok',
          MAU: 0,
        },
        {
          network: 'Tumblr',
          MAU: 0,
        },
        {
          network: 'Twitter',
          MAU: 43250000,
        },
        {
          network: 'WeChat',
          MAU: 0,
        },
        {
          network: 'Weibo',
          MAU: 19532900,
        },
        {
          network: 'Whatsapp',
          MAU: 0,
        },
        {
          network: 'YouTube',
          MAU: 480551990,
        },
      ],
      '2011': [
        {
          network: 'Facebook',
          MAU: 766000000,
        },
        {
          network: 'Flickr',
          MAU: 66954600,
        },
        {
          network: 'Friendster',
          MAU: 0,
        },
        {
          network: 'Google Buzz',
          MAU: 170000000,
        },
        {
          network: 'Google+',
          MAU: 0,
        },
        {
          network: 'Hi5',
          MAU: 46610848,
        },
        {
          network: 'Instagram',
          MAU: 0,
        },
        {
          network: 'MySpace',
          MAU: 46003536,
        },
        {
          network: 'Orkut',
          MAU: 47609080,
        },
        {
          network: 'Pinterest',
          MAU: 0,
        },
        {
          network: 'Reddit',
          MAU: 0,
        },
        {
          network: 'Snapchat',
          MAU: 0,
        },
        {
          network: 'TikTok',
          MAU: 0,
        },
        {
          network: 'Tumblr',
          MAU: 0,
        },
        {
          network: 'Twitter',
          MAU: 92750000,
        },
        {
          network: 'WeChat',
          MAU: 47818400,
        },
        {
          network: 'Weibo',
          MAU: 48691040,
        },
        {
          network: 'Whatsapp',
          MAU: 0,
        },
        {
          network: 'YouTube',
          MAU: 642669824,
        },
      ],
      '2012': [
        {
          network: 'Facebook',
          MAU: 979750000,
        },
        {
          network: 'Flickr',
          MAU: 79664888,
        },
        {
          network: 'Friendster',
          MAU: 0,
        },
        {
          network: 'Google Buzz',
          MAU: 170000000,
        },
        {
          network: 'Google+',
          MAU: 107319100,
        },
        {
          network: 'Hi5',
          MAU: 0,
        },
        {
          network: 'Instagram',
          MAU: 0,
        },
        {
          network: 'MySpace',
          MAU: 0,
        },
        {
          network: 'Orkut',
          MAU: 45067022,
        },
        {
          network: 'Pinterest',
          MAU: 0,
        },
        {
          network: 'Reddit',
          MAU: 0,
        },
        {
          network: 'Snapchat',
          MAU: 0,
        },
        {
          network: 'TikTok',
          MAU: 0,
        },
        {
          network: 'Tumblr',
          MAU: 146890156,
        },
        {
          network: 'Twitter',
          MAU: 160250000,
        },
        {
          network: 'WeChat',
          MAU: 118123370,
        },
        {
          network: 'Weibo',
          MAU: 79195730,
        },
        {
          network: 'Whatsapp',
          MAU: 0,
        },
        {
          network: 'YouTube',
          MAU: 844638200,
        },
      ],
      '2013': [
        {
          network: 'Facebook',
          MAU: 1170500000,
        },
        {
          network: 'Flickr',
          MAU: 80000000,
        },
        {
          network: 'Friendster',
          MAU: 0,
        },
        {
          network: 'Google Buzz',
          MAU: 170000000,
        },
        {
          network: 'Google+',
          MAU: 205654700,
        },
        {
          network: 'Hi5',
          MAU: 0,
        },
        {
          network: 'Instagram',
          MAU: 117500000,
        },
        {
          network: 'MySpace',
          MAU: 0,
        },
        {
          network: 'Orkut',
          MAU: 0,
        },
        {
          network: 'Pinterest',
          MAU: 0,
        },
        {
          network: 'Reddit',
          MAU: 0,
        },
        {
          network: 'Snapchat',
          MAU: 0,
        },
        {
          network: 'TikTok',
          MAU: 0,
        },
        {
          network: 'Tumblr',
          MAU: 293482050,
        },
        {
          network: 'Twitter',
          MAU: 223675000,
        },
        {
          network: 'WeChat',
          MAU: 196523760,
        },
        {
          network: 'Weibo',
          MAU: 118261880,
        },
        {
          network: 'Whatsapp',
          MAU: 300000000,
        },
        {
          network: 'YouTube',
          MAU: 1065223075,
        },
      ],
      '2014': [
        {
          network: 'Facebook',
          MAU: 1334000000,
        },
        {
          network: 'Flickr',
          MAU: 0,
        },
        {
          network: 'Friendster',
          MAU: 0,
        },
        {
          network: 'Google Buzz',
          MAU: 170000000,
        },
        {
          network: 'Google+',
          MAU: 254859015,
        },
        {
          network: 'Hi5',
          MAU: 0,
        },
        {
          network: 'Instagram',
          MAU: 250000000,
        },
        {
          network: 'MySpace',
          MAU: 0,
        },
        {
          network: 'Orkut',
          MAU: 0,
        },
        {
          network: 'Pinterest',
          MAU: 0,
        },
        {
          network: 'Reddit',
          MAU: 135786956,
        },
        {
          network: 'Snapchat',
          MAU: 0,
        },
        {
          network: 'TikTok',
          MAU: 0,
        },
        {
          network: 'Tumblr',
          MAU: 388721163,
        },
        {
          network: 'Twitter',
          MAU: 223675000,
        },
        {
          network: 'WeChat',
          MAU: 444232415,
        },
        {
          network: 'Weibo',
          MAU: 154890345,
        },
        {
          network: 'Whatsapp',
          MAU: 498750000,
        },
        {
          network: 'YouTube',
          MAU: 1249451725,
        },
      ],
      '2015': [
        {
          network: 'Facebook',
          MAU: 1516750000,
        },
        {
          network: 'Flickr',
          MAU: 0,
        },
        {
          network: 'Friendster',
          MAU: 0,
        },
        {
          network: 'Google Buzz',
          MAU: 170000000,
        },
        {
          network: 'Google+',
          MAU: 298950015,
        },
        {
          network: 'Hi5',
          MAU: 0,
        },
        {
          network: 'Instagram',
          MAU: 400000000,
        },
        {
          network: 'MySpace',
          MAU: 0,
        },
        {
          network: 'Orkut',
          MAU: 0,
        },
        {
          network: 'Pinterest',
          MAU: 0,
        },
        {
          network: 'Reddit',
          MAU: 163346676,
        },
        {
          network: 'Snapchat',
          MAU: 0,
        },
        {
          network: 'TikTok',
          MAU: 0,
        },
        {
          network: 'Tumblr',
          MAU: 475923363,
        },
        {
          network: 'Twitter',
          MAU: 304500000,
        },
        {
          network: 'WeChat',
          MAU: 660843407,
        },
        {
          network: 'Weibo',
          MAU: 208716685,
        },
        {
          network: 'Whatsapp',
          MAU: 800000000,
        },
        {
          network: 'YouTube',
          MAU: 1328133360,
        },
      ],
      '2016': [
        {
          network: 'Facebook',
          MAU: 1753500000,
        },
        {
          network: 'Flickr',
          MAU: 0,
        },
        {
          network: 'Friendster',
          MAU: 0,
        },
        {
          network: 'Google Buzz',
          MAU: 0,
        },
        {
          network: 'Google+',
          MAU: 398648000,
        },
        {
          network: 'Hi5',
          MAU: 0,
        },
        {
          network: 'Instagram',
          MAU: 550000000,
        },
        {
          network: 'MySpace',
          MAU: 0,
        },
        {
          network: 'Orkut',
          MAU: 0,
        },
        {
          network: 'Pinterest',
          MAU: 143250000,
        },
        {
          network: 'Reddit',
          MAU: 238972480,
        },
        {
          network: 'Snapchat',
          MAU: 238648000,
        },
        {
          network: 'TikTok',
          MAU: 0,
        },
        {
          network: 'Tumblr',
          MAU: 565796720,
        },
        {
          network: 'Twitter',
          MAU: 314500000,
        },
        {
          network: 'WeChat',
          MAU: 847512320,
        },
        {
          network: 'Weibo',
          MAU: 281026560,
        },
        {
          network: 'Whatsapp',
          MAU: 1000000000,
        },
        {
          network: 'YouTube',
          MAU: 1399053600,
        },
      ],
      '2017': [
        {
          network: 'Facebook',
          MAU: 2035750000,
        },
        {
          network: 'Flickr',
          MAU: 0,
        },
        {
          network: 'Friendster',
          MAU: 0,
        },
        {
          network: 'Google Buzz',
          MAU: 0,
        },
        {
          network: 'Google+',
          MAU: 495657000,
        },
        {
          network: 'Hi5',
          MAU: 0,
        },
        {
          network: 'Instagram',
          MAU: 750000000,
        },
        {
          network: 'MySpace',
          MAU: 0,
        },
        {
          network: 'Orkut',
          MAU: 0,
        },
        {
          network: 'Pinterest',
          MAU: 195000000,
        },
        {
          network: 'Reddit',
          MAU: 297394200,
        },
        {
          network: 'Snapchat',
          MAU: 0,
        },
        {
          network: 'TikTok',
          MAU: 239142500,
        },
        {
          network: 'Tumblr',
          MAU: 593783960,
        },
        {
          network: 'Twitter',
          MAU: 328250000,
        },
        {
          network: 'WeChat',
          MAU: 921742750,
        },
        {
          network: 'Weibo',
          MAU: 357569030,
        },
        {
          network: 'Whatsapp',
          MAU: 1333333333,
        },
        {
          network: 'YouTube',
          MAU: 1495657000,
        },
      ],
      '2018': [
        {
          network: 'Facebook',
          MAU: 2255250000,
        },
        {
          network: 'Flickr',
          MAU: 0,
        },
        {
          network: 'Friendster',
          MAU: 0,
        },
        {
          network: 'Google Buzz',
          MAU: 0,
        },
        {
          network: 'Google+',
          MAU: 430000000,
        },
        {
          network: 'Hi5',
          MAU: 0,
        },
        {
          network: 'Instagram',
          MAU: 1000000000,
        },
        {
          network: 'MySpace',
          MAU: 0,
        },
        {
          network: 'Orkut',
          MAU: 0,
        },
        {
          network: 'Pinterest',
          MAU: 246500000,
        },
        {
          network: 'Reddit',
          MAU: 355000000,
        },
        {
          network: 'Snapchat',
          MAU: 0,
        },
        {
          network: 'TikTok',
          MAU: 500000000,
        },
        {
          network: 'Tumblr',
          MAU: 624000000,
        },
        {
          network: 'Twitter',
          MAU: 329500000,
        },
        {
          network: 'WeChat',
          MAU: 1000000000,
        },
        {
          network: 'Weibo',
          MAU: 431000000,
        },
        {
          network: 'Whatsapp',
          MAU: 1433333333,
        },
        {
          network: 'YouTube',
          MAU: 1900000000,
        },
      ],
    };

    chart.data = JSON.parse(JSON.stringify(allData[year]));
    categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

    series.events.on('inited', function () {
      setTimeout(function () {
        playButton.isActive = true; // this starts interval
      }, 2000);
    });
  };
  radarColumnSort = () => {
    let chart = am4core.create('radarColumnSort', am4charts.RadarChart);

    chart.data = [
      {
        country: 'USA',
        visits: 2025,
      },
      {
        country: 'China',
        visits: 1882,
      },
      {
        country: 'Japan',
        visits: 1809,
      },
      {
        country: 'Germany',
        visits: 1322,
      },
      {
        country: 'UK',
        visits: 1122,
      },
      {
        country: 'France',
        visits: 1114,
      },
      {
        country: 'India',
        visits: 984,
      },
      {
        country: 'Spain',
        visits: 711,
      },
      {
        country: 'Netherlands',
        visits: 665,
      },
      {
        country: 'Russia',
        visits: 580,
      },
      {
        country: 'South Korea',
        visits: 443,
      },
      {
        country: 'Canada',
        visits: 441,
      },
    ];

    chart.innerRadius = am4core.percent(40);

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'country';
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.grid.template.strokeOpacity = 0.08;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    valueAxis.renderer.grid.template.strokeOpacity = 0.08;

    chart.seriesContainer.zIndex = -10;

    let series = chart.series.push(new am4charts.RadarColumnSeries());
    series.dataFields.categoryX = 'country';
    series.dataFields.valueY = 'visits';
    series.tooltipText = '{valueY.value}';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.radarColumn.cornerRadius = 5;
    series.columns.template.radarColumn.innerCornerRadius = 0;

    chart.zoomOutButton.disabled = true;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add('fill', (fill, target) => {
      return chart.colors.getIndex(target.dataItem.index);
    });

    setInterval(() => {
      am4core.array.each(chart.data, (item) => {
        item.visits *= Math.random() * 0.5 + 0.5;
        item.visits += 10;
      });
      chart.invalidateRawData();
    }, 2000);

    categoryAxis.sortBySeries = series;

    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.behavior = 'none';
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;
  };
  populationPyramid = () => {
    let mainContainer = am4core.create('chartdiv', am4core.Container);
    mainContainer.width = am4core.percent(100);
    mainContainer.height = am4core.percent(100);
    mainContainer.layout = 'horizontal';

    let usData = [
      {
        age: '0 to 5',
        male: 10175713,
        female: 9736305,
      },
      {
        age: '5 to 9',
        male: 10470147,
        female: 10031835,
      },
      {
        age: '10 to 14',
        male: 10561873,
        female: 10117913,
      },
      {
        age: '15 to 17',
        male: 6447043,
        female: 6142996,
      },
      {
        age: '18 to 21',
        male: 9349745,
        female: 8874664,
      },
      {
        age: '22 to 24',
        male: 6722248,
        female: 6422017,
      },
      {
        age: '25 to 29',
        male: 10989596,
        female: 10708414,
      },
      {
        age: '30 to 34',
        male: 10625791,
        female: 10557848,
      },
      {
        age: '35 to 39',
        male: 9899569,
        female: 9956213,
      },
      {
        age: '40 to 44',
        male: 10330986,
        female: 10465142,
      },
      {
        age: '45 to 49',
        male: 10571984,
        female: 10798384,
      },
      {
        age: '50 to 54',
        male: 11051409,
        female: 11474081,
      },
      {
        age: '55 to 59',
        male: 10173646,
        female: 10828301,
      },
      {
        age: '60 to 64',
        male: 8824852,
        female: 9590829,
      },
      {
        age: '65 to 69',
        male: 6876271,
        female: 7671175,
      },
      {
        age: '70 to 74',
        male: 4867513,
        female: 5720208,
      },
      {
        age: '75 to 79',
        male: 3416432,
        female: 4313697,
      },
      {
        age: '80 to 84',
        male: 2378691,
        female: 3432738,
      },
      {
        age: '85 and Older',
        male: 2000771,
        female: 3937981,
      },
    ];

    let maleChart = mainContainer.createChild(am4charts.XYChart);
    maleChart.paddingRight = 0;
    maleChart.data = JSON.parse(JSON.stringify(usData));

    // Create axes
    let maleCategoryAxis = maleChart.yAxes.push(new am4charts.CategoryAxis());
    maleCategoryAxis.dataFields.category = 'age';
    maleCategoryAxis.renderer.grid.template.location = 0;
    //maleCategoryAxis.renderer.inversed = true;
    maleCategoryAxis.renderer.minGridDistance = 15;

    let maleValueAxis = maleChart.xAxes.push(new am4charts.ValueAxis());
    maleValueAxis.renderer.inversed = true;
    maleValueAxis.min = 0;
    maleValueAxis.max = 10;
    maleValueAxis.strictMinMax = true;

    maleValueAxis.numberFormatter = new am4core.NumberFormatter();
    maleValueAxis.numberFormatter.numberFormat = "#.#'%'";

    // Create series
    let maleSeries = maleChart.series.push(new am4charts.ColumnSeries());
    maleSeries.dataFields.valueX = 'male';
    maleSeries.dataFields.valueXShow = 'percent';
    maleSeries.calculatePercent = true;
    maleSeries.dataFields.categoryY = 'age';
    maleSeries.interpolationDuration = 1000;
    maleSeries.columns.template.tooltipText =
      "Males, age{categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
    //maleSeries.sequencedInterpolation = true;

    let femaleChart = mainContainer.createChild(am4charts.XYChart);
    femaleChart.paddingLeft = 0;
    femaleChart.data = JSON.parse(JSON.stringify(usData));

    // Create axes
    let femaleCategoryAxis = femaleChart.yAxes.push(
      new am4charts.CategoryAxis()
    );
    femaleCategoryAxis.renderer.opposite = true;
    femaleCategoryAxis.dataFields.category = 'age';
    femaleCategoryAxis.renderer.grid.template.location = 0;
    femaleCategoryAxis.renderer.minGridDistance = 15;

    let femaleValueAxis = femaleChart.xAxes.push(new am4charts.ValueAxis());
    femaleValueAxis.min = 0;
    femaleValueAxis.max = 10;
    femaleValueAxis.strictMinMax = true;
    femaleValueAxis.numberFormatter = new am4core.NumberFormatter();
    femaleValueAxis.numberFormatter.numberFormat = "#.#'%'";
    femaleValueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    let femaleSeries = femaleChart.series.push(new am4charts.ColumnSeries());
    femaleSeries.dataFields.valueX = 'female';
    femaleSeries.dataFields.valueXShow = 'percent';
    femaleSeries.calculatePercent = true;
    femaleSeries.fill = femaleChart.colors.getIndex(4);
    femaleSeries.stroke = femaleSeries.fill;
    //femaleSeries.sequencedInterpolation = true;
    femaleSeries.columns.template.tooltipText =
      "Females, age{categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
    femaleSeries.dataFields.categoryY = 'age';
    femaleSeries.interpolationDuration = 1000;

    let mapChart = mainContainer.createChild(am4maps.MapChart);
    mapChart.projection = new am4maps.projections.Mercator();
    mapChart.geodata = am4geodata_usaAlbersLow;
    mapChart.zoomControl = new am4maps.ZoomControl();
    mapChart.zIndex = -1;

    let polygonSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    let selectedStateId = 'US';
    let selectedPolygon;
    let selectedStateName;

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.togglable = true;

    let hoverState = polygonTemplate.states.create('hover');
    hoverState.properties.fill = mapChart.colors.getIndex(2);

    let activeState = polygonTemplate.states.create('active');
    activeState.properties.fill = mapChart.colors.getIndex(6);

    polygonTemplate.events.on('hit', function (event) {
      let dataContext: any = event.target.dataItem.dataContext;
      let id = dataContext.id;
      let stateId = id.split('-')[1];
      showState(stateId, dataContext.name, event.target);
    });

    mapChart.seriesContainer.background.events.on('over', function (event) {
      showState(selectedStateId, selectedStateName, selectedPolygon);
    });

    function showState(id, stateName, polygon) {
      if (selectedStateId != id) {
        let newData = stateData[id];

        if (selectedPolygon) {
          selectedPolygon.isActive = false;
        }

        for (var i = 0; i < femaleChart.data.length; i++) {
          femaleChart.data[i].female = newData[i].female;
          maleChart.data[i].male = newData[i].male;
        }

        femaleChart.invalidateRawData();
        maleChart.invalidateRawData();

        selectedStateName = stateName;
        selectedStateId = id;
        selectedPolygon = polygon;

        label.text = stateName + ' population pyramid';
        label.hide(0);
        label.show();
      }
    }

    let label = mainContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.x = am4core.percent(80);
    label.horizontalCenter = 'middle';
    label.y = 50;
    label.showOnInit = true;
    label.text = 'US Population pyramid';
    label.hiddenState.properties.dy = -100;

    let stateData = {
      AK: [
        {
          age: '0 to 5',
          male: 28346,
          female: 26607,
        },
        {
          age: '10 to 14',
          male: 26350,
          female: 24821,
        },
        {
          age: '15 to 17',
          male: 15929,
          female: 14735,
        },
        {
          age: '18 to 21',
          male: 25360,
          female: 19030,
        },
        {
          age: '22 to 24',
          male: 20755,
          female: 15663,
        },
        {
          age: '25 to 29',
          male: 32415,
          female: 28259,
        },
        {
          age: '30 to 34',
          male: 28232,
          female: 25272,
        },
        {
          age: '35 to 39',
          male: 24217,
          female: 22002,
        },
        {
          age: '40 to 44',
          male: 23429,
          female: 21968,
        },
        {
          age: '45 to 49',
          male: 24764,
          female: 22784,
        },
        {
          age: '5 to 9',
          male: 26276,
          female: 25063,
        },
        {
          age: '50 to 54',
          male: 27623,
          female: 25503,
        },
        {
          age: '55 to 59',
          male: 26300,
          female: 25198,
        },
        {
          age: '60 to 64',
          male: 21798,
          female: 18970,
        },
        {
          age: '65 to 69',
          male: 13758,
          female: 12899,
        },
        {
          age: '70 to 74',
          male: 8877,
          female: 8269,
        },
        {
          age: '75 to 79',
          male: 4834,
          female: 4894,
        },
        {
          age: '80 to 84',
          male: 3015,
          female: 3758,
        },
        {
          age: '85 and Older',
          male: 1882,
          female: 3520,
        },
      ],
      AL: [
        {
          age: '0 to 5',
          male: 150860,
          female: 144194,
        },
        {
          age: '10 to 14',
          male: 161596,
          female: 156841,
        },
        {
          age: '15 to 17',
          male: 98307,
          female: 94462,
        },
        {
          age: '18 to 21',
          male: 142173,
          female: 136514,
        },
        {
          age: '22 to 24',
          male: 99164,
          female: 101444,
        },
        {
          age: '25 to 29',
          male: 154977,
          female: 159815,
        },
        {
          age: '30 to 34',
          male: 150036,
          female: 156764,
        },
        {
          age: '35 to 39',
          male: 141667,
          female: 152220,
        },
        {
          age: '40 to 44',
          male: 155693,
          female: 159835,
        },
        {
          age: '45 to 49',
          male: 156413,
          female: 163909,
        },
        {
          age: '5 to 9',
          male: 156380,
          female: 149334,
        },
        {
          age: '50 to 54',
          male: 166863,
          female: 178187,
        },
        {
          age: '55 to 59',
          male: 156994,
          female: 169355,
        },
        {
          age: '60 to 64',
          male: 140659,
          female: 156638,
        },
        {
          age: '65 to 69',
          male: 112724,
          female: 128494,
        },
        {
          age: '70 to 74',
          male: 79258,
          female: 96507,
        },
        {
          age: '75 to 79',
          male: 55122,
          female: 75371,
        },
        {
          age: '80 to 84',
          male: 36252,
          female: 53976,
        },
        {
          age: '85 and Older',
          male: 25955,
          female: 55667,
        },
      ],
      AR: [
        {
          age: '0 to 5',
          male: 98246,
          female: 93534,
        },
        {
          age: '10 to 14',
          male: 99707,
          female: 96862,
        },
        {
          age: '15 to 17',
          male: 60521,
          female: 57735,
        },
        {
          age: '18 to 21',
          male: 87209,
          female: 81936,
        },
        {
          age: '22 to 24',
          male: 59114,
          female: 59387,
        },
        {
          age: '25 to 29',
          male: 96190,
          female: 96573,
        },
        {
          age: '30 to 34',
          male: 96273,
          female: 95632,
        },
        {
          age: '35 to 39',
          male: 90371,
          female: 90620,
        },
        {
          age: '40 to 44',
          male: 91881,
          female: 93777,
        },
        {
          age: '45 to 49',
          male: 93238,
          female: 95476,
        },
        {
          age: '5 to 9',
          male: 103613,
          female: 97603,
        },
        {
          age: '50 to 54',
          male: 98960,
          female: 102953,
        },
        {
          age: '55 to 59',
          male: 92133,
          female: 100676,
        },
        {
          age: '60 to 64',
          male: 84082,
          female: 90243,
        },
        {
          age: '65 to 69',
          male: 70121,
          female: 76669,
        },
        {
          age: '70 to 74',
          male: 52154,
          female: 61686,
        },
        {
          age: '75 to 79',
          male: 36856,
          female: 44371,
        },
        {
          age: '80 to 84',
          male: 23098,
          female: 35328,
        },
        {
          age: '85 and Older',
          male: 18146,
          female: 35234,
        },
      ],
      AZ: [
        {
          age: '0 to 5',
          male: 221511,
          female: 212324,
        },
        {
          age: '10 to 14',
          male: 233530,
          female: 222965,
        },
        {
          age: '15 to 17',
          male: 138926,
          female: 132399,
        },
        {
          age: '18 to 21',
          male: 200240,
          female: 187786,
        },
        {
          age: '22 to 24',
          male: 142852,
          female: 132457,
        },
        {
          age: '25 to 29',
          male: 231488,
          female: 215985,
        },
        {
          age: '30 to 34',
          male: 223754,
          female: 214946,
        },
        {
          age: '35 to 39',
          male: 206718,
          female: 202482,
        },
        {
          age: '40 to 44',
          male: 213591,
          female: 210621,
        },
        {
          age: '45 to 49',
          male: 205830,
          female: 206081,
        },
        {
          age: '5 to 9',
          male: 231249,
          female: 224385,
        },
        {
          age: '50 to 54',
          male: 210386,
          female: 218328,
        },
        {
          age: '55 to 59',
          male: 192614,
          female: 209767,
        },
        {
          age: '60 to 64',
          male: 178325,
          female: 200313,
        },
        {
          age: '65 to 69',
          male: 155852,
          female: 174407,
        },
        {
          age: '70 to 74',
          male: 121878,
          female: 136840,
        },
        {
          age: '75 to 79',
          male: 87470,
          female: 96953,
        },
        {
          age: '80 to 84',
          male: 58553,
          female: 69559,
        },
        {
          age: '85 and Older',
          male: 44321,
          female: 74242,
        },
      ],
      CA: [
        {
          age: '0 to 5',
          male: 1283763,
          female: 1228013,
        },
        {
          age: '10 to 14',
          male: 1297819,
          female: 1245016,
        },
        {
          age: '15 to 17',
          male: 811114,
          female: 773387,
        },
        {
          age: '18 to 21',
          male: 1179739,
          female: 1100368,
        },
        {
          age: '22 to 24',
          male: 883323,
          female: 825833,
        },
        {
          age: '25 to 29',
          male: 1478557,
          female: 1387516,
        },
        {
          age: '30 to 34',
          male: 1399835,
          female: 1348430,
        },
        {
          age: '35 to 39',
          male: 1287803,
          female: 1271908,
        },
        {
          age: '40 to 44',
          male: 1308311,
          female: 1309907,
        },
        {
          age: '45 to 49',
          male: 1306719,
          female: 1303528,
        },
        {
          age: '5 to 9',
          male: 1295030,
          female: 1240201,
        },
        {
          age: '50 to 54',
          male: 1305323,
          female: 1330645,
        },
        {
          age: '55 to 59',
          male: 1161821,
          female: 1223440,
        },
        {
          age: '60 to 64',
          male: 975874,
          female: 1060921,
        },
        {
          age: '65 to 69',
          male: 734814,
          female: 833926,
        },
        {
          age: '70 to 74',
          male: 515115,
          female: 604615,
        },
        {
          age: '75 to 79',
          male: 363282,
          female: 455568,
        },
        {
          age: '80 to 84',
          male: 264126,
          female: 363937,
        },
        {
          age: '85 and Older',
          male: 234767,
          female: 427170,
        },
      ],
      CO: [
        {
          age: '0 to 5',
          male: 173245,
          female: 163629,
        },
        {
          age: '10 to 14',
          male: 179579,
          female: 170930,
        },
        {
          age: '15 to 17',
          male: 102577,
          female: 98569,
        },
        {
          age: '18 to 21',
          male: 152713,
          female: 139268,
        },
        {
          age: '22 to 24',
          male: 116654,
          female: 108238,
        },
        {
          age: '25 to 29',
          male: 204625,
          female: 188680,
        },
        {
          age: '30 to 34',
          male: 200624,
          female: 188616,
        },
        {
          age: '35 to 39',
          male: 183386,
          female: 175326,
        },
        {
          age: '40 to 44',
          male: 184422,
          female: 173654,
        },
        {
          age: '45 to 49',
          male: 174730,
          female: 172981,
        },
        {
          age: '5 to 9',
          male: 179803,
          female: 173524,
        },
        {
          age: '50 to 54',
          male: 183543,
          female: 187757,
        },
        {
          age: '55 to 59',
          male: 170717,
          female: 179537,
        },
        {
          age: '60 to 64',
          male: 150815,
          female: 155924,
        },
        {
          age: '65 to 69',
          male: 111094,
          female: 119530,
        },
        {
          age: '70 to 74',
          male: 72252,
          female: 80168,
        },
        {
          age: '75 to 79',
          male: 49142,
          female: 59393,
        },
        {
          age: '80 to 84',
          male: 31894,
          female: 43881,
        },
        {
          age: '85 and Older',
          male: 26852,
          female: 50634,
        },
      ],
      CT: [
        {
          age: '0 to 5',
          male: 97647,
          female: 93798,
        },
        {
          age: '10 to 14',
          male: 118032,
          female: 113043,
        },
        {
          age: '15 to 17',
          male: 75546,
          female: 71687,
        },
        {
          age: '18 to 21',
          male: 106966,
          female: 102763,
        },
        {
          age: '22 to 24',
          male: 71125,
          female: 64777,
        },
        {
          age: '25 to 29',
          male: 112189,
          female: 108170,
        },
        {
          age: '30 to 34',
          male: 107223,
          female: 109096,
        },
        {
          age: '35 to 39',
          male: 102424,
          female: 106008,
        },
        {
          age: '40 to 44',
          male: 116664,
          female: 123744,
        },
        {
          age: '45 to 49',
          male: 131872,
          female: 139406,
        },
        {
          age: '5 to 9',
          male: 110043,
          female: 104940,
        },
        {
          age: '50 to 54',
          male: 138644,
          female: 146532,
        },
        {
          age: '55 to 59',
          male: 126670,
          female: 132895,
        },
        {
          age: '60 to 64',
          male: 104701,
          female: 114339,
        },
        {
          age: '65 to 69',
          male: 80178,
          female: 91052,
        },
        {
          age: '70 to 74',
          male: 55237,
          female: 65488,
        },
        {
          age: '75 to 79',
          male: 38844,
          female: 51544,
        },
        {
          age: '80 to 84',
          male: 28908,
          female: 43036,
        },
        {
          age: '85 and Older',
          male: 28694,
          female: 59297,
        },
      ],
      DC: [
        {
          age: '0 to 5',
          male: 20585,
          female: 19848,
        },
        {
          age: '10 to 14',
          male: 12723,
          female: 11991,
        },
        {
          age: '15 to 17',
          male: 7740,
          female: 7901,
        },
        {
          age: '18 to 21',
          male: 22350,
          female: 25467,
        },
        {
          age: '22 to 24',
          male: 15325,
          female: 19085,
        },
        {
          age: '25 to 29',
          male: 35295,
          female: 41913,
        },
        {
          age: '30 to 34',
          male: 32716,
          female: 35553,
        },
        {
          age: '35 to 39',
          male: 23748,
          female: 24922,
        },
        {
          age: '40 to 44',
          male: 21158,
          female: 20113,
        },
        {
          age: '45 to 49',
          male: 19279,
          female: 18956,
        },
        {
          age: '5 to 9',
          male: 14999,
          female: 15518,
        },
        {
          age: '50 to 54',
          male: 19249,
          female: 19279,
        },
        {
          age: '55 to 59',
          male: 17592,
          female: 18716,
        },
        {
          age: '60 to 64',
          male: 14272,
          female: 17892,
        },
        {
          age: '65 to 69',
          male: 9740,
          female: 13375,
        },
        {
          age: '70 to 74',
          male: 8221,
          female: 9761,
        },
        {
          age: '75 to 79',
          male: 5071,
          female: 7601,
        },
        {
          age: '80 to 84',
          male: 3399,
          female: 5619,
        },
        {
          age: '85 and Older',
          male: 3212,
          female: 7300,
        },
      ],
      DE: [
        {
          age: '0 to 5',
          male: 28382,
          female: 27430,
        },
        {
          age: '10 to 14',
          male: 29482,
          female: 27484,
        },
        {
          age: '15 to 17',
          male: 17589,
          female: 16828,
        },
        {
          age: '18 to 21',
          male: 26852,
          female: 26911,
        },
        {
          age: '22 to 24',
          male: 19006,
          female: 18413,
        },
        {
          age: '25 to 29',
          male: 30933,
          female: 31146,
        },
        {
          age: '30 to 34',
          male: 28602,
          female: 29431,
        },
        {
          age: '35 to 39',
          male: 26498,
          female: 28738,
        },
        {
          age: '40 to 44',
          male: 27674,
          female: 28519,
        },
        {
          age: '45 to 49',
          male: 30582,
          female: 32924,
        },
        {
          age: '5 to 9',
          male: 28224,
          female: 28735,
        },
        {
          age: '50 to 54',
          male: 32444,
          female: 35052,
        },
        {
          age: '55 to 59',
          male: 29048,
          female: 34377,
        },
        {
          age: '60 to 64',
          male: 27925,
          female: 30017,
        },
        {
          age: '65 to 69',
          male: 22767,
          female: 26707,
        },
        {
          age: '70 to 74',
          male: 17121,
          female: 19327,
        },
        {
          age: '75 to 79',
          male: 11479,
          female: 14264,
        },
        {
          age: '80 to 84',
          male: 7473,
          female: 10353,
        },
        {
          age: '85 and Older',
          male: 6332,
          female: 11385,
        },
      ],
      FL: [
        {
          age: '0 to 5',
          male: 552054,
          female: 529003,
        },
        {
          age: '10 to 14',
          male: 582351,
          female: 558377,
        },
        {
          age: '15 to 17',
          male: 363538,
          female: 345048,
        },
        {
          age: '18 to 21',
          male: 528013,
          female: 498162,
        },
        {
          age: '22 to 24',
          male: 385515,
          female: 368754,
        },
        {
          age: '25 to 29',
          male: 641710,
          female: 622134,
        },
        {
          age: '30 to 34',
          male: 602467,
          female: 602634,
        },
        {
          age: '35 to 39',
          male: 579722,
          female: 585089,
        },
        {
          age: '40 to 44',
          male: 623074,
          female: 639410,
        },
        {
          age: '45 to 49',
          male: 659376,
          female: 677305,
        },
        {
          age: '5 to 9',
          male: 567479,
          female: 543273,
        },
        {
          age: '50 to 54',
          male: 687625,
          female: 723103,
        },
        {
          age: '55 to 59',
          male: 626363,
          female: 685728,
        },
        {
          age: '60 to 64',
          male: 566282,
          female: 651192,
        },
        {
          age: '65 to 69',
          male: 517513,
          female: 589377,
        },
        {
          age: '70 to 74',
          male: 407275,
          female: 470688,
        },
        {
          age: '75 to 79',
          male: 305530,
          female: 361107,
        },
        {
          age: '80 to 84',
          male: 219362,
          female: 281016,
        },
        {
          age: '85 and Older',
          male: 184760,
          female: 314363,
        },
      ],
      GA: [
        {
          age: '0 to 5',
          male: 338979,
          female: 326326,
        },
        {
          age: '10 to 14',
          male: 356404,
          female: 351833,
        },
        {
          age: '15 to 17',
          male: 211908,
          female: 203412,
        },
        {
          age: '18 to 21',
          male: 305617,
          female: 289233,
        },
        {
          age: '22 to 24',
          male: 214032,
          female: 206526,
        },
        {
          age: '25 to 29',
          male: 342885,
          female: 343115,
        },
        {
          age: '30 to 34',
          male: 333159,
          female: 348125,
        },
        {
          age: '35 to 39',
          male: 325121,
          female: 345251,
        },
        {
          age: '40 to 44',
          male: 348120,
          female: 363703,
        },
        {
          age: '45 to 49',
          male: 343559,
          female: 358754,
        },
        {
          age: '5 to 9',
          male: 362147,
          female: 340071,
        },
        {
          age: '50 to 54',
          male: 338424,
          female: 359362,
        },
        {
          age: '55 to 59',
          male: 294734,
          female: 325653,
        },
        {
          age: '60 to 64',
          male: 254497,
          female: 285276,
        },
        {
          age: '65 to 69',
          male: 198714,
          female: 226714,
        },
        {
          age: '70 to 74',
          male: 135107,
          female: 164091,
        },
        {
          age: '75 to 79',
          male: 88135,
          female: 115830,
        },
        {
          age: '80 to 84',
          male: 53792,
          female: 84961,
        },
        {
          age: '85 and Older',
          male: 37997,
          female: 85126,
        },
      ],
      HI: [
        {
          age: '0 to 5',
          male: 46668,
          female: 44389,
        },
        {
          age: '10 to 14',
          male: 42590,
          female: 41289,
        },
        {
          age: '15 to 17',
          male: 24759,
          female: 23961,
        },
        {
          age: '18 to 21',
          male: 39937,
          female: 32348,
        },
        {
          age: '22 to 24',
          male: 35270,
          female: 28495,
        },
        {
          age: '25 to 29',
          male: 58033,
          female: 48700,
        },
        {
          age: '30 to 34',
          male: 51544,
          female: 47286,
        },
        {
          age: '35 to 39',
          male: 44144,
          female: 42208,
        },
        {
          age: '40 to 44',
          male: 45731,
          female: 43404,
        },
        {
          age: '45 to 49',
          male: 44336,
          female: 44134,
        },
        {
          age: '5 to 9',
          male: 44115,
          female: 40426,
        },
        {
          age: '50 to 54',
          male: 46481,
          female: 46908,
        },
        {
          age: '55 to 59',
          male: 45959,
          female: 47379,
        },
        {
          age: '60 to 64',
          male: 42420,
          female: 43735,
        },
        {
          age: '65 to 69',
          male: 34846,
          female: 36670,
        },
        {
          age: '70 to 74',
          male: 22981,
          female: 25496,
        },
        {
          age: '75 to 79',
          male: 15219,
          female: 18755,
        },
        {
          age: '80 to 84',
          male: 11142,
          female: 17952,
        },
        {
          age: '85 and Older',
          male: 13696,
          female: 22893,
        },
      ],
      IA: [
        {
          age: '0 to 5',
          male: 100400,
          female: 96170,
        },
        {
          age: '10 to 14',
          male: 104674,
          female: 98485,
        },
        {
          age: '15 to 17',
          male: 62452,
          female: 59605,
        },
        {
          age: '18 to 21',
          male: 96966,
          female: 91782,
        },
        {
          age: '22 to 24',
          male: 66307,
          female: 62504,
        },
        {
          age: '25 to 29',
          male: 98079,
          female: 93653,
        },
        {
          age: '30 to 34',
          male: 100924,
          female: 97248,
        },
        {
          age: '35 to 39',
          male: 90980,
          female: 89632,
        },
        {
          age: '40 to 44',
          male: 92961,
          female: 90218,
        },
        {
          age: '45 to 49',
          male: 98877,
          female: 96654,
        },
        {
          age: '5 to 9',
          male: 104279,
          female: 100558,
        },
        {
          age: '50 to 54',
          male: 109267,
          female: 110142,
        },
        {
          age: '55 to 59',
          male: 104021,
          female: 106042,
        },
        {
          age: '60 to 64',
          male: 95379,
          female: 95499,
        },
        {
          age: '65 to 69',
          male: 68276,
          female: 73624,
        },
        {
          age: '70 to 74',
          male: 50414,
          female: 56973,
        },
        {
          age: '75 to 79',
          male: 37867,
          female: 48121,
        },
        {
          age: '80 to 84',
          male: 27523,
          female: 39851,
        },
        {
          age: '85 and Older',
          male: 24949,
          female: 52170,
        },
      ],
      ID: [
        {
          age: '0 to 5',
          male: 58355,
          female: 56478,
        },
        {
          age: '10 to 14',
          male: 62528,
          female: 59881,
        },
        {
          age: '15 to 17',
          male: 36373,
          female: 33687,
        },
        {
          age: '18 to 21',
          male: 45752,
          female: 45590,
        },
        {
          age: '22 to 24',
          male: 34595,
          female: 30216,
        },
        {
          age: '25 to 29',
          male: 53998,
          female: 52077,
        },
        {
          age: '30 to 34',
          male: 54217,
          female: 52091,
        },
        {
          age: '35 to 39',
          male: 51247,
          female: 47801,
        },
        {
          age: '40 to 44',
          male: 49113,
          female: 49853,
        },
        {
          age: '45 to 49',
          male: 48392,
          female: 48288,
        },
        {
          age: '5 to 9',
          male: 63107,
          female: 59237,
        },
        {
          age: '50 to 54',
          male: 51805,
          female: 52984,
        },
        {
          age: '55 to 59',
          male: 49226,
          female: 51868,
        },
        {
          age: '60 to 64',
          male: 47343,
          female: 47631,
        },
        {
          age: '65 to 69',
          male: 38436,
          female: 38133,
        },
        {
          age: '70 to 74',
          male: 26243,
          female: 28577,
        },
        {
          age: '75 to 79',
          male: 18404,
          female: 20325,
        },
        {
          age: '80 to 84',
          male: 11653,
          female: 15313,
        },
        {
          age: '85 and Older',
          male: 9677,
          female: 16053,
        },
      ],
      IL: [
        {
          age: '0 to 5',
          male: 408295,
          female: 392900,
        },
        {
          age: '10 to 14',
          male: 437688,
          female: 419077,
        },
        {
          age: '15 to 17',
          male: 269202,
          female: 257213,
        },
        {
          age: '18 to 21',
          male: 369219,
          female: 353570,
        },
        {
          age: '22 to 24',
          male: 268501,
          female: 258559,
        },
        {
          age: '25 to 29',
          male: 448001,
          female: 442418,
        },
        {
          age: '30 to 34',
          male: 445416,
          female: 445729,
        },
        {
          age: '35 to 39',
          male: 416265,
          female: 418999,
        },
        {
          age: '40 to 44',
          male: 425825,
          female: 427573,
        },
        {
          age: '45 to 49',
          male: 433177,
          female: 441116,
        },
        {
          age: '5 to 9',
          male: 427121,
          female: 412238,
        },
        {
          age: '50 to 54',
          male: 454039,
          female: 470982,
        },
        {
          age: '55 to 59',
          male: 414948,
          female: 442280,
        },
        {
          age: '60 to 64',
          male: 354782,
          female: 380640,
        },
        {
          age: '65 to 69',
          male: 259363,
          female: 292899,
        },
        {
          age: '70 to 74',
          male: 184622,
          female: 223905,
        },
        {
          age: '75 to 79',
          male: 129016,
          female: 171743,
        },
        {
          age: '80 to 84',
          male: 91973,
          female: 139204,
        },
        {
          age: '85 and Older',
          male: 79446,
          female: 165817,
        },
      ],
      IN: [
        {
          age: '0 to 5',
          male: 215697,
          female: 205242,
        },
        {
          age: '10 to 14',
          male: 229911,
          female: 221563,
        },
        {
          age: '15 to 17',
          male: 139494,
          female: 132879,
        },
        {
          age: '18 to 21',
          male: 198763,
          female: 194206,
        },
        {
          age: '22 to 24',
          male: 140805,
          female: 131947,
        },
        {
          age: '25 to 29',
          male: 210315,
          female: 208593,
        },
        {
          age: '30 to 34',
          male: 211656,
          female: 210103,
        },
        {
          age: '35 to 39',
          male: 201979,
          female: 200693,
        },
        {
          age: '40 to 44',
          male: 212114,
          female: 212653,
        },
        {
          age: '45 to 49',
          male: 216446,
          female: 219033,
        },
        {
          age: '5 to 9',
          male: 226901,
          female: 214964,
        },
        {
          age: '50 to 54',
          male: 232241,
          female: 237844,
        },
        {
          age: '55 to 59',
          male: 217033,
          female: 228674,
        },
        {
          age: '60 to 64',
          male: 186412,
          female: 197353,
        },
        {
          age: '65 to 69',
          male: 140336,
          female: 156256,
        },
        {
          age: '70 to 74',
          male: 99402,
          female: 116834,
        },
        {
          age: '75 to 79',
          male: 68758,
          female: 88794,
        },
        {
          age: '80 to 84',
          male: 47628,
          female: 72061,
        },
        {
          age: '85 and Older',
          male: 39372,
          female: 83690,
        },
      ],
      KS: [
        {
          age: '0 to 5',
          male: 102716,
          female: 98004,
        },
        {
          age: '10 to 14',
          male: 102335,
          female: 99132,
        },
        {
          age: '15 to 17',
          male: 60870,
          female: 57957,
        },
        {
          age: '18 to 21',
          male: 90593,
          female: 83299,
        },
        {
          age: '22 to 24',
          male: 66512,
          female: 59368,
        },
        {
          age: '25 to 29',
          male: 99384,
          female: 93840,
        },
        {
          age: '30 to 34',
          male: 98020,
          female: 94075,
        },
        {
          age: '35 to 39',
          male: 87763,
          female: 85422,
        },
        {
          age: '40 to 44',
          male: 87647,
          female: 84970,
        },
        {
          age: '45 to 49',
          male: 89233,
          female: 88877,
        },
        {
          age: '5 to 9',
          male: 103861,
          female: 98642,
        },
        {
          age: '50 to 54',
          male: 98398,
          female: 101197,
        },
        {
          age: '55 to 59',
          male: 95861,
          female: 96152,
        },
        {
          age: '60 to 64',
          male: 79440,
          female: 85124,
        },
        {
          age: '65 to 69',
          male: 60035,
          female: 64369,
        },
        {
          age: '70 to 74',
          male: 42434,
          female: 49221,
        },
        {
          age: '75 to 79',
          male: 30967,
          female: 39425,
        },
        {
          age: '80 to 84',
          male: 23026,
          female: 33863,
        },
        {
          age: '85 and Older',
          male: 20767,
          female: 40188,
        },
      ],
      KY: [
        {
          age: '0 to 5',
          male: 142062,
          female: 134389,
        },
        {
          age: '10 to 14',
          male: 147586,
          female: 138629,
        },
        {
          age: '15 to 17',
          male: 87696,
          female: 83139,
        },
        {
          age: '18 to 21',
          male: 128249,
          female: 121099,
        },
        {
          age: '22 to 24',
          male: 90794,
          female: 85930,
        },
        {
          age: '25 to 29',
          male: 140811,
          female: 139855,
        },
        {
          age: '30 to 34',
          male: 142732,
          female: 142551,
        },
        {
          age: '35 to 39',
          male: 137211,
          female: 136524,
        },
        {
          age: '40 to 44',
          male: 145358,
          female: 145251,
        },
        {
          age: '45 to 49',
          male: 148883,
          female: 150922,
        },
        {
          age: '5 to 9',
          male: 143532,
          female: 139032,
        },
        {
          age: '50 to 54',
          male: 156890,
          female: 163054,
        },
        {
          age: '55 to 59',
          male: 147006,
          female: 156302,
        },
        {
          age: '60 to 64',
          male: 129457,
          female: 139434,
        },
        {
          age: '65 to 69',
          male: 100883,
          female: 112696,
        },
        {
          age: '70 to 74',
          male: 71867,
          female: 83665,
        },
        {
          age: '75 to 79',
          male: 47828,
          female: 62775,
        },
        {
          age: '80 to 84',
          male: 31477,
          female: 46386,
        },
        {
          age: '85 and Older',
          male: 23886,
          female: 51512,
        },
      ],
      LA: [
        {
          age: '0 to 5',
          male: 157642,
          female: 152324,
        },
        {
          age: '10 to 14',
          male: 157781,
          female: 149752,
        },
        {
          age: '15 to 17',
          male: 93357,
          female: 90227,
        },
        {
          age: '18 to 21',
          male: 136496,
          female: 131202,
        },
        {
          age: '22 to 24',
          male: 101438,
          female: 101480,
        },
        {
          age: '25 to 29',
          male: 167414,
          female: 168886,
        },
        {
          age: '30 to 34',
          male: 160094,
          female: 161424,
        },
        {
          age: '35 to 39',
          male: 142182,
          female: 141813,
        },
        {
          age: '40 to 44',
          male: 138717,
          female: 144789,
        },
        {
          age: '45 to 49',
          male: 145906,
          female: 152340,
        },
        {
          age: '5 to 9',
          male: 159193,
          female: 154320,
        },
        {
          age: '50 to 54',
          male: 157743,
          female: 167125,
        },
        {
          age: '55 to 59',
          male: 149001,
          female: 161295,
        },
        {
          age: '60 to 64',
          male: 129265,
          female: 139378,
        },
        {
          age: '65 to 69',
          male: 98404,
          female: 106844,
        },
        {
          age: '70 to 74',
          male: 65845,
          female: 83779,
        },
        {
          age: '75 to 79',
          male: 47365,
          female: 60745,
        },
        {
          age: '80 to 84',
          male: 29452,
          female: 48839,
        },
        {
          age: '85 and Older',
          male: 23861,
          female: 47535,
        },
      ],
      MA: [
        {
          age: '0 to 5',
          male: 187066,
          female: 178775,
        },
        {
          age: '10 to 14',
          male: 205530,
          female: 195312,
        },
        {
          age: '15 to 17',
          male: 129433,
          female: 123212,
        },
        {
          age: '18 to 21',
          male: 207432,
          female: 213820,
        },
        {
          age: '22 to 24',
          male: 140356,
          female: 135839,
        },
        {
          age: '25 to 29',
          male: 235172,
          female: 237653,
        },
        {
          age: '30 to 34',
          male: 216220,
          female: 221692,
        },
        {
          age: '35 to 39',
          male: 196293,
          female: 202730,
        },
        {
          age: '40 to 44',
          male: 218111,
          female: 231277,
        },
        {
          age: '45 to 49',
          male: 237629,
          female: 249926,
        },
        {
          age: '5 to 9',
          male: 191958,
          female: 186343,
        },
        {
          age: '50 to 54',
          male: 247973,
          female: 260886,
        },
        {
          age: '55 to 59',
          male: 227238,
          female: 241029,
        },
        {
          age: '60 to 64',
          male: 189981,
          female: 211282,
        },
        {
          age: '65 to 69',
          male: 146129,
          female: 164268,
        },
        {
          age: '70 to 74',
          male: 100745,
          female: 123577,
        },
        {
          age: '75 to 79',
          male: 70828,
          female: 92141,
        },
        {
          age: '80 to 84',
          male: 52074,
          female: 81603,
        },
        {
          age: '85 and Older',
          male: 49482,
          female: 104571,
        },
      ],
      MD: [
        {
          age: '0 to 5',
          male: 187617,
          female: 180105,
        },
        {
          age: '10 to 14',
          male: 191787,
          female: 185380,
        },
        {
          age: '15 to 17',
          male: 118027,
          female: 113549,
        },
        {
          age: '18 to 21',
          male: 166991,
          female: 159589,
        },
        {
          age: '22 to 24',
          male: 120617,
          female: 116602,
        },
        {
          age: '25 to 29',
          male: 205555,
          female: 206944,
        },
        {
          age: '30 to 34',
          male: 196824,
          female: 203989,
        },
        {
          age: '35 to 39',
          male: 179340,
          female: 193957,
        },
        {
          age: '40 to 44',
          male: 195388,
          female: 205570,
        },
        {
          age: '45 to 49',
          male: 208382,
          female: 225458,
        },
        {
          age: '5 to 9',
          male: 189781,
          female: 182034,
        },
        {
          age: '50 to 54',
          male: 217574,
          female: 235604,
        },
        {
          age: '55 to 59',
          male: 193789,
          female: 210582,
        },
        {
          age: '60 to 64',
          male: 161828,
          female: 186524,
        },
        {
          age: '65 to 69',
          male: 123204,
          female: 144193,
        },
        {
          age: '70 to 74',
          male: 84114,
          female: 101563,
        },
        {
          age: '75 to 79',
          male: 56755,
          female: 75715,
        },
        {
          age: '80 to 84',
          male: 39615,
          female: 59728,
        },
        {
          age: '85 and Older',
          male: 35455,
          female: 70809,
        },
      ],
      ME: [
        {
          age: '0 to 5',
          male: 33298,
          female: 32108,
        },
        {
          age: '10 to 14',
          male: 38254,
          female: 36846,
        },
        {
          age: '15 to 17',
          male: 24842,
          female: 23688,
        },
        {
          age: '18 to 21',
          male: 35315,
          female: 33777,
        },
        {
          age: '22 to 24',
          male: 23007,
          female: 21971,
        },
        {
          age: '25 to 29',
          male: 37685,
          female: 38353,
        },
        {
          age: '30 to 34',
          male: 36838,
          female: 37697,
        },
        {
          age: '35 to 39',
          male: 35988,
          female: 37686,
        },
        {
          age: '40 to 44',
          male: 42092,
          female: 42912,
        },
        {
          age: '45 to 49',
          male: 47141,
          female: 49161,
        },
        {
          age: '5 to 9',
          male: 38066,
          female: 35151,
        },
        {
          age: '50 to 54',
          male: 53458,
          female: 55451,
        },
        {
          age: '55 to 59',
          male: 51789,
          female: 55407,
        },
        {
          age: '60 to 64',
          male: 47171,
          female: 49840,
        },
        {
          age: '65 to 69',
          male: 37495,
          female: 39678,
        },
        {
          age: '70 to 74',
          male: 26300,
          female: 28932,
        },
        {
          age: '75 to 79',
          male: 18197,
          female: 22047,
        },
        {
          age: '80 to 84',
          male: 12824,
          female: 18302,
        },
        {
          age: '85 and Older',
          male: 10321,
          female: 20012,
        },
      ],
      MI: [
        {
          age: '0 to 5',
          male: 295157,
          female: 280629,
        },
        {
          age: '10 to 14',
          male: 329983,
          female: 319870,
        },
        {
          age: '15 to 17',
          male: 210017,
          female: 199977,
        },
        {
          age: '18 to 21',
          male: 299937,
          female: 287188,
        },
        {
          age: '22 to 24',
          male: 208270,
          female: 202858,
        },
        {
          age: '25 to 29',
          male: 303606,
          female: 298013,
        },
        {
          age: '30 to 34',
          male: 292780,
          female: 296303,
        },
        {
          age: '35 to 39',
          male: 283925,
          female: 288526,
        },
        {
          age: '40 to 44',
          male: 314544,
          female: 319923,
        },
        {
          age: '45 to 49',
          male: 337524,
          female: 344097,
        },
        {
          age: '5 to 9',
          male: 316345,
          female: 297675,
        },
        {
          age: '50 to 54',
          male: 366054,
          female: 378332,
        },
        {
          age: '55 to 59',
          male: 349590,
          female: 369347,
        },
        {
          age: '60 to 64',
          male: 303421,
          female: 323815,
        },
        {
          age: '65 to 69',
          male: 230810,
          female: 252455,
        },
        {
          age: '70 to 74',
          male: 161676,
          female: 186453,
        },
        {
          age: '75 to 79',
          male: 112555,
          female: 141554,
        },
        {
          age: '80 to 84',
          male: 78669,
          female: 116914,
        },
        {
          age: '85 and Older',
          male: 67110,
          female: 134669,
        },
      ],
      MN: [
        {
          age: '0 to 5',
          male: 178616,
          female: 170645,
        },
        {
          age: '10 to 14',
          male: 180951,
          female: 174374,
        },
        {
          age: '15 to 17',
          male: 110001,
          female: 104197,
        },
        {
          age: '18 to 21',
          male: 148247,
          female: 144611,
        },
        {
          age: '22 to 24',
          male: 108864,
          female: 103755,
        },
        {
          age: '25 to 29',
          male: 185766,
          female: 180698,
        },
        {
          age: '30 to 34',
          male: 189374,
          female: 184845,
        },
        {
          age: '35 to 39',
          male: 166613,
          female: 160534,
        },
        {
          age: '40 to 44',
          male: 172583,
          female: 171011,
        },
        {
          age: '45 to 49',
          male: 184130,
          female: 182785,
        },
        {
          age: '5 to 9',
          male: 185244,
          female: 176674,
        },
        {
          age: '50 to 54',
          male: 202427,
          female: 203327,
        },
        {
          age: '55 to 59',
          male: 187216,
          female: 189980,
        },
        {
          age: '60 to 64',
          male: 157586,
          female: 160588,
        },
        {
          age: '65 to 69',
          male: 114903,
          female: 121985,
        },
        {
          age: '70 to 74',
          male: 81660,
          female: 92401,
        },
        {
          age: '75 to 79',
          male: 57855,
          female: 72839,
        },
        {
          age: '80 to 84',
          male: 42192,
          female: 58545,
        },
        {
          age: '85 and Older',
          male: 37938,
          female: 73211,
        },
      ],
      MO: [
        {
          age: '0 to 5',
          male: 192851,
          female: 183921,
        },
        {
          age: '10 to 14',
          male: 201273,
          female: 190020,
        },
        {
          age: '15 to 17',
          male: 122944,
          female: 116383,
        },
        {
          age: '18 to 21',
          male: 175782,
          female: 169076,
        },
        {
          age: '22 to 24',
          male: 124584,
          female: 123027,
        },
        {
          age: '25 to 29',
          male: 200511,
          female: 200134,
        },
        {
          age: '30 to 34',
          male: 197781,
          female: 198735,
        },
        {
          age: '35 to 39',
          male: 181485,
          female: 180002,
        },
        {
          age: '40 to 44',
          male: 183318,
          female: 188038,
        },
        {
          age: '45 to 49',
          male: 194538,
          female: 199735,
        },
        {
          age: '5 to 9',
          male: 200091,
          female: 193196,
        },
        {
          age: '50 to 54',
          male: 218663,
          female: 225083,
        },
        {
          age: '55 to 59',
          male: 199513,
          female: 216459,
        },
        {
          age: '60 to 64',
          male: 176036,
          female: 187668,
        },
        {
          age: '65 to 69',
          male: 135605,
          female: 150815,
        },
        {
          age: '70 to 74',
          male: 99845,
          female: 117802,
        },
        {
          age: '75 to 79',
          male: 70734,
          female: 88769,
        },
        {
          age: '80 to 84',
          male: 48118,
          female: 72085,
        },
        {
          age: '85 and Older',
          male: 40331,
          female: 80497,
        },
      ],
      MS: [
        {
          age: '0 to 5',
          male: 100654,
          female: 97079,
        },
        {
          age: '10 to 14',
          male: 107363,
          female: 101958,
        },
        {
          age: '15 to 17',
          male: 62923,
          female: 60591,
        },
        {
          age: '18 to 21',
          male: 94460,
          female: 94304,
        },
        {
          age: '22 to 24',
          male: 63870,
          female: 58909,
        },
        {
          age: '25 to 29',
          male: 96027,
          female: 98023,
        },
        {
          age: '30 to 34',
          male: 95533,
          female: 98837,
        },
        {
          age: '35 to 39',
          male: 88278,
          female: 92876,
        },
        {
          age: '40 to 44',
          male: 93579,
          female: 97851,
        },
        {
          age: '45 to 49',
          male: 92103,
          female: 98871,
        },
        {
          age: '5 to 9',
          male: 104911,
          female: 100694,
        },
        {
          age: '50 to 54',
          male: 98578,
          female: 106516,
        },
        {
          age: '55 to 59',
          male: 94835,
          female: 101616,
        },
        {
          age: '60 to 64',
          male: 80677,
          female: 91332,
        },
        {
          age: '65 to 69',
          male: 64386,
          female: 72940,
        },
        {
          age: '70 to 74',
          male: 46712,
          female: 56013,
        },
        {
          age: '75 to 79',
          male: 32079,
          female: 42598,
        },
        {
          age: '80 to 84',
          male: 19966,
          female: 32724,
        },
        {
          age: '85 and Older',
          male: 14789,
          female: 32626,
        },
      ],
      MT: [
        {
          age: '0 to 5',
          male: 31021,
          female: 29676,
        },
        {
          age: '10 to 14',
          male: 30960,
          female: 29710,
        },
        {
          age: '15 to 17',
          male: 19558,
          female: 18061,
        },
        {
          age: '18 to 21',
          male: 30975,
          female: 27314,
        },
        {
          age: '22 to 24',
          male: 21419,
          female: 20153,
        },
        {
          age: '25 to 29',
          male: 32300,
          female: 30805,
        },
        {
          age: '30 to 34',
          male: 33167,
          female: 30964,
        },
        {
          age: '35 to 39',
          male: 29772,
          female: 28999,
        },
        {
          age: '40 to 44',
          male: 28538,
          female: 27311,
        },
        {
          age: '45 to 49',
          male: 30820,
          female: 30608,
        },
        {
          age: '5 to 9',
          male: 33641,
          female: 31763,
        },
        {
          age: '50 to 54',
          male: 36761,
          female: 37476,
        },
        {
          age: '55 to 59',
          male: 38291,
          female: 40028,
        },
        {
          age: '60 to 64',
          male: 35306,
          female: 35021,
        },
        {
          age: '65 to 69',
          male: 27786,
          female: 27047,
        },
        {
          age: '70 to 74',
          male: 19708,
          female: 19938,
        },
        {
          age: '75 to 79',
          male: 13344,
          female: 14751,
        },
        {
          age: '80 to 84',
          male: 9435,
          female: 11392,
        },
        {
          age: '85 and Older',
          male: 7361,
          female: 13519,
        },
      ],
      NC: [
        {
          age: '0 to 5',
          male: 311288,
          female: 299882,
        },
        {
          age: '10 to 14',
          male: 333622,
          female: 316123,
        },
        {
          age: '15 to 17',
          male: 194507,
          female: 185872,
        },
        {
          age: '18 to 21',
          male: 299506,
          female: 275504,
        },
        {
          age: '22 to 24',
          male: 207910,
          female: 196277,
        },
        {
          age: '25 to 29',
          male: 317709,
          female: 324593,
        },
        {
          age: '30 to 34',
          male: 311582,
          female: 323483,
        },
        {
          age: '35 to 39',
          male: 308195,
          female: 319405,
        },
        {
          age: '40 to 44',
          male: 334818,
          female: 349484,
        },
        {
          age: '45 to 49',
          male: 331086,
          female: 345940,
        },
        {
          age: '5 to 9',
          male: 325977,
          female: 316564,
        },
        {
          age: '50 to 54',
          male: 334674,
          female: 355791,
        },
        {
          age: '55 to 59',
          male: 308840,
          female: 341170,
        },
        {
          age: '60 to 64',
          male: 270508,
          female: 303831,
        },
        {
          age: '65 to 69',
          male: 225997,
          female: 254521,
        },
        {
          age: '70 to 74',
          male: 154010,
          female: 186677,
        },
        {
          age: '75 to 79',
          male: 106165,
          female: 139937,
        },
        {
          age: '80 to 84',
          male: 68871,
          female: 104839,
        },
        {
          age: '85 and Older',
          male: 50143,
          female: 110032,
        },
      ],
      ND: [
        {
          age: '0 to 5',
          male: 24524,
          female: 24340,
        },
        {
          age: '10 to 14',
          male: 20939,
          female: 20728,
        },
        {
          age: '15 to 17',
          male: 13197,
          female: 12227,
        },
        {
          age: '18 to 21',
          male: 27439,
          female: 22447,
        },
        {
          age: '22 to 24',
          male: 21413,
          female: 19299,
        },
        {
          age: '25 to 29',
          male: 29543,
          female: 24602,
        },
        {
          age: '30 to 34',
          male: 26425,
          female: 22798,
        },
        {
          age: '35 to 39',
          male: 21846,
          female: 19046,
        },
        {
          age: '40 to 44',
          male: 20123,
          female: 19010,
        },
        {
          age: '45 to 49',
          male: 21386,
          female: 20572,
        },
        {
          age: '5 to 9',
          male: 24336,
          female: 22721,
        },
        {
          age: '50 to 54',
          male: 25126,
          female: 24631,
        },
        {
          age: '55 to 59',
          male: 24412,
          female: 24022,
        },
        {
          age: '60 to 64',
          male: 21598,
          female: 20250,
        },
        {
          age: '65 to 69',
          male: 14868,
          female: 14633,
        },
        {
          age: '70 to 74',
          male: 10729,
          female: 11878,
        },
        {
          age: '75 to 79',
          male: 8086,
          female: 9626,
        },
        {
          age: '80 to 84',
          male: 6222,
          female: 9241,
        },
        {
          age: '85 and Older',
          male: 5751,
          female: 11606,
        },
      ],
      NE: [
        {
          age: '0 to 5',
          male: 67062,
          female: 62974,
        },
        {
          age: '10 to 14',
          male: 64843,
          female: 62695,
        },
        {
          age: '15 to 17',
          male: 38679,
          female: 36116,
        },
        {
          age: '18 to 21',
          male: 56143,
          female: 54195,
        },
        {
          age: '22 to 24',
          male: 40531,
          female: 38139,
        },
        {
          age: '25 to 29',
          male: 64277,
          female: 61028,
        },
        {
          age: '30 to 34',
          male: 64230,
          female: 62423,
        },
        {
          age: '35 to 39',
          male: 57741,
          female: 55950,
        },
        {
          age: '40 to 44',
          male: 56139,
          female: 54518,
        },
        {
          age: '45 to 49',
          male: 57526,
          female: 57077,
        },
        {
          age: '5 to 9',
          male: 68079,
          female: 64509,
        },
        {
          age: '50 to 54',
          male: 64444,
          female: 65106,
        },
        {
          age: '55 to 59',
          male: 61285,
          female: 62057,
        },
        {
          age: '60 to 64',
          male: 52560,
          female: 54977,
        },
        {
          age: '65 to 69',
          male: 39372,
          female: 41007,
        },
        {
          age: '70 to 74',
          male: 27091,
          female: 31903,
        },
        {
          age: '75 to 79',
          male: 20472,
          female: 26808,
        },
        {
          age: '80 to 84',
          male: 15625,
          female: 21401,
        },
        {
          age: '85 and Older',
          male: 13507,
          female: 26876,
        },
      ],
      NH: [
        {
          age: '0 to 5',
          male: 33531,
          female: 32061,
        },
        {
          age: '10 to 14',
          male: 40472,
          female: 39574,
        },
        {
          age: '15 to 17',
          male: 26632,
          female: 25155,
        },
        {
          age: '18 to 21',
          male: 39600,
          female: 39270,
        },
        {
          age: '22 to 24',
          male: 25067,
          female: 23439,
        },
        {
          age: '25 to 29',
          male: 39514,
          female: 37529,
        },
        {
          age: '30 to 34',
          male: 37282,
          female: 37104,
        },
        {
          age: '35 to 39',
          male: 37177,
          female: 38432,
        },
        {
          age: '40 to 44',
          male: 43571,
          female: 43894,
        },
        {
          age: '45 to 49',
          male: 50559,
          female: 51423,
        },
        {
          age: '5 to 9',
          male: 37873,
          female: 36382,
        },
        {
          age: '50 to 54',
          male: 55573,
          female: 57097,
        },
        {
          age: '55 to 59',
          male: 50802,
          female: 52906,
        },
        {
          age: '60 to 64',
          male: 44934,
          female: 45384,
        },
        {
          age: '65 to 69',
          male: 33322,
          female: 34773,
        },
        {
          age: '70 to 74',
          male: 22786,
          female: 25421,
        },
        {
          age: '75 to 79',
          male: 14988,
          female: 18865,
        },
        {
          age: '80 to 84',
          male: 10661,
          female: 14921,
        },
        {
          age: '85 and Older',
          male: 9140,
          female: 17087,
        },
      ],
      NJ: [
        {
          age: '0 to 5',
          male: 272239,
          female: 261405,
        },
        {
          age: '10 to 14',
          male: 296798,
          female: 281395,
        },
        {
          age: '15 to 17',
          male: 183608,
          female: 174902,
        },
        {
          age: '18 to 21',
          male: 236406,
          female: 219234,
        },
        {
          age: '22 to 24',
          male: 171414,
          female: 162551,
        },
        {
          age: '25 to 29',
          male: 288078,
          female: 278395,
        },
        {
          age: '30 to 34',
          male: 286242,
          female: 288661,
        },
        {
          age: '35 to 39',
          male: 278323,
          female: 286407,
        },
        {
          age: '40 to 44',
          male: 306371,
          female: 315976,
        },
        {
          age: '45 to 49',
          male: 324604,
          female: 340805,
        },
        {
          age: '5 to 9',
          male: 280348,
          female: 272618,
        },
        {
          age: '50 to 54',
          male: 335379,
          female: 351753,
        },
        {
          age: '55 to 59',
          male: 297889,
          female: 316509,
        },
        {
          age: '60 to 64',
          male: 243909,
          female: 272971,
        },
        {
          age: '65 to 69',
          male: 187928,
          female: 216233,
        },
        {
          age: '70 to 74',
          male: 130458,
          female: 162862,
        },
        {
          age: '75 to 79',
          male: 92629,
          female: 121544,
        },
        {
          age: '80 to 84',
          male: 68009,
          female: 107002,
        },
        {
          age: '85 and Older',
          male: 62395,
          female: 130163,
        },
      ],
      NM: [
        {
          age: '0 to 5',
          male: 70556,
          female: 67433,
        },
        {
          age: '10 to 14',
          male: 72070,
          female: 69774,
        },
        {
          age: '15 to 17',
          male: 42831,
          female: 41474,
        },
        {
          age: '18 to 21',
          male: 61671,
          female: 59289,
        },
        {
          age: '22 to 24',
          male: 47139,
          female: 41506,
        },
        {
          age: '25 to 29',
          male: 73009,
          female: 67866,
        },
        {
          age: '30 to 34',
          male: 69394,
          female: 66383,
        },
        {
          age: '35 to 39',
          male: 62108,
          female: 60810,
        },
        {
          age: '40 to 44',
          male: 61075,
          female: 61508,
        },
        {
          age: '45 to 49',
          male: 62327,
          female: 64988,
        },
        {
          age: '5 to 9',
          male: 72877,
          female: 69675,
        },
        {
          age: '50 to 54',
          male: 69856,
          female: 73683,
        },
        {
          age: '55 to 59',
          male: 66381,
          female: 73952,
        },
        {
          age: '60 to 64',
          male: 61719,
          female: 66285,
        },
        {
          age: '65 to 69',
          male: 48657,
          female: 54175,
        },
        {
          age: '70 to 74',
          male: 35942,
          female: 39668,
        },
        {
          age: '75 to 79',
          male: 24922,
          female: 29968,
        },
        {
          age: '80 to 84',
          male: 16894,
          female: 21049,
        },
        {
          age: '85 and Older',
          male: 12986,
          female: 22217,
        },
      ],
      NV: [
        {
          age: '0 to 5',
          male: 91556,
          female: 87252,
        },
        {
          age: '10 to 14',
          male: 92376,
          female: 90127,
        },
        {
          age: '15 to 17',
          male: 56635,
          female: 53976,
        },
        {
          age: '18 to 21',
          male: 72185,
          female: 68570,
        },
        {
          age: '22 to 24',
          male: 57429,
          female: 54635,
        },
        {
          age: '25 to 29',
          male: 103079,
          female: 98260,
        },
        {
          age: '30 to 34',
          male: 101626,
          female: 97574,
        },
        {
          age: '35 to 39',
          male: 95952,
          female: 91752,
        },
        {
          age: '40 to 44',
          male: 98405,
          female: 96018,
        },
        {
          age: '45 to 49',
          male: 98297,
          female: 92880,
        },
        {
          age: '5 to 9',
          male: 97639,
          female: 92019,
        },
        {
          age: '50 to 54',
          male: 96647,
          female: 93838,
        },
        {
          age: '55 to 59',
          male: 86430,
          female: 90916,
        },
        {
          age: '60 to 64',
          male: 79651,
          female: 82206,
        },
        {
          age: '65 to 69',
          male: 65973,
          female: 70582,
        },
        {
          age: '70 to 74',
          male: 48879,
          female: 50485,
        },
        {
          age: '75 to 79',
          male: 31798,
          female: 33652,
        },
        {
          age: '80 to 84',
          male: 19722,
          female: 23399,
        },
        {
          age: '85 and Older',
          male: 13456,
          female: 22760,
        },
      ],
      NY: [
        {
          age: '0 to 5',
          male: 601900,
          female: 574532,
        },
        {
          age: '10 to 14',
          male: 602877,
          female: 576846,
        },
        {
          age: '15 to 17',
          male: 381224,
          female: 364149,
        },
        {
          age: '18 to 21',
          male: 579276,
          female: 563517,
        },
        {
          age: '22 to 24',
          male: 423461,
          female: 419351,
        },
        {
          age: '25 to 29',
          male: 722290,
          female: 728064,
        },
        {
          age: '30 to 34',
          male: 668918,
          female: 684340,
        },
        {
          age: '35 to 39',
          male: 607495,
          female: 628810,
        },
        {
          age: '40 to 44',
          male: 632186,
          female: 660306,
        },
        {
          age: '45 to 49',
          male: 674516,
          female: 708960,
        },
        {
          age: '5 to 9',
          male: 588624,
          female: 561622,
        },
        {
          age: '50 to 54',
          male: 695357,
          female: 740342,
        },
        {
          age: '55 to 59',
          male: 633602,
          female: 685163,
        },
        {
          age: '60 to 64',
          male: 540901,
          female: 604110,
        },
        {
          age: '65 to 69',
          male: 409399,
          female: 483158,
        },
        {
          age: '70 to 74',
          male: 287440,
          female: 357971,
        },
        {
          age: '75 to 79',
          male: 207495,
          female: 274626,
        },
        {
          age: '80 to 84',
          male: 150642,
          female: 231063,
        },
        {
          age: '85 and Older',
          male: 134198,
          female: 284443,
        },
      ],
      OH: [
        {
          age: '0 to 5',
          male: 356598,
          female: 339398,
        },
        {
          age: '10 to 14',
          male: 385542,
          female: 371142,
        },
        {
          age: '15 to 17',
          male: 239825,
          female: 228296,
        },
        {
          age: '18 to 21',
          male: 331115,
          female: 318019,
        },
        {
          age: '22 to 24',
          male: 227916,
          female: 225400,
        },
        {
          age: '25 to 29',
          male: 369646,
          female: 367475,
        },
        {
          age: '30 to 34',
          male: 356757,
          female: 359375,
        },
        {
          age: '35 to 39',
          male: 338273,
          female: 340410,
        },
        {
          age: '40 to 44',
          male: 368578,
          female: 375476,
        },
        {
          age: '45 to 49',
          male: 385388,
          female: 394341,
        },
        {
          age: '5 to 9',
          male: 376976,
          female: 358242,
        },
        {
          age: '50 to 54',
          male: 420561,
          female: 438290,
        },
        {
          age: '55 to 59',
          male: 403067,
          female: 427137,
        },
        {
          age: '60 to 64',
          male: 350563,
          female: 374890,
        },
        {
          age: '65 to 69',
          male: 262844,
          female: 292745,
        },
        {
          age: '70 to 74',
          male: 183419,
          female: 222552,
        },
        {
          age: '75 to 79',
          male: 131940,
          female: 173303,
        },
        {
          age: '80 to 84',
          male: 93267,
          female: 140079,
        },
        {
          age: '85 and Older',
          male: 80618,
          female: 166514,
        },
      ],
      OK: [
        {
          age: '0 to 5',
          male: 135423,
          female: 130297,
        },
        {
          age: '10 to 14',
          male: 133539,
          female: 128110,
        },
        {
          age: '15 to 17',
          male: 79207,
          female: 74080,
        },
        {
          age: '18 to 21',
          male: 115423,
          female: 107651,
        },
        {
          age: '22 to 24',
          male: 85610,
          female: 80749,
        },
        {
          age: '25 to 29',
          male: 135217,
          female: 130966,
        },
        {
          age: '30 to 34',
          male: 132683,
          female: 128496,
        },
        {
          age: '35 to 39',
          male: 118240,
          female: 116104,
        },
        {
          age: '40 to 44',
          male: 118534,
          female: 117501,
        },
        {
          age: '45 to 49',
          male: 117065,
          female: 118300,
        },
        {
          age: '5 to 9',
          male: 137212,
          female: 130040,
        },
        {
          age: '50 to 54',
          male: 129964,
          female: 132941,
        },
        {
          age: '55 to 59',
          male: 121988,
          female: 129033,
        },
        {
          age: '60 to 64',
          male: 105018,
          female: 113144,
        },
        {
          age: '65 to 69',
          male: 82818,
          female: 93914,
        },
        {
          age: '70 to 74',
          male: 62979,
          female: 71856,
        },
        {
          age: '75 to 79',
          male: 43899,
          female: 54848,
        },
        {
          age: '80 to 84',
          male: 29237,
          female: 42044,
        },
        {
          age: '85 and Older',
          male: 22888,
          female: 42715,
        },
      ],
      OR: [
        {
          age: '0 to 5',
          male: 118561,
          female: 112841,
        },
        {
          age: '10 to 14',
          male: 123223,
          female: 116373,
        },
        {
          age: '15 to 17',
          male: 75620,
          female: 71764,
        },
        {
          age: '18 to 21',
          male: 106121,
          female: 103044,
        },
        {
          age: '22 to 24',
          male: 79106,
          female: 75639,
        },
        {
          age: '25 to 29',
          male: 134241,
          female: 131539,
        },
        {
          age: '30 to 34',
          male: 137090,
          female: 135734,
        },
        {
          age: '35 to 39',
          male: 128812,
          female: 126071,
        },
        {
          age: '40 to 44',
          male: 131405,
          female: 126875,
        },
        {
          age: '45 to 49',
          male: 125373,
          female: 125074,
        },
        {
          age: '5 to 9',
          male: 122920,
          female: 119049,
        },
        {
          age: '50 to 54',
          male: 131932,
          female: 137021,
        },
        {
          age: '55 to 59',
          male: 130434,
          female: 141380,
        },
        {
          age: '60 to 64',
          male: 129063,
          female: 136051,
        },
        {
          age: '65 to 69',
          male: 99577,
          female: 106208,
        },
        {
          age: '70 to 74',
          male: 69028,
          female: 77428,
        },
        {
          age: '75 to 79',
          male: 46055,
          female: 53682,
        },
        {
          age: '80 to 84',
          male: 30900,
          female: 41853,
        },
        {
          age: '85 and Older',
          male: 28992,
          female: 53154,
        },
      ],
      PA: [
        {
          age: '0 to 5',
          male: 367290,
          female: 350371,
        },
        {
          age: '10 to 14',
          male: 393719,
          female: 374666,
        },
        {
          age: '15 to 17',
          male: 250754,
          female: 236670,
        },
        {
          age: '18 to 21',
          male: 378940,
          female: 369819,
        },
        {
          age: '22 to 24',
          male: 251063,
          female: 243391,
        },
        {
          age: '25 to 29',
          male: 420247,
          female: 410193,
        },
        {
          age: '30 to 34',
          male: 391190,
          female: 387225,
        },
        {
          age: '35 to 39',
          male: 365742,
          female: 365646,
        },
        {
          age: '40 to 44',
          male: 399152,
          female: 405848,
        },
        {
          age: '45 to 49',
          male: 435250,
          female: 446328,
        },
        {
          age: '5 to 9',
          male: 381910,
          female: 366854,
        },
        {
          age: '50 to 54',
          male: 472070,
          female: 489057,
        },
        {
          age: '55 to 59',
          male: 456215,
          female: 475044,
        },
        {
          age: '60 to 64',
          male: 390595,
          female: 419924,
        },
        {
          age: '65 to 69',
          male: 301610,
          female: 335127,
        },
        {
          age: '70 to 74',
          male: 212200,
          female: 256188,
        },
        {
          age: '75 to 79',
          male: 156335,
          female: 205974,
        },
        {
          age: '80 to 84',
          male: 117050,
          female: 178358,
        },
        {
          age: '85 and Older',
          male: 104012,
          female: 217532,
        },
      ],
      RI: [
        {
          age: '0 to 5',
          male: 28289,
          female: 26941,
        },
        {
          age: '10 to 14',
          male: 31383,
          female: 30724,
        },
        {
          age: '15 to 17',
          male: 20093,
          female: 19249,
        },
        {
          age: '18 to 21',
          male: 35376,
          female: 37870,
        },
        {
          age: '22 to 24',
          male: 23397,
          female: 21358,
        },
        {
          age: '25 to 29',
          male: 35958,
          female: 34710,
        },
        {
          age: '30 to 34',
          male: 32410,
          female: 32567,
        },
        {
          age: '35 to 39',
          male: 30325,
          female: 31145,
        },
        {
          age: '40 to 44',
          male: 32542,
          female: 34087,
        },
        {
          age: '45 to 49',
          male: 36151,
          female: 38462,
        },
        {
          age: '5 to 9',
          male: 30462,
          female: 27878,
        },
        {
          age: '50 to 54',
          male: 38419,
          female: 41642,
        },
        {
          age: '55 to 59',
          male: 36706,
          female: 39127,
        },
        {
          age: '60 to 64',
          male: 30349,
          female: 33752,
        },
        {
          age: '65 to 69',
          male: 23462,
          female: 26311,
        },
        {
          age: '70 to 74',
          male: 16385,
          female: 19335,
        },
        {
          age: '75 to 79',
          male: 10978,
          female: 14833,
        },
        {
          age: '80 to 84',
          male: 9224,
          female: 13439,
        },
        {
          age: '85 and Older',
          male: 8479,
          female: 19843,
        },
      ],
      SC: [
        {
          age: '0 to 5',
          male: 148363,
          female: 144218,
        },
        {
          age: '10 to 14',
          male: 153051,
          female: 148064,
        },
        {
          age: '15 to 17',
          male: 92781,
          female: 88090,
        },
        {
          age: '18 to 21',
          male: 150464,
          female: 136857,
        },
        {
          age: '22 to 24',
          male: 99237,
          female: 99178,
        },
        {
          age: '25 to 29',
          male: 156273,
          female: 156982,
        },
        {
          age: '30 to 34',
          male: 148237,
          female: 153197,
        },
        {
          age: '35 to 39',
          male: 139949,
          female: 146281,
        },
        {
          age: '40 to 44',
          male: 151524,
          female: 157192,
        },
        {
          age: '45 to 49',
          male: 153110,
          female: 163562,
        },
        {
          age: '5 to 9',
          male: 156323,
          female: 150943,
        },
        {
          age: '50 to 54',
          male: 161003,
          female: 173752,
        },
        {
          age: '55 to 59',
          male: 150770,
          female: 169238,
        },
        {
          age: '60 to 64',
          male: 141268,
          female: 160890,
        },
        {
          age: '65 to 69',
          male: 120618,
          female: 137154,
        },
        {
          age: '70 to 74',
          male: 85197,
          female: 97581,
        },
        {
          age: '75 to 79',
          male: 55278,
          female: 69067,
        },
        {
          age: '80 to 84',
          male: 33979,
          female: 50585,
        },
        {
          age: '85 and Older',
          male: 24984,
          female: 52336,
        },
      ],
      SD: [
        {
          age: '0 to 5',
          male: 30615,
          female: 29377,
        },
        {
          age: '10 to 14',
          male: 28360,
          female: 26492,
        },
        {
          age: '15 to 17',
          male: 17193,
          female: 16250,
        },
        {
          age: '18 to 21',
          male: 25514,
          female: 24234,
        },
        {
          age: '22 to 24',
          male: 18413,
          female: 16324,
        },
        {
          age: '25 to 29',
          male: 29131,
          female: 26757,
        },
        {
          age: '30 to 34',
          male: 28133,
          female: 26710,
        },
        {
          age: '35 to 39',
          male: 24971,
          female: 23347,
        },
        {
          age: '40 to 44',
          male: 24234,
          female: 23231,
        },
        {
          age: '45 to 49',
          male: 25555,
          female: 24867,
        },
        {
          age: '5 to 9',
          male: 30399,
          female: 28980,
        },
        {
          age: '50 to 54',
          male: 29754,
          female: 29530,
        },
        {
          age: '55 to 59',
          male: 29075,
          female: 28968,
        },
        {
          age: '60 to 64',
          male: 25633,
          female: 25530,
        },
        {
          age: '65 to 69',
          male: 19320,
          female: 18489,
        },
        {
          age: '70 to 74',
          male: 12964,
          female: 14702,
        },
        {
          age: '75 to 79',
          male: 9646,
          female: 12077,
        },
        {
          age: '80 to 84',
          male: 7669,
          female: 10566,
        },
        {
          age: '85 and Older',
          male: 6898,
          female: 13282,
        },
      ],
      TN: [
        {
          age: '0 to 5',
          male: 204457,
          female: 196347,
        },
        {
          age: '10 to 14',
          male: 217061,
          female: 206350,
        },
        {
          age: '15 to 17',
          male: 129690,
          female: 124122,
        },
        {
          age: '18 to 21',
          male: 183910,
          female: 175377,
        },
        {
          age: '22 to 24',
          male: 132501,
          female: 134905,
        },
        {
          age: '25 to 29',
          male: 210618,
          female: 214944,
        },
        {
          age: '30 to 34',
          male: 209305,
          female: 214151,
        },
        {
          age: '35 to 39',
          male: 200270,
          female: 207520,
        },
        {
          age: '40 to 44',
          male: 216542,
          female: 219178,
        },
        {
          age: '45 to 49',
          male: 217059,
          female: 224473,
        },
        {
          age: '5 to 9',
          male: 210365,
          female: 204494,
        },
        {
          age: '50 to 54',
          male: 223663,
          female: 238025,
        },
        {
          age: '55 to 59',
          male: 210228,
          female: 229974,
        },
        {
          age: '60 to 64',
          male: 186739,
          female: 207022,
        },
        {
          age: '65 to 69',
          male: 153737,
          female: 171357,
        },
        {
          age: '70 to 74',
          male: 108743,
          female: 125362,
        },
        {
          age: '75 to 79',
          male: 72813,
          female: 94077,
        },
        {
          age: '80 to 84',
          male: 46556,
          female: 71212,
        },
        {
          age: '85 and Older',
          male: 33499,
          female: 72969,
        },
      ],
      TX: [
        {
          age: '0 to 5',
          male: 996070,
          female: 955235,
        },
        {
          age: '10 to 14',
          male: 998209,
          female: 959762,
        },
        {
          age: '15 to 17',
          male: 587712,
          female: 561008,
        },
        {
          age: '18 to 21',
          male: 818590,
          female: 756451,
        },
        {
          age: '22 to 24',
          male: 582570,
          female: 556850,
        },
        {
          age: '25 to 29',
          male: 982673,
          female: 948564,
        },
        {
          age: '30 to 34',
          male: 961403,
          female: 947710,
        },
        {
          age: '35 to 39',
          male: 897542,
          female: 898907,
        },
        {
          age: '40 to 44',
          male: 897922,
          female: 908091,
        },
        {
          age: '45 to 49',
          male: 857621,
          female: 865642,
        },
        {
          age: '5 to 9',
          male: 1021123,
          female: 979891,
        },
        {
          age: '50 to 54',
          male: 861849,
          female: 880746,
        },
        {
          age: '55 to 59',
          male: 761410,
          female: 799294,
        },
        {
          age: '60 to 64',
          male: 635465,
          female: 692072,
        },
        {
          age: '65 to 69',
          male: 483436,
          female: 533368,
        },
        {
          age: '70 to 74',
          male: 330457,
          female: 389996,
        },
        {
          age: '75 to 79',
          male: 228243,
          female: 289446,
        },
        {
          age: '80 to 84',
          male: 153391,
          female: 219572,
        },
        {
          age: '85 and Older',
          male: 115630,
          female: 224693,
        },
      ],
      UT: [
        {
          age: '0 to 5',
          male: 130873,
          female: 124371,
        },
        {
          age: '10 to 14',
          male: 128076,
          female: 120364,
        },
        {
          age: '15 to 17',
          male: 70832,
          female: 66798,
        },
        {
          age: '18 to 21',
          male: 87877,
          female: 92950,
        },
        {
          age: '22 to 24',
          male: 79431,
          female: 71405,
        },
        {
          age: '25 to 29',
          male: 109125,
          female: 106576,
        },
        {
          age: '30 to 34',
          male: 115198,
          female: 110546,
        },
        {
          age: '35 to 39',
          male: 102771,
          female: 99664,
        },
        {
          age: '40 to 44',
          male: 88181,
          female: 83229,
        },
        {
          age: '45 to 49',
          male: 76552,
          female: 74993,
        },
        {
          age: '5 to 9',
          male: 131094,
          female: 125110,
        },
        {
          age: '50 to 54',
          male: 76913,
          female: 78113,
        },
        {
          age: '55 to 59',
          male: 71490,
          female: 73221,
        },
        {
          age: '60 to 64',
          male: 60996,
          female: 63835,
        },
        {
          age: '65 to 69',
          male: 45491,
          female: 49273,
        },
        {
          age: '70 to 74',
          male: 32191,
          female: 35931,
        },
        {
          age: '75 to 79',
          male: 23112,
          female: 27761,
        },
        {
          age: '80 to 84',
          male: 15827,
          female: 20155,
        },
        {
          age: '85 and Older',
          male: 13199,
          female: 19855,
        },
      ],
      VA: [
        {
          age: '0 to 5',
          male: 262278,
          female: 250000,
        },
        {
          age: '10 to 14',
          male: 266247,
          female: 251516,
        },
        {
          age: '15 to 17',
          male: 160174,
          female: 153149,
        },
        {
          age: '18 to 21',
          male: 248284,
          female: 233796,
        },
        {
          age: '22 to 24',
          male: 175833,
          female: 167676,
        },
        {
          age: '25 to 29',
          male: 296682,
          female: 287052,
        },
        {
          age: '30 to 34',
          male: 286536,
          female: 283804,
        },
        {
          age: '35 to 39',
          male: 264490,
          female: 265951,
        },
        {
          age: '40 to 44',
          male: 278474,
          female: 286095,
        },
        {
          age: '45 to 49',
          male: 286793,
          female: 297558,
        },
        {
          age: '5 to 9',
          male: 264413,
          female: 256891,
        },
        {
          age: '50 to 54',
          male: 296096,
          female: 309898,
        },
        {
          age: '55 to 59',
          male: 262954,
          female: 283219,
        },
        {
          age: '60 to 64',
          male: 228721,
          female: 250389,
        },
        {
          age: '65 to 69',
          male: 178498,
          female: 197033,
        },
        {
          age: '70 to 74',
          male: 123597,
          female: 146376,
        },
        {
          age: '75 to 79',
          male: 82281,
          female: 103044,
        },
        {
          age: '80 to 84',
          male: 55037,
          female: 80081,
        },
        {
          age: '85 and Older',
          male: 43560,
          female: 92154,
        },
      ],
      VT: [
        {
          age: '0 to 5',
          male: 15766,
          female: 14629,
        },
        {
          age: '10 to 14',
          male: 18674,
          female: 17317,
        },
        {
          age: '15 to 17',
          male: 11909,
          female: 11565,
        },
        {
          age: '18 to 21',
          male: 21686,
          female: 20502,
        },
        {
          age: '22 to 24',
          male: 12648,
          female: 11840,
        },
        {
          age: '25 to 29',
          male: 18005,
          female: 17548,
        },
        {
          age: '30 to 34',
          male: 17565,
          female: 18161,
        },
        {
          age: '35 to 39',
          male: 16856,
          female: 17454,
        },
        {
          age: '40 to 44',
          male: 19431,
          female: 19600,
        },
        {
          age: '45 to 49',
          male: 21315,
          female: 22377,
        },
        {
          age: '5 to 9',
          male: 17073,
          female: 16338,
        },
        {
          age: '50 to 54',
          male: 24629,
          female: 26080,
        },
        {
          age: '55 to 59',
          male: 24925,
          female: 25588,
        },
        {
          age: '60 to 64',
          male: 21769,
          female: 23081,
        },
        {
          age: '65 to 69',
          male: 16842,
          female: 17925,
        },
        {
          age: '70 to 74',
          male: 11855,
          female: 12331,
        },
        {
          age: '75 to 79',
          male: 7639,
          female: 9192,
        },
        {
          age: '80 to 84',
          male: 5291,
          female: 8001,
        },
        {
          age: '85 and Older',
          male: 4695,
          female: 8502,
        },
      ],
      WA: [
        {
          age: '0 to 5',
          male: 228403,
          female: 217400,
        },
        {
          age: '10 to 14',
          male: 224142,
          female: 217269,
        },
        {
          age: '15 to 17',
          male: 136967,
          female: 130193,
        },
        {
          age: '18 to 21',
          male: 195001,
          female: 179996,
        },
        {
          age: '22 to 24',
          male: 151577,
          female: 140876,
        },
        {
          age: '25 to 29',
          male: 260873,
          female: 244497,
        },
        {
          age: '30 to 34',
          male: 252612,
          female: 243147,
        },
        {
          age: '35 to 39',
          male: 230325,
          female: 223596,
        },
        {
          age: '40 to 44',
          male: 234066,
          female: 228073,
        },
        {
          age: '45 to 49',
          male: 233107,
          female: 230232,
        },
        {
          age: '5 to 9',
          male: 227824,
          female: 214378,
        },
        {
          age: '50 to 54',
          male: 245685,
          female: 247691,
        },
        {
          age: '55 to 59',
          male: 231612,
          female: 241813,
        },
        {
          age: '60 to 64',
          male: 206233,
          female: 219560,
        },
        {
          age: '65 to 69',
          male: 158697,
          female: 170678,
        },
        {
          age: '70 to 74',
          male: 107931,
          female: 118093,
        },
        {
          age: '75 to 79',
          male: 70497,
          female: 83476,
        },
        {
          age: '80 to 84',
          male: 48802,
          female: 66167,
        },
        {
          age: '85 and Older',
          male: 43371,
          female: 80604,
        },
      ],
      WI: [
        {
          age: '0 to 5',
          male: 176217,
          female: 168178,
        },
        {
          age: '10 to 14',
          male: 191911,
          female: 180587,
        },
        {
          age: '15 to 17',
          male: 115730,
          female: 110660,
        },
        {
          age: '18 to 21',
          male: 167063,
          female: 161358,
        },
        {
          age: '22 to 24',
          male: 117861,
          female: 113393,
        },
        {
          age: '25 to 29',
          male: 183464,
          female: 176718,
        },
        {
          age: '30 to 34',
          male: 187494,
          female: 181605,
        },
        {
          age: '35 to 39',
          male: 172689,
          female: 168116,
        },
        {
          age: '40 to 44',
          male: 179862,
          female: 176322,
        },
        {
          age: '45 to 49',
          male: 198114,
          female: 197462,
        },
        {
          age: '5 to 9',
          male: 186006,
          female: 180034,
        },
        {
          age: '50 to 54',
          male: 217886,
          female: 219813,
        },
        {
          age: '55 to 59',
          male: 204370,
          female: 206108,
        },
        {
          age: '60 to 64',
          male: 176161,
          female: 178738,
        },
        {
          age: '65 to 69',
          male: 130349,
          female: 136552,
        },
        {
          age: '70 to 74',
          male: 90955,
          female: 103217,
        },
        {
          age: '75 to 79',
          male: 65738,
          female: 81341,
        },
        {
          age: '80 to 84',
          male: 48337,
          female: 67614,
        },
        {
          age: '85 and Older',
          male: 41178,
          female: 82916,
        },
      ],
      WV: [
        {
          age: '0 to 5',
          male: 52472,
          female: 50287,
        },
        {
          age: '10 to 14',
          male: 55269,
          female: 52689,
        },
        {
          age: '15 to 17',
          male: 34100,
          female: 32359,
        },
        {
          age: '18 to 21',
          male: 51801,
          female: 48967,
        },
        {
          age: '22 to 24',
          male: 35920,
          female: 34241,
        },
        {
          age: '25 to 29',
          male: 54564,
          female: 52255,
        },
        {
          age: '30 to 34',
          male: 56430,
          female: 55121,
        },
        {
          age: '35 to 39',
          male: 55764,
          female: 55399,
        },
        {
          age: '40 to 44',
          male: 60662,
          female: 59373,
        },
        {
          age: '45 to 49',
          male: 61771,
          female: 61257,
        },
        {
          age: '5 to 9',
          male: 53707,
          female: 51490,
        },
        {
          age: '50 to 54',
          male: 66156,
          female: 68671,
        },
        {
          age: '55 to 59',
          male: 66936,
          female: 71680,
        },
        {
          age: '60 to 64',
          male: 65717,
          female: 67056,
        },
        {
          age: '65 to 69',
          male: 51285,
          female: 54807,
        },
        {
          age: '70 to 74',
          male: 36504,
          female: 39946,
        },
        {
          age: '75 to 79',
          male: 25738,
          female: 31619,
        },
        {
          age: '80 to 84',
          male: 16397,
          female: 24351,
        },
        {
          age: '85 and Older',
          male: 12438,
          female: 26221,
        },
      ],
      WY: [
        {
          age: '0 to 5',
          male: 19649,
          female: 18996,
        },
        {
          age: '10 to 14',
          male: 20703,
          female: 17785,
        },
        {
          age: '15 to 17',
          male: 11500,
          female: 10383,
        },
        {
          age: '18 to 21',
          male: 18008,
          female: 15534,
        },
        {
          age: '22 to 24',
          male: 12727,
          female: 11405,
        },
        {
          age: '25 to 29',
          male: 21459,
          female: 19350,
        },
        {
          age: '30 to 34',
          male: 21008,
          female: 19465,
        },
        {
          age: '35 to 39',
          male: 18573,
          female: 17022,
        },
        {
          age: '40 to 44',
          male: 17553,
          female: 16402,
        },
        {
          age: '45 to 49',
          male: 17580,
          female: 16702,
        },
        {
          age: '5 to 9',
          male: 19198,
          female: 19519,
        },
        {
          age: '50 to 54',
          male: 20337,
          female: 20958,
        },
        {
          age: '55 to 59',
          male: 21523,
          female: 21000,
        },
        {
          age: '60 to 64',
          male: 19048,
          female: 18292,
        },
        {
          age: '65 to 69',
          male: 13999,
          female: 13130,
        },
        {
          age: '70 to 74',
          male: 8710,
          female: 9880,
        },
        {
          age: '75 to 79',
          male: 6149,
          female: 6938,
        },
        {
          age: '80 to 84',
          male: 4442,
          female: 5560,
        },
        {
          age: '85 and Older',
          male: 3395,
          female: 5797,
        },
      ],
    };
  };
  timeLineChart = () => {
    let chart: any = am4core.create(
      'timeLineChart',
      am4plugins_timeline.SerpentineChart
    );
    chart.curveContainer.padding(100, 20, 50, 20);
    chart.levelCount = 3;
    chart.yAxisRadius = am4core.percent(20);
    chart.yAxisInnerRadius = am4core.percent(2);
    chart.maskBullets = false;

    let colorSet = new am4core.ColorSet();

    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm';
    chart.dateFormatter.dateFormat = 'HH';

    chart.data = [
      {
        category: '',
        start: '2019-01-10 06:00',
        end: '2019-01-10 07:00',
        color: colorSet.getIndex(15),
        text: 'I will have\na healthy day today!',
        textDisabled: false,
        icon: '/wp-content/uploads/assets/timeline/timeline0.svg',
      },
      {
        category: '',
        start: '2019-01-10 07:00',
        end: '2019-01-10 08:00',
        color: colorSet.getIndex(14),
        icon: '/wp-content/uploads/assets/timeline/timeline1.svg',
      },
      {
        category: '',
        start: '2019-01-10 08:00',
        end: '2019-01-10 09:00',
        color: colorSet.getIndex(13),
        icon: '/wp-content/uploads/assets/timeline/timeline2.svg',
      },
      {
        category: '',
        start: '2019-01-10 09:00',
        end: '2019-01-10 10:00',
        color: colorSet.getIndex(12),
        icon: '/wp-content/uploads/assets/timeline/timeline2.svg',
      },
      {
        category: '',
        start: '2019-01-10 10:00',
        end: '2019-01-10 12:00',
        color: colorSet.getIndex(11),
        icon: '/wp-content/uploads/assets/timeline/timeline2.svg',
      },
      {
        category: '',
        start: '2019-01-10 12:00',
        end: '2019-01-10 13:00',
        color: colorSet.getIndex(10),
        icon: '/wp-content/uploads/assets/timeline/timeline1.svg',
      },
      {
        category: '',
        start: '2019-01-10 13:00',
        end: '2019-01-10 14:00',
        color: colorSet.getIndex(9),
        text: "One beer doesn't count.",
        textDisabled: false,
        icon: '/wp-content/uploads/assets/timeline/timeline3.svg',
      },
      {
        category: '',
        start: '2019-01-10 14:00',
        end: '2019-01-10 16:00',
        color: colorSet.getIndex(8),
        icon: '/wp-content/uploads/assets/timeline/timeline2.svg',
      },
      {
        category: '',
        start: '2019-01-10 16:00',
        end: '2019-01-10 17:00',
        color: colorSet.getIndex(7),
        icon: '/wp-content/uploads/assets/timeline/timeline4.svg',
      },
      {
        category: '',
        start: '2019-01-10 17:00',
        end: '2019-01-10 20:00',
        color: colorSet.getIndex(6),
        icon: '/wp-content/uploads/assets/timeline/timeline2.svg',
      },
      {
        category: '',
        start: '2019-01-10 20:00',
        end: '2019-01-10 20:30',
        color: colorSet.getIndex(5),
        icon: '/wp-content/uploads/assets/timeline/timeline3.svg',
      },
      {
        category: '',
        start: '2019-01-10 20:30',
        end: '2019-01-10 21:30',
        color: colorSet.getIndex(4),
        icon: '/wp-content/uploads/assets/timeline/timeline3.svg',
      },
      {
        category: '',
        start: '2019-01-10 21:30',
        end: '2019-01-10 22:00',
        color: colorSet.getIndex(3),
        icon: '/wp-content/uploads/assets/timeline/dance.svg',
      },
      {
        category: '',
        start: '2019-01-10 22:00',
        end: '2019-01-10 23:00',
        color: colorSet.getIndex(2),
        icon: '/wp-content/uploads/assets/timeline/timeline5.svg',
      },
      {
        category: '',
        start: '2019-01-10 23:00',
        end: '2019-01-11 00:00',
        color: colorSet.getIndex(1),
        icon: '/wp-content/uploads/assets/timeline/timeline6.svg',
      },
      {
        category: '',
        start: '2019-01-11 00:00',
        end: '2019-01-11 01:00',
        color: colorSet.getIndex(0),
        text: 'Damn...',
        textDisabled: false,
        icon: '/wp-content/uploads/assets/timeline/timeline7.svg',
      },
    ];

    chart.fontSize = 10;
    chart.tooltipContainer.fontSize = 10;

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.paddingRight = 25;
    categoryAxis.renderer.minGridDistance = 10;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 30, timeUnit: 'minute' };
    dateAxis.renderer.tooltipLocation = 0;
    dateAxis.renderer.line.strokeDasharray = '1,4';
    dateAxis.renderer.line.strokeOpacity = 0.5;
    dateAxis.tooltip.background.fillOpacity = 0.2;
    dateAxis.tooltip.background.cornerRadius = 5;
    dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor(
      'alternativeBackground'
    );
    dateAxis.tooltip.label.paddingTop = 7;
    dateAxis.endLocation = 0;
    dateAxis.startLocation = -0.5;

    let labelTemplate = dateAxis.renderer.labels.template;
    labelTemplate.verticalCenter = 'middle';
    labelTemplate.fillOpacity = 0.4;
    labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor(
      'background'
    );
    labelTemplate.background.fillOpacity = 1;
    labelTemplate.padding(7, 7, 7, 7);

    let series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
    series.columns.template.height = am4core.percent(15);

    series.dataFields.openDateX = 'start';
    series.dataFields.dateX = 'end';
    series.dataFields.categoryY = 'category';
    series.baseAxis = categoryAxis;
    series.columns.template.propertyFields.fill = 'color'; // get color from data
    series.columns.template.propertyFields.stroke = 'color';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.fillOpacity = 0.6;

    let imageBullet1 = series.bullets.push(new am4plugins_bullets.PinBullet());
    imageBullet1.locationX = 1;
    imageBullet1.propertyFields.stroke = 'color';
    imageBullet1.background.propertyFields.fill = 'color';
    imageBullet1.image = new am4core.Image();
    imageBullet1.image.propertyFields.href = 'icon';
    imageBullet1.image.scale = 0.5;
    imageBullet1.circle.radius = am4core.percent(100);
    imageBullet1.dy = -5;

    let textBullet = series.bullets.push(new am4charts.LabelBullet());
    textBullet.label.propertyFields.text = 'text';
    textBullet.disabled = true;
    textBullet.propertyFields.disabled = 'textDisabled';
    textBullet.label.strokeOpacity = 0;
    textBullet.locationX = 1;
    textBullet.dy = -100;
    textBullet.label.textAlign = 'middle';

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.align = 'center';
    chart.scrollbarX.width = am4core.percent(75);
    chart.scrollbarX.opacity = 0.5;

    let cursor = new am4plugins_timeline.CurveCursor();
    chart.cursor = cursor;
    cursor.xAxis = dateAxis;
    cursor.yAxis = categoryAxis;
    cursor.lineY.disabled = true;
    cursor.lineX.strokeDasharray = '1,4';
    cursor.lineX.strokeOpacity = 1;

    dateAxis.renderer.tooltipLocation2 = 0;
    categoryAxis.cursorTooltipEnabled = false;

    let label = chart.createChild(am4core.Label);
    label.text = 'Another unlucky day in the office.';
    label.isMeasured = false;
    label.y = am4core.percent(40);
    label.x = am4core.percent(50);
    label.horizontalCenter = 'middle';
    label.fontSize = 20;
  };
  radialHistogramChart = () => {
    // Create chart instance
    let chart = am4core.create('radialHistogramChart', am4charts.RadarChart);
    chart.scrollbarX = new am4core.Scrollbar();

    let data = [];

    for (var i = 0; i < 20; i++) {
      data.push({ category: i, value: Math.round(Math.random() * 100) });
    }

    chart.data = data;
    chart.radius = am4core.percent(100);
    chart.innerRadius = am4core.percent(50);

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;
    categoryAxis.renderer.grid.template.disabled = true;
    //categoryAxis.renderer.labels.template.disabled = true;
    let labelTemplate = categoryAxis.renderer.labels.template;
    labelTemplate.radius = am4core.percent(-60);
    labelTemplate.location = 0.5;
    labelTemplate.relativeRotation = 90;

    let valueAxis: any = chart.yAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.tooltip.disabled = true;

    // Create series
    let series = chart.series.push(new am4charts.RadarColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'category';
    series.columns.template.strokeWidth = 0;
    series.tooltipText = '{valueY}';
    series.columns.template.radarColumn.cornerRadius = 10;
    series.columns.template.radarColumn.innerCornerRadius = 0;

    series.tooltip.pointerOrientation = 'vertical';

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.radarColumn.states.create('hover');
    hoverState.properties.cornerRadius = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add('fill', function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.innerRadius = am4core.percent(50);
    chart.cursor.lineY.disabled = true;
  };
  polarAreaChart = () => {
    let chart = am4core.create('polarAreaChart', am4charts.RadarChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    let data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        category: i,
        value1: Math.round(Math.random() * 10),
        value2: Math.round(Math.random() * 10),
        value3: Math.round(Math.random() * 10),
        value4: Math.round(Math.random() * 10),
      });
    }

    chart.data = data;
    chart.radius = am4core.percent(100);

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.tooltipLocation = 0.5;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.horizontalCenter = 'left';
    valueAxis.renderer.grid.template.disabled = true;

    let series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.name = 'Series 1';
    series1.dataFields.categoryX = 'category';
    series1.dataFields.valueY = 'value2';
    series1.stroke = am4core.color('#ffffff');
    series1.columns.template.strokeOpacity = 0.2;
    series1.stacked = true;
    series1.sequencedInterpolation = true;
    series1.columns.template.width = am4core.percent(100);
    series1.columns.template.tooltipText = '{valueY}';

    let series2 = chart.series.push(series1.clone());
    series2.name = 'Series 2';
    series2.fill = chart.colors.next();
    series2.dataFields.valueY = 'value2';

    let series3 = chart.series.push(series1.clone());
    series3.name = 'Series 3';
    series3.fill = chart.colors.next();

    series3.dataFields.valueY = 'value3';

    let series4 = chart.series.push(series1.clone());
    series4.name = 'Series 4';
    series4.fill = chart.colors.next();
    series4.dataFields.valueY = 'value4';

    chart.seriesContainer.zIndex = -1;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.exportable = false;
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.exportable = false;

    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.xAxis = categoryAxis;
    chart.cursor.fullWidthLineX = true;
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineX.fillOpacity = 0.1;
    chart.cursor.lineX.fill = am4core.color('#000000');
  };
  lineGraphChart = () => {
    let chart = am4core.create('lineGraphChart', am4charts.XYChart);
    let data = [];
    let value = 50;
    for (var i = 0; i < 300; i++) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(i);
      value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: date, value: value });
    }

    chart.data = data;

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.dateX = 'date';
    series.tooltipText = '{value}';

    series.tooltip.pointerOrientation = 'vertical';

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;

    //chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarX = new am4core.Scrollbar();
  };
  radialLineGraph = () => {
    /* Create chart instance */
    am4core.useTheme(am4themes_dark);
    let chart = am4core.create('radialLineGraph', am4charts.RadarChart);

    let data = [];
    let value1 = 500;
    let value2 = 600;

    for (var i = 0; i < 12; i++) {
      let date = new Date();
      date.setMonth(i, 1);
      value1 -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 50);
      value2 -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 50);
      data.push({ date: date, value1: value1, value2: value2 });
    }

    chart.data = data;

    /* Create axes */
    let categoryAxis = chart.xAxes.push(new am4charts.DateAxis() as any);

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.extraMin = 0.2;
    valueAxis.extraMax = 0.2;
    valueAxis.tooltip.disabled = true;

    /* Create and configure series */
    let series1 = chart.series.push(new am4charts.RadarSeries());
    series1.dataFields.valueY = 'value1';
    series1.dataFields.dateX = 'date';
    series1.strokeWidth = 3;
    series1.tooltipText = '{valueY}';
    series1.name = 'Series 2';
    series1.bullets.create(am4charts.CircleBullet);
    series1.dataItems.template.locations.dateX = 0.5;

    let series2 = chart.series.push(new am4charts.RadarSeries());
    series2.dataFields.valueY = 'value2';
    series2.dataFields.dateX = 'date';
    series2.strokeWidth = 3;
    series2.tooltipText = '{valueY}';
    series2.name = 'Series 2';
    series2.bullets.create(am4charts.CircleBullet);
    series2.dataItems.template.locations.dateX = 0.5;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    chart.cursor = new am4charts.RadarCursor();

    chart.legend = new am4charts.Legend();
  };
  dumblePlotChat = () => {
    // am4core.useTheme(am4themes_dark);
    let chart = am4core.create('dumblePlotChat', am4charts.XYChart);

    let data = [];
    let open = 100;
    let close = 120;

    let names = [
      'Raina',
      'Demarcus',
      'Carlo',
      'Jacinda',
      'Richie',
      'Antony',
      'Amada',
      'Idalia',
      'Janella',
      'Marla',
      'Curtis',
      'Shellie',
      'Meggan',
      'Nathanael',
      'Jannette',
      'Tyrell',
      'Sheena',
      'Maranda',
      'Briana',
      'Rosa',
      'Rosanne',
      'Herman',
      'Wayne',
      'Shamika',
      'Suk',
      'Clair',
      'Olivia',
      'Hans',
      'Glennie',
    ];

    for (var i = 0; i < names.length; i++) {
      open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
      close = open + Math.round(Math.random() * 10) + 3;
      data.push({ category: names[i], open: open, close: close });
    }

    chart.data = data;
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.minGridDistance = 15;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.renderer.grid.template.strokeDasharray = '1,3';
    categoryAxis.renderer.labels.template.rotation = -90;
    categoryAxis.renderer.labels.template.horizontalCenter = 'left';
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.inside = true;

    categoryAxis.renderer.labels.template.adapter.add('dx', function (
      dx,
      target
    ) {
      return -target.maxRight / 2;
    });

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.renderer.axisFills.template.disabled = true;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = 'category';
    series.dataFields.openValueY = 'open';
    series.dataFields.valueY = 'close';
    series.tooltipText = 'open: {openValueY.value} close: {valueY.value}';
    series.sequencedInterpolation = true;
    series.fillOpacity = 0;
    series.strokeOpacity = 1;
    series.columns.template.width = 0.01;
    series.tooltip.pointerOrientation = 'horizontal';

    let openBullet: any = series.bullets.create(am4charts.CircleBullet);
    openBullet.locationY = 1;

    let closeBullet = series.bullets.create(am4charts.CircleBullet);

    closeBullet.fill = chart.colors.getIndex(4);
    closeBullet.stroke = closeBullet.fill;

    chart.cursor = new am4charts.XYCursor();

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();
  };
  chordChard = () => {
    let chart = am4core.create('chordChard', am4charts.ChordDiagram);
    chart.hiddenState.properties.opacity = 0;

    chart.data = [
      { from: 'A', to: 'D', value: 10 },
      { from: 'B', to: 'D', value: 8 },
      { from: 'B', to: 'E', value: 4 },
      { from: 'B', to: 'C', value: 2 },
      { from: 'C', to: 'E', value: 14 },
      { from: 'E', to: 'D', value: 8 },
      { from: 'C', to: 'A', value: 4 },
      { from: 'G', to: 'A', value: 7 },
      { from: 'D', to: 'B', value: 1 },
    ];

    chart.dataFields.fromName = 'from';
    chart.dataFields.toName = 'to';
    chart.dataFields.value = 'value';

    // make nodes draggable
    let nodeTemplate = chart.nodes.template;
    nodeTemplate.readerTitle = 'Click to show/hide or drag to rearrange';
    nodeTemplate.showSystemTooltip = true;
    nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
  };
  directedTreeChart = () => {
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create(
      'directedTreeChart',
      am4plugins_forceDirected.ForceDirectedTree
    );
    let networkSeries = chart.series.push(
      new am4plugins_forceDirected.ForceDirectedSeries()
    );

    chart.data = [
      {
        name: 'Core',
        children: [
          {
            name: 'First',
            children: [
              { name: 'A1', value: 100 },
              { name: 'A2', value: 60 },
            ],
          },
          {
            name: 'Second',
            children: [
              { name: 'B1', value: 135 },
              { name: 'B2', value: 98 },
            ],
          },
          {
            name: 'Third',
            children: [
              {
                name: 'C1',
                children: [
                  { name: 'EE1', value: 130 },
                  { name: 'EE2', value: 87 },
                  { name: 'EE3', value: 55 },
                ],
              },
              { name: 'C2', value: 148 },
              {
                name: 'C3',
                children: [
                  { name: 'CC1', value: 53 },
                  { name: 'CC2', value: 30 },
                ],
              },
              { name: 'C4', value: 26 },
            ],
          },
          {
            name: 'Fourth',
            children: [
              { name: 'D1', value: 415 },
              { name: 'D2', value: 148 },
              { name: 'D3', value: 89 },
            ],
          },
          {
            name: 'Fifth',
            children: [
              {
                name: 'E1',
                children: [
                  { name: 'EE1', value: 33 },
                  { name: 'EE2', value: 40 },
                  { name: 'EE3', value: 89 },
                ],
              },
              {
                name: 'E2',
                value: 148,
              },
            ],
          },
        ],
      },
    ];

    networkSeries.dataFields.value = 'value';
    networkSeries.dataFields.name = 'name';
    networkSeries.dataFields.children = 'children';
    networkSeries.nodes.template.tooltipText = '{name}:{value}';
    networkSeries.nodes.template.fillOpacity = 1;

    networkSeries.nodes.template.label.text = '{name}';
    networkSeries.fontSize = 10;

    networkSeries.links.template.strokeWidth = 1;

    let hoverState = networkSeries.links.template.states.create('hover');
    hoverState.properties.strokeWidth = 3;
    hoverState.properties.strokeOpacity = 1;

    networkSeries.nodes.template.events.on('over', function (event) {
      event.target.dataItem.childLinks.each(function (link) {
        link.isHover = true;
      });
      if (event.target.dataItem.parentLink) {
        event.target.dataItem.parentLink.isHover = true;
      }
    });

    networkSeries.nodes.template.events.on('out', function (event) {
      event.target.dataItem.childLinks.each(function (link) {
        link.isHover = false;
      });
      if (event.target.dataItem.parentLink) {
        event.target.dataItem.parentLink.isHover = false;
      }
    });
  };

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  ngOnInit(): void {
    this.stackedData = [
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
  }
}
