import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  IDropdownResponse,
  IApiResponce,
} from '../../../../core/models/models.interfece';
import { SelectDropdownComponent } from '../../../../shared/components/select-dropdown/select-dropdown.component';
import { ROUTE_NAMES } from '../../../../shared/enums/routes.enum';
import { LayoutService } from '../../../layout/layout.service';
import { IEmployee } from '../../employee.model';
import { EmployeeService } from '../../employee.service';
import { formatDate } from '../../../../core/utils/common-functions';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-employee-overview',
  standalone: true,
  imports: [ReactiveFormsModule, SelectDropdownComponent],
  templateUrl: './employee-overview.component.html',
  styleUrl: './employee-overview.component.scss',
})
export class EmployeeOverviewComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private _employeeService: EmployeeService = inject(EmployeeService);
  private _layoutService: LayoutService = inject(LayoutService);
  private _authService = inject(AuthService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  overviewForm!: FormGroup;
  employeeOverviewData!: IEmployee;
  dropdownData: IDropdownResponse | undefined;

  ngOnInit(): void {
    this.initForm();
    this.getDropdownData();

    this.activatedRoute.paramMap.subscribe((params) => {
      const empId = params.get('id');

      if (empId) {
        this.getEmployeeOverview(empId);
      }
    });
  }

  initForm() {
    this.overviewForm = this.formBuilder.group({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      activeStatus: new FormControl({ value: false, disabled: true }),
      assignedProjects: new FormControl(null),
      createdDate: new FormControl(''),
      lastUpdated: new FormControl(''),
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

  getEmployeeOverview(empId: string): void {
    const onSuccess = (res: IApiResponce): void => {
      if (!res) return;

      this.employeeOverviewData = res._data;

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

    this._employeeService.getEmployeeOverview(empId).subscribe(observer);
  }

  setOverview() {
    const formData = {
      id: this.employeeOverviewData.EmployeeId,
      firstName: this.employeeOverviewData.FirstName,
      lastName: this.employeeOverviewData.LastName,
      email: this.employeeOverviewData.Email,
      password: this.employeeOverviewData.Password,
      activeStatus: this.employeeOverviewData.ActiveStatus,
      assignedProjects: this.employeeOverviewData.AssignedProjectsList,
      createdDate: this.employeeOverviewData.CreatedDate
        ? formatDate(this.employeeOverviewData.CreatedDate)
        : null,
      lastUpdated: this.employeeOverviewData.LastUpdate
        ? formatDate(this.employeeOverviewData.LastUpdate)
        : null,
    };

    this.overviewForm.patchValue(formData);
  }

  navigateToList() {
    const currentLoggedUser = this._authService.getCurrentUser();
    const isAdmin = currentLoggedUser?.isAdmin;

    if (isAdmin) {
      this.router.navigateByUrl(
        `${ROUTE_NAMES.APP}/${ROUTE_NAMES.EMPLOYEE.BASE}/${ROUTE_NAMES.EMPLOYEE.LIST}`
      );
    } else {
      this.router.navigateByUrl(ROUTE_NAMES.APP);
    }
  }
}
