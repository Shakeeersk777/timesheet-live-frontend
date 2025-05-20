import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TableViewComponent } from '../../../shared/components/table-view/table-view.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IProject } from '../project.modal';
import { LayoutService } from '../../layout/layout.service';
import { IColumnDef } from '../../../core/models/models.interfece';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { ConfirmPopupComponent } from '../../../shared/components/confirm-popup/confirm-popup.component';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import {
  selectAllProjects,
  selectProjectsLoading,
} from '../../../store/project/project.selector';
import { PROJECT_ACTIONS } from '../../../store/project/project.action';

@Component({
  selector: 'app-view-projects',
  standalone: true,
  imports: [TableViewComponent, MatDialogModule],
  templateUrl: './view-projects.component.html',
  styleUrl: './view-projects.component.scss',
})
export class ViewProjectsComponent {
  store = inject(Store);
  projects$ = this.store.select(selectAllProjects);
  loading$ = this.store.select(selectProjectsLoading);

  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  private _layoutService: LayoutService = inject(LayoutService);
  private _authService: AuthService = inject(AuthService);
  projectList: IProject[] = [];
  isAdmin = false;

  columns: IColumnDef[] = [
    // { key: 'ProjectId', header: 'Project ID' },
    { key: 'ProjectName', header: 'Project Name' },
    { key: 'ProjectStatus', header: 'Status' },
    { key: 'TotalAllocatedHours', header: 'Allocated Hours' },
    { key: 'TotalCompletedHours', header: 'Completed Hours' },
    { key: 'CreatedDate', header: 'Created Date', type: 'date' },
    { key: 'LastUpdated', header: 'Last Updated', type: 'date' },
    { key: 'CompletedDate', header: 'Completed Date', type: 'date' },
  ];

  ngOnInit(): void {
    this.isAdmin = this._authService.isAdmin();
    this.getProjects();

    this.projects$.subscribe((res: IProject[]) => {
      if (!res) return;

      this.projectList = res;
    });

    this.loading$.subscribe((state) =>
      this._layoutService.updateTableLoaderState(state)
    );
  }

  onAdd() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.CREATE}`
    );
  }

  onAssign() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.ASSIGN}`
    );
  }

  showDeletePopup(project: IProject) {
    const dialogRef = this._dialog.open(ConfirmPopupComponent, {
      width: '500px',
      maxHeight: '100vh',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data?.confirm) {
        this.deleteProject(project);
      }
    });
  }

  getProjects(): void {
    this.store.dispatch(PROJECT_ACTIONS.LOAD_PROJECTS.LOAD());
  }

  deleteProject(project: IProject) {
    this.store.dispatch(
      PROJECT_ACTIONS.DELETE_PROJECT.LOAD({ id: project.ProjectId })
    );
  }

  onUpdate(project: IProject) {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.EDIT}/${project.ProjectId}`
    );
  }

  onView(project: IProject) {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.OVERVIEW}/${project.ProjectId}`
    );
  }
}
