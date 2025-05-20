import { Component, inject, OnInit } from '@angular/core';
import { ActivityOverviewComponent } from '../pages/activity-overview/activity-overview.component';
import { IActivityOverviewWidget } from '../dashboard.modal';
import { selectActivityOverview } from '../../../store/dashboard/dashboard.selector';
import { Store } from '@ngrx/store';
import { DASHBOARD_ACTIONS } from '../../../store/dashboard/dashboard.action';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ActivityOverviewComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  store = inject(Store);
  activityOverview$ = this.store.select(selectActivityOverview);

  activityOverviewData!: IActivityOverviewWidget;

  ngOnInit(): void {
    this.getActivityOverview();

    this.activityOverview$.subscribe((res) => {
      if (!res) return;
      console.log({ res });

      this.activityOverviewData = res;
    });
  }

  getActivityOverview() {
    this.store.dispatch(DASHBOARD_ACTIONS.ACTIVITY_OVERVIEW.LOAD());
  }
}
