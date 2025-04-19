import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { TableViewComponent } from '../../../shared/components/table-view/table-view.component';

@Component({
  selector: 'app-view-tasks',
  standalone: true,
  imports: [TableViewComponent],
  templateUrl: './view-tasks.component.html',
  styleUrl: './view-tasks.component.scss'
})
export class ViewTasksComponent {
  _router: Router = inject(Router);

  columnDefs = [
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
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.CREATE}`
    );
  }
}
