import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ICreateProject } from '../project.modal';
import { Store } from '@ngrx/store';
import { selectProjectsLoading } from '../../../store/project/project.selector';
import { PROJECT_ACTIONS } from '../../../store/project/project.action';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
})
export class CreateProjectComponent {
  store = inject(Store);
  router = inject(Router);
  loading$ = this.store.select(selectProjectsLoading);

  private formBuilder = inject(FormBuilder);
  createEProjectForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createEProjectForm = this.formBuilder.group({
      projectName: new FormControl('', [Validators.required]),
      allocateHours: new FormControl('', [Validators.required]),
    });
  }

  navigateToList() {
    this.router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.LIST}`
    );
  }

  submitForm(): void {
    if (this.createEProjectForm.invalid) return;

    const payload = this.prepareRequest();
    this.store.dispatch(PROJECT_ACTIONS.ADD_PROJECT.LOAD({ payload }));
  }

  prepareRequest() {
    const formData = this.createEProjectForm.getRawValue();
    const responseBody: ICreateProject = {
      ProjectName: formData.projectName,
      TotalAllocatedHours: formData.allocateHours,
    };

    return responseBody;
  }
}
