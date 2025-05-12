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
import { TaskService } from '../task.service';
import { ITask, ITaskUpdatePayload } from '../task.modal';
import { formatDate } from '../../../core/utils/common-functions';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, SelectDropdownComponent],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent {
  private router: Router = inject(Router);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private _layoutService: LayoutService = inject(LayoutService);
  private _taskService: TaskService = inject(TaskService);
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
    const onSuccess = (res: IApiResponce): void => {
      if (!res) return;

      this.taskOverviewData = res._data;

      if (!res._status) {
        this._layoutService.openSnackBar(res._msg, res._status);
        return;
      }

      if (!this.taskOverviewData) return;
      this.getProjectAssignedDropdown(this.taskOverviewData.ProjectId);
      this.setOverview();
    };

    const onError = (error: any) => {
      this._layoutService.onError(error);
    };

    const oberver = {
      next: onSuccess,
      error: onError,
    };

    this._taskService.getTaskOverview(taskId).subscribe(oberver);
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

    this._layoutService.getProjectAssignedDropdown(projectId).subscribe(observer);
  }

  setOverview() {
    const formData = {
      taskId: this.taskOverviewData?.TaskId ?? null,
      taskName: this.taskOverviewData?.TaskName ?? '',
      allocateHours: this.taskOverviewData?.TotalAllocatedHours ?? 0,
      totalWorkedHours: this.taskOverviewData?.TotalWorkedHours ?? 0,
      startDate: this.taskOverviewData?.StartDate ? formatDate(this.taskOverviewData.StartDate) : null,
      endDate: this.taskOverviewData?.EndDate ? formatDate(this.taskOverviewData.EndDate) : null,
      completedDate: this.taskOverviewData?.CompletedDate ? formatDate(this.taskOverviewData.CompletedDate) : null,
      assignedTo: this.taskOverviewData?.AssignedEmployeesList ?? [],
      taskStatus: this.taskOverviewData?.TaskStatus ?? false,
    };

    this.editForm.patchValue(formData);
  }

  submitForm(): void {
    if (this.editForm.invalid) return;

    const payload = this.prepareRequest();

    const observer = {
      next: (res: IApiResponce) => {
        this._layoutService.openSnackBar(res._msg, res._status);
        if (res._status) this.navigateToList();
      },
      error: (err: any) => {},
    };

    const taskId = this.editForm.controls['taskId'].value;
    this._taskService.updateTask(taskId, payload).subscribe(observer);
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
