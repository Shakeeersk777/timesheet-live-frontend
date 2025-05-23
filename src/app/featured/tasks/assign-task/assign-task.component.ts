import { Component, inject } from '@angular/core';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IDropdownResponse,
  IApiResponce,
  IProjectAssignedDropdownResponse,
} from '../../../core/models/models.interfece';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { LayoutService } from '../../layout/layout.service';
import { IAssignTaskPayload } from '../task.modal';
import { Store } from '@ngrx/store';
import { TASK_ACTIONS } from '../../../store/task/task.action';

@Component({
  selector: 'app-assign-task',
  standalone: true,
  imports: [SelectDropdownComponent, ReactiveFormsModule],
  templateUrl: './assign-task.component.html',
  styleUrl: './assign-task.component.scss',
})
export class AssignTaskComponent {
  store = inject(Store);
  formBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  assignProjectForm!: FormGroup;
  dropdownData: IDropdownResponse | undefined;
  projectAssignedDropdown: IProjectAssignedDropdownResponse | undefined;
  private _layoutService: LayoutService = inject(LayoutService);

  ngOnInit(): void {
    this.initForm();
    this.getDropdownData();

    this.assignProjectForm.controls['projectId'].valueChanges.subscribe(
      (id: string) => {
        if (id) this.getProjectAssignedDropdown(id);
      }
    );
  }

  initForm() {
    this.assignProjectForm = this.formBuilder.group({
      projectId: new FormControl(null, Validators.required),
      taskId: new FormControl(null, Validators.required),
      assignTo: new FormControl([], Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
    });
  }

  getDropdownData(): void {
    const observer = {
      next: (res: IApiResponce) => {
        if (!res) return;

        this.dropdownData = res._data;

        if (!res._status) {
          this._layoutService.openSnackBar(res._msg, res._status);
          return;
        }
      },
      error: (err: any) => this._layoutService.onError(err),
    };

    this._layoutService.getDropdownData().subscribe(observer);
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

  navigateToList(): void {
    this.router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.LIST}`
    );
  }

  submitForm(): void {
    if (this.assignProjectForm.invalid) return;

    const taskId = this.assignProjectForm.controls['taskId'].value;
    const payload = this.prepareRequest();
    this.store.dispatch(TASK_ACTIONS.ASSIGN_TASK.LOAD({ id: taskId, payload }));
  }

  prepareRequest(): IAssignTaskPayload {
    const formData = this.assignProjectForm.getRawValue();
    return {
      AssignTo: formData.assignTo,
      StartDate: formData.startDate,
      EndDate: formData.endDate,
    };
  }
}
