import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss'
})
export class TableViewComponent implements OnChanges {
  @Input() columnDefs: { key: string; header: string }[] = [];
  @Input() data: any[] = [];

  dataSource = new MatTableDataSource<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = this.data;
    }
  }

  get columns(): string[] {
    return this.columnDefs.map(col => col.key);
  }

}
