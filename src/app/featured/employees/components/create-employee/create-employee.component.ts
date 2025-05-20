import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IHeaderButton,
} from '../../../../core/models/models.interfece';
import { ROUTE_NAMES } from '../../../../shared/enums/routes.enum';
import { ICreateEmployee } from '../../employee.model';
import { CommonHeaderComponent } from '../../../../shared/components/common-header/common-header.component';
import { BUTTON_NAMES } from '../../../../core/constants/constants';
import { EMPLOYEE_HEADER_NAMES } from '../../employee.enum';
import { Store } from '@ngrx/store';
import { EMPLOYEE_ACTIONS } from '../../../../store/employee/employee.action';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonHeaderComponent],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss',
})
export class CreateEmployeeComponent {
  private store = inject(Store);
  title = EMPLOYEE_HEADER_NAMES.ADD_EMPLOYEE;
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
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
    });
  }

  prepareRequest() {
    const formData = this.createForm.getRawValue();

    const responseBody: ICreateEmployee = {
      FirstName: formData.firstName,
      LastName: formData.lastName,
      Email: formData.email,
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
    this.store.dispatch(EMPLOYEE_ACTIONS.ADD_EMPLOYEE.LOAD({ payload }));
  }
}
