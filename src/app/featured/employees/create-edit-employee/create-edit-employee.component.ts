import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';

@Component({
  selector: 'app-create-edit-employee',
  standalone: true,
  imports: [],
  templateUrl: './create-edit-employee.component.html',
  styleUrl: './create-edit-employee.component.scss'
})
export class CreateEditEmployeeComponent {
  _formBuilder = inject(FormBuilder);
  _router: Router = inject(Router);
  
  onSubmit() {}

  onBack() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.EMPLOYEE.BASE}/${ROUTE_NAMES.EMPLOYEE.LIST}`
    );
  }
}
