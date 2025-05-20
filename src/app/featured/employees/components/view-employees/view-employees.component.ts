import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../../shared/enums/routes.enum';
import { LayoutService } from '../../../layout/layout.service';
import { TableViewComponent } from '../../../../shared/components/table-view/table-view.component';
import { IColumnDef } from '../../../../core/models/models.interfece';
import { IEmployee } from '../../employee.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from '../../../../shared/components/confirm-popup/confirm-popup.component';
import { Store } from '@ngrx/store';
import {
  selectAllEmployees,
  selectUsersLoading,
  selectUsersError,
} from '../../../../store/employee/employee.selector';
import { EMPLOYEE_ACTIONS } from '../../../../store/employee/employee.action';

@Component({
  selector: 'app-view-employees',
  standalone: true,
  imports: [TableViewComponent],
  templateUrl: './view-employees.component.html',
  styleUrl: './view-employees.component.scss',
})
export class ViewEmployeesComponent implements OnInit {
  private store = inject(Store);

  employees$ = this.store.select(selectAllEmployees);
  loading$ = this.store.select(selectUsersLoading);
  error$ = this.store.select(selectUsersError);

  private _router: Router = inject(Router);
  private _layoutService: LayoutService = inject(LayoutService);
  private _dialog: MatDialog = inject(MatDialog);
  employeeList: IEmployee[] = [];

  columnDefs: IColumnDef[] = [
    { key: 'FirstName', header: 'First Name' },
    { key: 'LastName', header: 'Last Name' },
    { key: 'Email', header: 'Email' },
    { key: 'ActiveStatus', header: 'Active Status' },
    { key: 'CreatedDate', header: 'Created Date', type: 'date' },
    { key: 'LastUpdated', header: 'Last Updated', type: 'date' },
  ];

  ngOnInit(): void {
    this.getEmployees();

    this.employees$.subscribe((res: IEmployee[]) => {
      this.employeeList = res;
    });

    this.loading$.subscribe((state: boolean) => {
      this._layoutService.updateTableLoaderState(state);
    });
  }

  onAdd() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.EMPLOYEE.BASE}/${ROUTE_NAMES.EMPLOYEE.CREATE}`
    );
  }

  showDeletePopup(employee: IEmployee) {
    const dialogRef = this._dialog.open(ConfirmPopupComponent, {
      width: '500px',
      maxHeight: '100vh',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data?.confirm) {
        this.deleteEmployee(employee);
      }
    });
  }

  getEmployees() {
    this.store.dispatch(EMPLOYEE_ACTIONS.LOAD_EMPLOYEES.LOAD());
  }

  deleteEmployee(employee: IEmployee) {
    this.store.dispatch(
      EMPLOYEE_ACTIONS.DELETE_EMPLOYEE.LOAD({ id: employee.EmployeeId })
    );
  }

  updateEmployee(employee: IEmployee) {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.EMPLOYEE.BASE}/${ROUTE_NAMES.EMPLOYEE.EDIT}/${employee.EmployeeId}`
    );
  }

  onView(employee: IEmployee) {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.EMPLOYEE.BASE}/${ROUTE_NAMES.EMPLOYEE.OVERVIEW}/${employee.EmployeeId}`
    );
  }
}
