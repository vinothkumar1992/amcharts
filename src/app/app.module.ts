import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PiechartComponent } from './amchart/piechart/piechart.component';
import { StackedColumnChartComponent } from './amchart/stacked-column-chart/stacked-column-chart.component';
import { ChartListComponent } from './amchart/chart-list/chart-list.component';
import { LineChartsComponent } from './amchart/line-charts/line-charts.component';

@NgModule({
  declarations: [AppComponent, PiechartComponent, StackedColumnChartComponent, ChartListComponent, LineChartsComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
