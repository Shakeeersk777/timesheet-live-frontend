import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { IApiResponce } from '../../../core/models/models.interfece';
import { LayoutService } from '../../layout/layout.service';
import { EmployeeService } from '../employee.service';
import { ICreateEmployee, IEditEmployee, IEmployee } from '../employee.model';

@Component({
  selector: 'app-create-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-edit-employee.component.html',
  styleUrl: './create-edit-employee.component.scss',
})
export class CreateEditEmployeeComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private _employeeService: EmployeeService = inject(EmployeeService);
  private _layoutService: LayoutService = inject(LayoutService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  createEditForm!: FormGroup;
  isEditMode: boolean = false;
  employeeOverviewData!: IEmployee;

  ngOnInit(): void {
    this.initForm();

    this.activatedRoute.paramMap.subscribe((params) => {
      const empId = params.get('id');
      this.isEditMode = !!empId;

      if (this.isEditMode && empId) {
        this.getEmployeeOverview(empId);
      }
    });
  }

  initForm() {
    this.createEditForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
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

    const onError = (error: any): void => {};

    const observer = {
      next: onSuccess,
      error: onError,
    };

    this._employeeService.getEmployeeOverview(empId).subscribe(observer);
  }

  setOverview() {
    const formData = {
      name: this.employeeOverviewData.EmpName,
      email: this.employeeOverviewData.Email,
      password: this.employeeOverviewData.Password,
    };

    this.createEditForm.patchValue(formData);
  }

  prepareRequest() {
    const formData = this.createEditForm.getRawValue();

    const responseBody: ICreateEmployee | IEditEmployee = {
      EmpName: formData.name,
      Email: formData.email,
      Password: formData.password,
    };

    return responseBody;
  }

  navigateToList() {
    this.router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.EMPLOYEE.BASE}/${ROUTE_NAMES.EMPLOYEE.LIST}`
    );
  }

  submitForm(): void {
    if (this.createEditForm.invalid) return;

    const payload = this.prepareRequest();

    const observer = {
      next: (res: IApiResponce) => {
        this._layoutService.openSnackBar(res._msg, res._status);
        if (res._status) this.navigateToList();
      },
      error: (err: any) => {},
    };

    if (this.isEditMode) {
      this._employeeService
        .updateEmployee(this.employeeOverviewData.EmpId, payload)
        .subscribe(observer);
    } else {
      this._employeeService.addEmployee(payload).subscribe(observer);
    }
  }
}
