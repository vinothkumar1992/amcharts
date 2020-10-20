import {
  Component,
  Inject,
  OnInit,
  Input,
  NgZone,
  PLATFORM_ID,
} from '@angular/core';
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
  selector: 'app-stacked-column-chart',
  templateUrl: './stacked-column-chart.component.html',
  styleUrls: ['./stacked-column-chart.component.scss'],
})
export class StackedColumnChartComponent implements OnInit {
  @Input('x') id: string;
  @Input('data') data: any;
  title = 'AMcharts';
  private chart: am4charts.XYChart;
  private chart1: am4charts.XYChart;
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
    this.stackedColumnChart();
    // chart1 code goes in here
    //
  }
  stackedColumnChart = () => {
    // Create chart instance
    let chart = am4core.create(this.id, am4charts.XYChart);

    // Add data
    chart.data = this.data;

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    // Create series
    function createSeries(field, name) {
      // Set up series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.dataFields.valueY = field;
      series.dataFields.categoryX = 'year';
      series.sequencedInterpolation = true;

      // Make it stacked
      series.stacked = true;

      // Configure columns
      series.columns.template.width = am4core.percent(60);
      series.columns.template.tooltipText =
        '[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}';

      // Add label
      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = '{valueY}';
      labelBullet.locationY = 0.5;
      labelBullet.label.hideOversized = true;

      return series;
    }

    createSeries('europe', 'Europe');
    createSeries('namerica', 'North America');
    createSeries('asia', 'Asia-Pacific');
    createSeries('lamerica', 'Latin America');
    createSeries('meast', 'Middle-East');
    createSeries('africa', 'Africa');

    // Legend
    chart.legend = new am4charts.Legend();
  };
  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
      if (this.chart1) {
        this.chart1.dispose();
      }
    });
  }
  ngOnInit(): void {}
}
