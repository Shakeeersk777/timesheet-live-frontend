import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LayoutService } from '../../../featured/layout/layout.service';
import { Subject } from 'rxjs';
import { IColumnDef } from '../../../core/models/models.interfece';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

export interface ITableActionButton {
  icon: string;
  class: string;
  title: string;
  onClick: (element: any) => void;
}

export enum TABLE_ACTION_BUTTONS {
  VIEW = 'View',
  DELETE = 'Delete',
  EDIT = 'Edit',
}

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss',
})
export class TableViewComponent implements OnInit, OnDestroy {
  private _authService = inject(AuthService);
  private router = inject(Router);
  @Input() columns: IColumnDef[] = [];
  @Input() data: any[] = [];
  @Input() displayBtns: string[] = ['View'];
  @Output() deleteEmit = new EventEmitter<any>();
  @Output() editEmit = new EventEmitter<any>();
  @Output() overviewEmit = new EventEmitter<any>();
  actionButtons: ITableActionButton[] = [];

  actionButtonList = {
    view: {
      icon: 'fa-eye',
      class: 'text-secondary',
      title: 'View',
      onClick: (element: any) => this.onView(element),
    },
    edit: {
      icon: 'fa-pen',
      class: 'text-primary',
      title: 'Edit',
      onClick: (element: any) => this.onEdit(element),
    },
    delete: {
      icon: 'fa-trash',
      class: 'text-danger',
      title: 'Delete',
      onClick: (element: any) => this.onDelete(element),
    },
  };

  showLoader: boolean = false;
  destroyIdentifier$ = new Subject();

  private _layoutService: LayoutService = inject(LayoutService);

  ngOnInit(): void {
    this.loadActions();
    this.listenLoaderState();
  }

  private loadActions(): void {
    const currentLoggedUser = this._authService.getCurrentUser();
    const isAdmin = currentLoggedUser?.isAdmin;
  
    this.actionButtons = [];
  
    if (isAdmin) {
      if (this.isTimesheetRoute()) {
        this.actionButtons.push(this.actionButtonList.view);
      } else {
        this.actionButtons.push(
          this.actionButtonList.view,
          this.actionButtonList.edit,
          this.actionButtonList.delete
        );
      }
    } else {
      this.actionButtons.push(this.actionButtonList.view);
    }
  }

  private isTimesheetRoute(): boolean {
    return this.router.url.includes('timesheets');
  }

  listenLoaderState() {
    this._layoutService.tableLoaderState.subscribe(
      (state) => (this.showLoader = state)
    );
  }

  onView(element: any) {
    this.overviewEmit.emit(element);
  }

  onEdit(element: any) {
    this.editEmit.emit(element);
  }

  onDelete(element: any) {
    this.deleteEmit.emit(element);
  }

  ngOnDestroy(): void {
    this._layoutService.showTableLoaderState();
  }
}
