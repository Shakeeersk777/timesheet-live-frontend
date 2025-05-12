import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { TableViewComponent } from '../../../shared/components/table-view/table-view.component';
import { LayoutService } from '../../layout/layout.service';
import { TaskService } from '../task.service';
import { IApiResponce } from '../../../core/models/models.interfece';
import { ITask } from '../task.modal';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from '../../../shared/components/confirm-popup/confirm-popup.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-view-tasks',
  standalone: true,
  imports: [TableViewComponent],
  templateUrl: './view-tasks.component.html',
  styleUrl: './view-tasks.component.scss',
})
export class ViewTasksComponent implements OnInit {
  _router: Router = inject(Router);
  private _layoutService: LayoutService = inject(LayoutService);
  private _taskService: TaskService = inject(TaskService);
  private _dialog: MatDialog = inject(MatDialog);
  private _authService: AuthService = inject(AuthService);
  tasksList: ITask[] = [];
  isAdmin = false;

  columnDefs = [
    // { key: 'TaskId', header: 'Task ID' },
    { key: 'TaskName', header: 'Task Name' },
    { key: 'TaskStatus', header: 'Task Status' },
    { key: 'TotalAllocatedHours', header: 'Allocated Hours' },
    { key: 'TotalWorkedHours', header: 'Worked Hours' },
    { key: 'StartDate', header: 'Start Date' },
    { key: 'EndDate', header: 'End Date' },
    // { key: 'CreatedDate', header: 'Created Date' },
    // { key: 'LastUpdated', header: 'Last Updated' },
    // { key: 'CompletedDate', header: 'Completed Date' },
  ];

  ngOnInit(): void {
    this.isAdmin = this._authService.isAdmin();
    this.getTasks();
  }

  getTasks(): void {
    const onSuccess = (res: IApiResponce): void => {
      if (!res) return;

      if (res._status) {
        this.tasksList = res._data;
      } else {
        this.tasksList = [];
        this._layoutService.openSnackBar(res._msg, res._status);
      }

      this._layoutService.stopTableLoaderState();
    };

    const onError = (error: any): void => {
      this._layoutService.onError(error);
    };

    const observer = {
      next: onSuccess,
      error: onError,
    };

    this._taskService.getAllTasks().subscribe(observer);
  }

  deleteTask(task: ITask) {
    this._layoutService.showTableLoaderState();

    const onSuccess = (res: IApiResponce): void => {
      if (!res) return;

      this._layoutService.openSnackBar(res._msg, res._status);

      if (!res._status) {
        this._layoutService.showTableLoaderState();
        return;
      }

      this.getTasks();
    };

    const onError = (error: any): void => {
      this._layoutService.onError(error);
    };

    const observer = {
      next: onSuccess,
      error: onError,
    };

    this._taskService.deleteTask(task.TaskId).subscribe(observer);
  }

  onAdd() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.CREATE}`
    );
  }

  onAssign() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.ASSIGN}`
    );
  }

  onUpdate(task: ITask) {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.EDIT}/${task.TaskId}`
    );
  }

  onView(task: ITask) {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.OVERVIEW}/${task.TaskId}`
    );
  }

  showDeletePopup(task: ITask) {
    const dialogRef = this._dialog.open(ConfirmPopupComponent, {
      width: '500px',
      maxHeight: '100vh',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data?.confirm) {
        this.deleteTask(task);
      }
    });
  }
}
