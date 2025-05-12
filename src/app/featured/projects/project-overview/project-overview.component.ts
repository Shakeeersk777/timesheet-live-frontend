import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  IApiResponce,
  IDropdownResponse,
} from '../../../core/models/models.interfece';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { LayoutService } from '../../layout/layout.service';
import { ProjectService } from '../project.service';
import { IProject } from '../project.modal';
import { formatDate } from '../../../core/utils/common-functions';

@Component({
  selector: 'app-project-overview',
  standalone: true,
  imports: [ReactiveFormsModule, SelectDropdownComponent],
  templateUrl: './project-overview.component.html',
  styleUrl: './project-overview.component.scss',
})
export class ProjectOverviewComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private _projectService: ProjectService = inject(ProjectService);
  private _layoutService: LayoutService = inject(LayoutService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  overviewForm!: FormGroup;
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
    this.overviewForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      status: new FormControl({ value: false, disabled: true }),
      startDate: [null],
      totalAllocatedHours: [null],
      totalCompletedHours: [0],
      assignedTo: [[]],
      completedDate: [null],
      createdDate: new FormControl(''),
      lastUpdated: [null],
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
      startDate: this.projectOverviewData?.StartDate
        ? formatDate(this.projectOverviewData.StartDate)
        : null,
      totalAllocatedHours:
        this.projectOverviewData?.TotalAllocatedHours ?? null,
      totalCompletedHours: this.projectOverviewData?.TotalCompletedHours ?? 0,
      assignedTo: this.projectOverviewData?.AssignedToList ?? [],
      completedDate: this.projectOverviewData?.CompletedDate
        ? formatDate(this.projectOverviewData.CompletedDate)
        : null,
      createdDate: this.projectOverviewData?.CreatedDate
        ? formatDate(this.projectOverviewData.CreatedDate)
        : null,
      lastUpdated: this.projectOverviewData?.LastUpdated
        ? formatDate(this.projectOverviewData.LastUpdated)
        : null,
    };

    this.overviewForm.patchValue(formData);
  }

  navigateToList() {
    this.router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.LIST}`
    );
  }
}
