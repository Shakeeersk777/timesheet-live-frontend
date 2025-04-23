import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TableViewComponent } from '../../../shared/components/table-view/table-view.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AssignProjectComponent } from '../assign-project/assign-project.component';
import { IProject } from '../project.modal';
import { LayoutService } from '../../layout/layout.service';
import { IApiResponce } from '../../../core/models/models.interfece';
import { ProjectService } from '../project.service';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { CreateProjectComponent } from '../create-project/create-project.component';

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
  projectList: IProject[] = [];

  columns = [
    { key: 'ProjectsId', header: 'Project ID' },
    { key: 'ProjectsName', header: 'Project Name' },
    { key: 'TaskType', header: 'Task Type' },
    { key: 'ProjectsStatus', header: 'Status' },
    { key: 'ReceivedDate', header: 'Received Date' },
    { key: 'StartDate', header: 'Start Date' },
    { key: 'TotalAllocatedHours', header: 'Allocated Hours' },
    { key: 'TotalCompletedHours', header: 'Completed Hours' },
    { key: 'TotalCompletedPercetage', header: 'Completion %' },
    { key: 'AssignedBy', header: 'Assigned By' },
    { key: 'AssignedTo', header: 'Assigned To' },
    { key: 'CompletedDate', header: 'Completed Date' },
    { key: 'LastUpdatedDate', header: 'Last Updated' },
    { key: 'LatestUpdates', header: 'Latest Updates' },
  ];

  ngOnInit(): void {
    this.getProjects();
  }

  onAdd() {
    const dialogRef = this._dialog.open(CreateProjectComponent, {
      width: '400px',
      maxHeight: '90vh',
      disableClose: false,
      autoFocus: true,
      data: {
        mode: 'create',
      },
    });

    dialogRef.afterClosed().subscribe((success) => {
      if (success) {
        this.getProjects();
      }
    });
  }

  onAssign() {
    const dialogRef = this._dialog.open(AssignProjectComponent, {
      width: '600px',
      maxHeight: '100vh',
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

    const onError = (error: any): void => {};

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
      this._layoutService.showTableLoaderState();
    };

    const observer = {
      next: onSuccess,
      error: onError,
    };

    this._projectService.deleteProject(project.ProjectsId).subscribe(observer);
  }

  onUpdate(project: IProject) {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.EDIT}/${project.ProjectsId}`
    );
  }
}
