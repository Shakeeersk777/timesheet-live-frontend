import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { TableViewComponent } from '../../../shared/components/table-view/table-view.component';
import { LayoutService } from '../../layout/layout.service';
import { ITask } from '../task.modal';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from '../../../shared/components/confirm-popup/confirm-popup.component';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { TASK_ACTIONS } from '../../../store/task/task.action';
import {
  selectAllTasks,
  selectTasksLoading,
} from '../../../store/task/task.selector';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';

@Component({
  selector: 'app-view-tasks',
  standalone: true,
  imports: [TableViewComponent, SelectDropdownComponent],
  templateUrl: './view-tasks.component.html',
  styleUrl: './view-tasks.component.scss',
})
export class ViewTasksComponent implements OnInit {
  store = inject(Store);
  tasks$ = this.store.select(selectAllTasks);
  loading$ = this.store.select(selectTasksLoading);

  _router: Router = inject(Router);
  private _layoutService: LayoutService = inject(LayoutService);
  private _dialog: MatDialog = inject(MatDialog);
  private _authService: AuthService = inject(AuthService);
  tasksList: ITask[] = [];
  isAdmin = false;

  columnDefs = [
    { key: 'TaskName', header: 'Task Name' },
    { key: 'TaskStatus', header: 'Task Status' },
    { key: 'TotalAllocatedHours', header: 'Allocated Hours' },
    { key: 'TotalWorkedHours', header: 'Worked Hours' },
    { key: 'StartDate', header: 'Start Date' },
    { key: 'EndDate', header: 'End Date' },
  ];

  ngOnInit(): void {
    this.isAdmin = this._authService.isAdmin();
    this.getTasks();

    this.tasks$.subscribe((res: ITask[]) => {
      if (!res) return;
      this.tasksList = res;
    });

    this.loading$.subscribe((state) =>
      this._layoutService.updateTableLoaderState(state)
    );
  }

  getTasks(): void {
    this.store.dispatch(TASK_ACTIONS.LOAD_TASKS.LOAD());
  }

  deleteTask(task: ITask) {
    this.store.dispatch(TASK_ACTIONS.DELETE_TASK.LOAD({ id: task.TaskId }));
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

  private modalService = inject(NgbModal);

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
}
