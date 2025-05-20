import { Component, inject } from '@angular/core';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IApiResponce,
  IProjectAssignedDropdownResponse,
} from '../../../core/models/models.interfece';
import { LayoutService } from '../../layout/layout.service';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { ITask } from '../task.modal';
import { formatDate } from '../../../core/utils/common-functions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTask } from '../../../store/task/task.selector';
import { TASK_ACTIONS } from '../../../store/task/task.action';

@Component({
  selector: 'app-task-overview',
  standalone: true,
  imports: [SelectDropdownComponent, ReactiveFormsModule],
  templateUrl: './task-overview.component.html',
  styleUrl: './task-overview.component.scss',
})
export class TaskOverviewComponent {
  store = inject(Store);
  task$: Observable<ITask> = this.store.select(selectTask);

  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private _layoutService: LayoutService = inject(LayoutService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  overviewForm!: FormGroup;
  taskOverviewData: ITask | null | undefined;
  projectAssignedDropdown: IProjectAssignedDropdownResponse | undefined;

  ngOnInit(): void {
    this.initForm();

    this.activatedRoute.paramMap.subscribe((params) => {
      const taskId = params.get('id');

      if (!taskId) return;
      this.geTaskOverview(taskId);
    });

    this.task$.subscribe((res) => {
      if (!res) return;
      this.taskOverviewData = res;
      this.setOverview();
    });
  }

  initForm() {
    this.overviewForm = this.formBuilder.group({
      taskId: new FormControl(null),
      projectId: new FormControl(null),
      taskName: new FormControl(''),
      allocateHours: new FormControl(''),
      totalWorkedHours: new FormControl(0),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      completedDate: new FormControl(null),
      assignedTo: new FormControl([]),
      taskStatus: new FormControl({ value: false, disabled: true }),
      createdDate: new FormControl(null),
      lastUpdated: new FormControl(null),
    });
  }

  getProjectAssignedDropdown(projectId: string): void {
    const observer = {
      next: (res: IApiResponce) => {
        if (!res) return;

        this.projectAssignedDropdown = res._data;

        if (!res._status) {
          this._layoutService.openSnackBar(res._msg, res._status);
          return;
        }
      },
      error: (err: any) => this._layoutService.onError(err),
    };

    this._layoutService
      .getProjectAssignedDropdown(projectId)
      .subscribe(observer);
  }

  geTaskOverview(taskId: string) {
    this.store.dispatch(TASK_ACTIONS.LOAD_TASK.LOAD({ id: taskId }));
  }

  setOverview() {
    const formData = {
      taskId: this.taskOverviewData?.TaskId || null,
      projectId: this.taskOverviewData?.ProjectId || null,
      taskName: this.taskOverviewData?.TaskName || '',
      allocateHours: this.taskOverviewData?.TotalAllocatedHours || '',
      totalWorkedHours: this.taskOverviewData?.TotalWorkedHours || 0,
      startDate: this.taskOverviewData?.StartDate
        ? formatDate(this.taskOverviewData.StartDate)
        : null,
      endDate: this.taskOverviewData?.EndDate
        ? formatDate(this.taskOverviewData.EndDate)
        : null,
      completedDate: this.taskOverviewData?.CompletedDate
        ? formatDate(this.taskOverviewData.CompletedDate)
        : null,
      assignedTo: this.taskOverviewData?.AssignedEmployeesList || [],
      taskStatus: this.taskOverviewData?.TaskStatus ?? false,
      createdDate: this.taskOverviewData?.CreatedDate
        ? formatDate(this.taskOverviewData.CreatedDate)
        : null,
      lastUpdated: this.taskOverviewData?.LastUpdated
        ? formatDate(this.taskOverviewData.LastUpdated)
        : null,
    };
    this.overviewForm.patchValue(formData);
  }

  navigateToList() {
    this.router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.LIST}`
    );
  }
}
