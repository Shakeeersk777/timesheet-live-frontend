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
import { IProject } from '../project.modal';
import { formatDate } from '../../../core/utils/common-functions';
import {
  selectProject,
  selectProjectsLoading,
} from '../../../store/project/project.selector';
import { Store } from '@ngrx/store';
import { PROJECT_ACTIONS } from '../../../store/project/project.action';

@Component({
  selector: 'app-project-overview',
  standalone: true,
  imports: [ReactiveFormsModule, SelectDropdownComponent],
  templateUrl: './project-overview.component.html',
  styleUrl: './project-overview.component.scss',
})
export class ProjectOverviewComponent {
  store = inject(Store);
  projects$ = this.store.select(selectProject);
  loading$ = this.store.select(selectProjectsLoading);

  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
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

    this.projects$.subscribe((res: IProject) => {
      if (!res) return;

      this.projectOverviewData = res;
      this.setOverview();
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
    this.store.dispatch(PROJECT_ACTIONS.LOAD_PROJECT.LOAD({ id: projectId }));
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
