import { Component, inject } from '@angular/core';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import {
  IApiResponce,
  IProjectDropdown,
} from '../../../core/models/models.interfece';
import { TaskService } from '../task.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from '../../layout/layout.service';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';
import { ICreateTaskPayload } from '../task.modal';
import { Store } from '@ngrx/store';
import { TASK_ACTIONS } from '../../../store/task/task.action';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, SelectDropdownComponent],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  store = inject(Store);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private _layoutService: LayoutService = inject(LayoutService);
  createForm!: FormGroup;
  projectsList: IProjectDropdown[] = [];

  ngOnInit(): void {
    this.initForm();
    this.getDropdownData();
  }

  initForm() {
    this.createForm = this.formBuilder.group({
      projectId: new FormControl(null),
      taskName: new FormControl('', [Validators.required]),
      allocateHours: new FormControl('', [Validators.required]),
    });
  }

  prepareRequest() {
    const formData = this.createForm.getRawValue();

    const responseBody: ICreateTaskPayload = {
      ProjectId: formData.projectId,
      TaskName: formData.taskName,
      TotalAllocatedHours: formData.allocateHours,
    };

    return responseBody;
  }

  navigateToList() {
    this.router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.LIST}`
    );
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

  submitForm(): void {
    if (this.createForm.invalid) return;
    const payload = this.prepareRequest();
    this.store.dispatch(TASK_ACTIONS.ADD_TASK.LOAD({ payload }));
  }
}
