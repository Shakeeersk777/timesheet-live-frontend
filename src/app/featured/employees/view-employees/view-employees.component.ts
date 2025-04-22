import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';

@Component({
  selector: 'app-view-employees',
  standalone: true,
  imports: [],
  templateUrl: './view-employees.component.html',
  styleUrl: './view-employees.component.scss'
})
export class ViewEmployeesComponent {
  _router: Router = inject(Router);

  onAdd() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.EMPLOYEE.BASE}/${ROUTE_NAMES.EMPLOYEE.CREATE}`
    );
  }
}
