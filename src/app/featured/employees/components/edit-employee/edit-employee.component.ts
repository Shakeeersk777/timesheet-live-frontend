import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ROUTE_NAMES } from '../../../../shared/enums/routes.enum';
import { IEmployee, IEditEmployee } from '../../employee.model';
import { Store } from '@ngrx/store';
import { EMPLOYEE_ACTIONS } from '../../../../store/employee/employee.action';
import { selectEmployee } from '../../../../store/employee/employee.selector';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent {
  store = inject(Store);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
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

    this.store.select(selectEmployee).subscribe((res) => {
      if (!res) return;

      this.employeeOverviewData = res;
      this.setOverview();
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
    this.store.dispatch(EMPLOYEE_ACTIONS.LOAD_EMPLOYEE.LOAD({ id: empId }));
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

    this.store.dispatch(
      EMPLOYEE_ACTIONS.UPDATE_EMPLOYEE.LOAD({
        payload,
        id: this.employeeOverviewData.EmployeeId,
      })
    );
  }
}
