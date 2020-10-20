import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PiechartComponent } from './amchart/piechart/piechart.component';
import { ChartListComponent } from './amchart/chart-list/chart-list.component';
import { StackedColumnChartComponent } from './amchart/stacked-column-chart/stacked-column-chart.component';
import { LineChartsComponent } from './amchart/line-charts/line-charts.component';
const routes: Routes = [
  {
    path: 'piechart',
    component: PiechartComponent,
  },
  { path: 'stackedColumnChart', component: StackedColumnChartComponent },
  { path: 'chartlist', component: ChartListComponent },
  { path: 'linecharts', component: LineChartsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
