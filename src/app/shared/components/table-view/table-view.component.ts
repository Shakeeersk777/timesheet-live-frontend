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

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss',
})
export class TableViewComponent implements OnInit, OnDestroy {
  @Input() columns: { key: string; header: string }[] = [];
  @Input() data: any[] = [];
  @Output() deleteEmit = new EventEmitter<any>();
  @Output() editEmit = new EventEmitter<any>();
  showLoader: boolean = false;
  destroyIdentifier$ = new Subject();

  private _layoutService: LayoutService = inject(LayoutService);

  ngOnInit(): void {
    this.listenLoaderState();
  }

  listenLoaderState() {
    this._layoutService.tableLoaderState.subscribe(
      (state) => (this.showLoader = state)
    );
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
