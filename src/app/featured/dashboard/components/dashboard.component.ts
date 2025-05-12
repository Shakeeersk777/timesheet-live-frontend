import { Component, inject, OnInit } from '@angular/core';
import { ActivityOverviewComponent } from '../pages/activity-overview/activity-overview.component';
import { DashboardService } from '../dashboard.service';
import { IActivityOverviewWidget } from '../dashboard.modal';
import { LayoutService } from '../../layout/layout.service';
import { IApiResponce } from '../../../core/models/models.interfece';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ActivityOverviewComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private _dashboardService: DashboardService = inject(DashboardService);
  activityOverviewData!: IActivityOverviewWidget;
  private _layoutService: LayoutService = inject(LayoutService);

  ngOnInit(): void {
    this.getActivityOverview();
  }

  getActivityOverview() {
    const onSuccess = (res: IApiResponce) => {
      if (!res._status) {
        this._layoutService.openSnackBar(res._msg, res._status);
      }

      this.activityOverviewData = res._data;
    };

    const observer = {
      next: onSuccess,
      error: (err: any) => this._layoutService.onError(err),
    };

    this._dashboardService.getActivityOverview().subscribe(observer);
  }
}
