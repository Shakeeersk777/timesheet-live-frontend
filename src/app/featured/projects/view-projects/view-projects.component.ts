import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TableViewComponent } from '../../../shared/components/table-view/table-view.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AssignProjectComponent } from '../assign-project/assign-project.component';
import { IProject } from '../project.modal';
import { LayoutService } from '../../layout/layout.service';
import {
  IApiResponce,
  IColumnDef,
} from '../../../core/models/models.interfece';
import { ProjectService } from '../project.service';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { ConfirmPopupComponent } from '../../../shared/components/confirm-popup/confirm-popup.component';
import { AuthService } from '../../../core/services/auth.service';

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
  private _layoutService: LayoutService = inject(LayoutService);
  private _projectService: ProjectService = inject(ProjectService);
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
  }

  onAdd() {
    const dialogRef = this._dialog.open(CreateProjectComponent, {
      width: '400px',
      maxHeight: '90vh',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data?.success) {
        this.getProjects();
      }
    });
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
    const onSuccess = (res: IApiResponce): void => {
      if (!res) return;

      if (res._status) {
        this.projectList = res._data;
      } else {
        this.projectList = [];
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

    this._projectService.getAllProjects().subscribe(observer);
  }

  deleteProject(project: IProject) {
    this._layoutService.showTableLoaderState();

    const onSuccess = (res: IApiResponce): void => {
      if (!res) return;

      this._layoutService.openSnackBar(res._msg, res._status);

      if (!res._status) {
        this._layoutService.showTableLoaderState();
        return;
      }

      this.getProjects();
    };

    const onError = (error: any): void => {
      this._layoutService.onError(error);
    };

    const observer = {
      next: onSuccess,
      error: onError,
    };

    this._projectService.deleteProject(project.ProjectId).subscribe(observer);
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
