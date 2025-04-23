import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { EmployeeService } from '../employee.service';
import { LayoutService } from '../../layout/layout.service';
import { TableViewComponent } from '../../../shared/components/table-view/table-view.component';
import { IApiResponce } from '../../../core/models/models.interfece';
import { IEmployee } from '../employee.model';

@Component({
  selector: 'app-view-employees',
  standalone: true,
  imports: [TableViewComponent],
  templateUrl: './view-employees.component.html',
  styleUrl: './view-employees.component.scss',
})
export class ViewEmployeesComponent implements OnInit {
  private _router: Router = inject(Router);
  private _employeeService: EmployeeService = inject(EmployeeService);
  private _layoutService: LayoutService = inject(LayoutService);
  employeeList: IEmployee[] = [];

  columnDefs = [
    { key: 'EmpId', header: 'ID' },
    { key: 'EmpName', header: 'Name' },
    { key: 'Email', header: 'Email' },
    { key: 'ActiveStatus', header: 'Active Status' },
    { key: 'AssignedProject', header: 'Assigned Projects' },
    { key: 'IsAdmin', header: 'Admin Status' },
    { key: 'CreatedDate', header: 'Created Date' },
    { key: 'LastUpdate', header: 'Last Update' },
  ];

  ngOnInit(): void {
    this.getEmployees();
  }

  onAdd() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.EMPLOYEE.BASE}/${ROUTE_NAMES.EMPLOYEE.CREATE}`
    );
  }

  getEmployees(): void {
    const onSuccess = (res: IApiResponce): void => {
      if (!res) return;

      if (res._status) {
        this.employeeList = res._data;
      } else {
        this.employeeList = [];
        this._layoutService.openSnackBar(res._msg, res._status);
      }

      this._layoutService.stopTableLoaderState();
    };

    const onError = (error: any): void => {};

    const observer = {
      next: onSuccess,
      error: onError,
    };

    this._employeeService.getAllEmployees().subscribe(observer);
  }

  deleteEmployee(employee: IEmployee) {
    this._layoutService.showTableLoaderState();

    const onSuccess = (res: IApiResponce): void => {
      if (!res) return;

      this._layoutService.openSnackBar(res._msg, res._status);

      if (!res._status) {
        this._layoutService.showTableLoaderState();
        return;
      }

      this.getEmployees();
    };

    const onError = (error: any): void => {
      this._layoutService.showTableLoaderState();
    };

    const observer = {
      next: onSuccess,
      error: onError,
    };

    this._employeeService.deleteEmployee(employee.EmpId).subscribe(observer);
  }

  updateEmployee(employee: IEmployee) {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.EMPLOYEE.BASE}/${ROUTE_NAMES.EMPLOYEE.EDIT}/${employee.EmpId}`
    );
  }
}
