import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IActivityOverviewWidget } from '../../dashboard.modal';

@Component({
  selector: 'app-activity-overview',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './activity-overview.component.html',
  styleUrl: './activity-overview.component.scss',
})
export class ActivityOverviewComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  chartType: ChartType = 'pie';

  chartData: ChartConfiguration['data'] = {
    labels: ['Employees', 'Projects'],
    datasets: [
      {
        label: 'Activity Overview',
        data: [0, 0], // Initialized with default
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgb(75, 192, 192)', 'rgb(54, 162, 235)'],
        borderWidth: 1,
      },
    ],
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  private _activityOverviewData!: IActivityOverviewWidget;

  @Input()
  set activityOverviewData(data: IActivityOverviewWidget) {
    this._activityOverviewData = data;
    this.updateChartData();
  }

  get activityOverviewData(): IActivityOverviewWidget {
    return this._activityOverviewData;
  }

  private updateChartData(): void {
    if (!this._activityOverviewData) return;

    const { employeeCount = 0, projectCount = 0 } = this._activityOverviewData;
    this.chartData.datasets[0].data = [employeeCount, projectCount];

    if (this.chart) {
      this.chart.update();
    }
  }
}
