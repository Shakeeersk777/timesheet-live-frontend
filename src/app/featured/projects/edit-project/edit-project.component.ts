import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';
import { ProjectService } from '../project.service';
import { IProject, IUpdateProject } from '../project.modal';
import {
  IApiResponce,
  IDropdownResponse,
} from '../../../core/models/models.interfece';
import { IEditEmployee } from '../../employees/employee.model';
import { LayoutService } from '../../layout/layout.service';
import { formatDate } from '../../../core/utils/common-functions';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [ReactiveFormsModule, SelectDropdownComponent],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss',
})
export class EditProjectComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private _projectService: ProjectService = inject(ProjectService);
  private _layoutService: LayoutService = inject(LayoutService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  editForm!: FormGroup;
  projectOverviewData!: IProject;
  dropdownData: IDropdownResponse | undefined;

  ngOnInit(): void {
    this.initForm();
    this.getDropdownData();

    this.activatedRoute.paramMap.subscribe((params) => {
      const projectId = params.get('id');

      if (projectId) {
        this.getProjectOverview(projectId);
      }
    });
  }

  initForm() {
    this.editForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      status: [false],
      startDate: [null],
      totalAllocatedHours: [null],
      totalCompletedHours: [0],
      assignedTo: [[]],
      completedDate: [null],
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

  getProjectOverview(projectId: string): void {
    const onSuccess = (res: IApiResponce): void => {
      if (!res) return;

      this.projectOverviewData = res._data;

      if (!res._status) {
        this._layoutService.openSnackBar(res._msg, res._status);
        return;
      }

      this.setOverview();
    };

    const onError = (error: any): void => {
      this._layoutService.onError(error);
    };

    const observer = {
      next: onSuccess,
      error: onError,
    };

    this._projectService.getProjectOverview(projectId).subscribe(observer);
  }

  setOverview() {
    const formData = {
      id: this.projectOverviewData?.ProjectId ?? '',
      name: this.projectOverviewData?.ProjectName ?? '',
      status: this.projectOverviewData?.ProjectStatus ?? false,
      startDate: this.projectOverviewData?.StartDate ? formatDate(this.projectOverviewData.StartDate) : null,
      totalAllocatedHours: this.projectOverviewData?.TotalAllocatedHours ?? null,
      totalCompletedHours: this.projectOverviewData?.TotalCompletedHours ?? 0,
      assignedTo: this.projectOverviewData?.AssignedToList ?? [],
      completedDate: this.projectOverviewData?.CompletedDate ? formatDate(this.projectOverviewData.CompletedDate) : null,
    };

    this.editForm.patchValue(formData);
  }

  prepareRequest() {
    const formData = this.editForm.getRawValue();

    const responseBody: IUpdateProject = {
      ProjectName: formData.name || '',
      ProjectStatus: formData.status ?? false,
      StartDate: formData.startDate || null,
      TotalAllocatedHours: formData.totalAllocatedHours ?? null,
      TotalCompletedHours: formData.totalCompletedHours ?? 0,
      AssignedTo: formData.assignedTo || [],
      CompletedDate: formData.completedDate || null,
    };

    return responseBody;
  }

  navigateToList() {
    this.router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.LIST}`
    );
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

    this._projectService
      .updateProject(this.projectOverviewData.ProjectId, payload)
      .subscribe(observer);
  }

  onBack() {
    this.router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.LIST}`
    );
  }
}
