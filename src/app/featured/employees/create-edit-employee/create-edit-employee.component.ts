import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { SNACKBAR_RESPONSE_TYPE } from '../../../core/constants/constants';
import { IApiResponce } from '../../../core/models/models.interfece';
import { LayoutService } from '../../layout/layout.service';
import { EmployeeService } from '../employee.service';
import { ICreateEmployee } from '../employee.model';

@Component({
  selector: 'app-create-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-edit-employee.component.html',
  styleUrl: './create-edit-employee.component.scss',
})
export class CreateEditEmployeeComponent implements OnInit {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);
  private _employeeService: EmployeeService = inject(EmployeeService);
  private _layoutService: LayoutService = inject(LayoutService);
  createEditForm!: FormGroup;

  navigateToList() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.EMPLOYEE.BASE}/${ROUTE_NAMES.EMPLOYEE.LIST}`
    );
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createEditForm = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  addEmployee(): void {
    const onSuccess = (res: IApiResponce): void => {
      if (!res) return;

      this._layoutService.openSnackBar(res?._msg, res._status);
      if (res._status) {
        this.navigateToList();
      } else {
      }
    };

    const onError = (error: any): void => {};

    const observer = {
      next: onSuccess,
      error: onError,
    };

    this._employeeService
      .addEmployee(this.prepareRequest())
      .subscribe(observer);
  }

  prepareRequest() {
    const formData = this.createEditForm.getRawValue();

    const responseBody: ICreateEmployee = {
      EmpName: formData.name,
      Email: formData.email,
      Password: formData.password,
    };

    return responseBody;
  }
}
