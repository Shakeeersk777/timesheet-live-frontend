import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { TableViewComponent } from '../../../shared/components/table-view/table-view.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateEditProjectComponent } from '../create-edit-project/create-edit-project.component';
import { AssignProjectComponent } from '../assign-project/assign-project.component';

@Component({
  selector: 'app-view-projects',
  standalone: true,
  imports: [TableViewComponent, MatDialogModule],
  templateUrl: './view-projects.component.html',
  styleUrl: './view-projects.component.scss',
})
export class ViewProjectsComponent {
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);

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
    const dialogRef = this._dialog.open(CreateEditProjectComponent, {
      width: '400px',
      maxHeight: '90vh',
      disableClose: false,
      autoFocus: true,
      data: {
        mode: 'create',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  onAssign() {
    const dialogRef = this._dialog.open(AssignProjectComponent, {
      width: '600px',
      maxHeight: '90vh',
      disableClose: false,
      autoFocus: true,
      data: {
        mode: 'create',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
