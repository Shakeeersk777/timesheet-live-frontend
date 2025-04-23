import { Component, inject } from '@angular/core';
import { TableViewComponent } from '../../../shared/components/table-view/table-view.component';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';

@Component({
  selector: 'app-view-timesheets',
  standalone: true,
  imports: [TableViewComponent],
  templateUrl: './view-timesheets.component.html',
  styleUrl: './view-timesheets.component.scss',
})
export class ViewTimesheetsComponent {
  _router: Router = inject(Router);

  columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
  ];

  data = [
    { id: 1, name: 'Alice', role: 'Developer' },
    { id: 2, name: 'Bob', role: 'Designer' },
    { id: 3, name: 'Charlie', role: 'Manager' },
    { id: 4, name: 'John', role: 'Manager' },
    { id: 5, name: 'Dev', role: 'Manager' },
  ];

  onAdd() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TIMESHEET.BASE}/${ROUTE_NAMES.TIMESHEET.CREATE}`
    );
  }

}
