import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';
import { MatDialogModule } from '@angular/material/dialog';
import {
  IApiResponce,
  IDropdownResponse,
} from '../../../core/models/models.interfece';
import { LayoutService } from '../../layout/layout.service';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { Store } from '@ngrx/store';
import { PROJECT_ACTIONS } from '../../../store/project/project.action';

@Component({
  selector: 'app-assign-project',
  standalone: true,
  imports: [SelectDropdownComponent, ReactiveFormsModule, MatDialogModule],
  templateUrl: './assign-project.component.html',
  styleUrl: './assign-project.component.scss',
})
export class AssignProjectComponent {
  store = inject(Store);
  formBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  assignProjectForm!: FormGroup;
  dropdownData: IDropdownResponse | undefined;

  private _layoutService: LayoutService = inject(LayoutService);

  ngOnInit(): void {
    this.initForm();
    this.getDropdownData();
  }

  initForm() {
    this.assignProjectForm = this.formBuilder.group({
      projectId: new FormControl(null, Validators.required),
      assignTo: new FormControl([], Validators.required),
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
      error: (err: any) => {},
    };

    this._layoutService.getDropdownData().subscribe(observer);
  }

  navigateToList(): void {
    this.router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.LIST}`
    );
  }

  submitForm(): void {
    if (this.assignProjectForm.invalid) return;

    const payload = this.prepareRequest();
    const projectId = this.assignProjectForm.value.projectId;

    this.store.dispatch(
      PROJECT_ACTIONS.ASSIGN_PROJECT.LOAD({ id: projectId, payload })
    );
  }

  prepareRequest() {
    const formData = this.assignProjectForm.getRawValue();
    const responseBody = {
      AssignedTo: formData.assignTo,
    };

    return responseBody;
  }
}
