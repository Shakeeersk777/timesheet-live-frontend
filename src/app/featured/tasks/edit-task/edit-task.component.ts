import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IApiResponce,
  IProjectAssignedDropdownResponse,
  IProjectDropdown,
} from '../../../core/models/models.interfece';
import { LayoutService } from '../../layout/layout.service';
import { ITask, ITaskUpdatePayload } from '../task.modal';
import { formatDate } from '../../../core/utils/common-functions';
import { Store } from '@ngrx/store';
import { TASK_ACTIONS } from '../../../store/task/task.action';
import { Observable } from 'rxjs/internal/Observable';
import { selectTask } from '../../../store/task/task.selector';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, SelectDropdownComponent],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent {
  store = inject(Store);
  task$: Observable<ITask> = this.store.select(selectTask);

  private router: Router = inject(Router);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private _layoutService: LayoutService = inject(LayoutService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  editForm!: FormGroup;
  projectsList: IProjectDropdown[] = [];
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
    this.editForm = this.formBuilder.group({
      taskId: new FormControl({ value: null, disabled: true }),
      taskName: new FormControl(''),
      allocateHours: new FormControl(''),
      totalWorkedHours: new FormControl({ value: 0, disabled: true }),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      completedDate: new FormControl(null),
      assignedTo: new FormControl([]),
      taskStatus: new FormControl(false),
    });
  }

  getDropdownData(): void {
    const observer = {
      next: (res: IApiResponce) => {
        if (!res._status) {
          this._layoutService.openSnackBar(res._msg, res._status);
          this.projectsList = [];
          return;
        }

        this.projectsList = res._data?.projects || [];
      },
      error: (err: any) => {},
    };

    this._layoutService.getDropdownData().subscribe(observer);
  }

  geTaskOverview(taskId: string) {
    this.store.dispatch(TASK_ACTIONS.LOAD_TASK.LOAD({ id: taskId }));
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

  setOverview() {
    const formData = {
      taskId: this.taskOverviewData?.TaskId ?? null,
      taskName: this.taskOverviewData?.TaskName ?? '',
      allocateHours: this.taskOverviewData?.TotalAllocatedHours ?? 0,
      totalWorkedHours: this.taskOverviewData?.TotalWorkedHours ?? 0,
      startDate: this.taskOverviewData?.StartDate
        ? formatDate(this.taskOverviewData.StartDate)
        : null,
      endDate: this.taskOverviewData?.EndDate
        ? formatDate(this.taskOverviewData.EndDate)
        : null,
      completedDate: this.taskOverviewData?.CompletedDate
        ? formatDate(this.taskOverviewData.CompletedDate)
        : null,
      assignedTo: this.taskOverviewData?.AssignedEmployeesList ?? [],
      taskStatus: this.taskOverviewData?.TaskStatus ?? false,
    };

    this.editForm.patchValue(formData);
  }

  submitForm(): void {
    if (this.editForm.invalid) return;

    const payload = this.prepareRequest();
    const taskId = this.editForm.controls['taskId'].value;
    this.store.dispatch(TASK_ACTIONS.UPDATE_TASK.LOAD({ id: taskId, payload }));
  }

  prepareRequest() {
    const formData = this.editForm.getRawValue();

    const responseBody: ITaskUpdatePayload = {
      TaskName: formData.taskName,
      TaskStatus: formData.taskStatus,
      TotalAllocatedHours: formData.allocateHours,
      StartDate: formData.startDate ?? null,
      EndDate: formData.endDate ?? null,
      AssignedTo: formData.assignedTo || [], // Ensure this is an array of strings
      CompletedDate: formData.completedDate
        ? new Date(formData.completedDate)
        : undefined, // Optional field
    };

    return responseBody;
  }

  navigateToList() {
    this.router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.LIST}`
    );
  }
}
