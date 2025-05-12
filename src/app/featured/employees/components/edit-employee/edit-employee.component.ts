import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IApiResponce } from '../../../../core/models/models.interfece';
import { ROUTE_NAMES } from '../../../../shared/enums/routes.enum';
import { LayoutService } from '../../../layout/layout.service';
import { IEmployee, IEditEmployee } from '../../employee.model';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private _employeeService: EmployeeService = inject(EmployeeService);
  private _layoutService: LayoutService = inject(LayoutService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  editForm!: FormGroup;
  employeeOverviewData!: IEmployee;

  ngOnInit(): void {
    this.initForm();

    this.activatedRoute.paramMap.subscribe((params) => {
      const empId = params.get('id');

      if (empId) {
        this.getEmployeeOverview(empId);
      }
    });
  }

  initForm() {
    this.editForm = this.formBuilder.group({
      id: new FormControl({ value: '', disabled: true }, [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      activeStatus: new FormControl(false, [Validators.required]),
    });
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
      activeStatus: this.employeeOverviewData.ActiveStatus,
    };

    this.editForm.patchValue(formData);
  }

  prepareRequest() {
    const formData = this.editForm.getRawValue();

    const responseBody: IEditEmployee = {
      EmployeeId: formData.id,
      FirstName: formData.firstName,
      LastName: formData.lastName,
      Email: formData.email,
      ActiveStatus: formData.activeStatus,
    };

    return responseBody;
  }

  navigateToList() {
    this.router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.EMPLOYEE.BASE}/${ROUTE_NAMES.EMPLOYEE.LIST}`
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

    this._employeeService
      .updateEmployee(this.employeeOverviewData.EmployeeId, payload)
      .subscribe(observer);
  }
}
