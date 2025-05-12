import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  IApiResponce,
  IHeaderButton,
} from '../../../../core/models/models.interfece';
import { ROUTE_NAMES } from '../../../../shared/enums/routes.enum';
import { LayoutService } from '../../../layout/layout.service';
import { ICreateEmployee } from '../../employee.model';
import { EmployeeService } from '../../employee.service';
import { CommonHeaderComponent } from '../../../../shared/components/common-header/common-header.component';
import { BUTTON_NAMES } from '../../../../core/constants/constants';
import { EMPLOYEE_HEADER_NAMES } from '../../employee.enum';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonHeaderComponent],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss',
})
export class CreateEmployeeComponent {
  title = EMPLOYEE_HEADER_NAMES.ADD_EMPLOYEE;
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private _employeeService: EmployeeService = inject(EmployeeService);
  private _layoutService: LayoutService = inject(LayoutService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  createForm!: FormGroup;
  buttonsList: IHeaderButton[] = [
    {
      label: BUTTON_NAMES.BACK,
    },
    {
      label: BUTTON_NAMES.ADD,
    },
  ];

  ngOnInit(): void {
    this.initForm();
  }

  handleHeaderAction(action: string) {
    switch (action) {
      case BUTTON_NAMES.BACK:
        this.navigateToList();
        break;
      case BUTTON_NAMES.ADD:
        this.submitForm();
        break;
    }
  }

  initForm() {
    this.createForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  prepareRequest() {
    const formData = this.createForm.getRawValue();

    const responseBody: ICreateEmployee = {
      FirstName: formData.firstName,
      LastName: formData.lastName,
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
    if (this.createForm.invalid) return;

    const payload = this.prepareRequest();

    const observer = {
      next: (res: IApiResponce) => {
        this._layoutService.openSnackBar(res._msg, res._status);
        if (res._status) this.navigateToList();
      },
      error: (err: any) => {},
    };

    this._employeeService.addEmployee(payload).subscribe(observer);
  }
}
