import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  hidden?: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input()
  columns: TableColumn[] = [];

  @Input()
  total: number = 0;

  @Input()
  page: number = 0;

  @Input()
  querySearch?: string;

  @Input()
  pageSize: number = 5;

  @Input()
  data: any[] = [];

  @Output()
  edit: EventEmitter<any> = new EventEmitter();

  @Output()
  delete: EventEmitter<any> = new EventEmitter();

  @Output()
  pageChange: EventEmitter<number> = new EventEmitter();


  items: Array<any> = [];

  onEdit(item: any) {
    this.edit.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.pageChange.emit(this.page);
  }

  getValue(key: string, item: any): any {
    const keys = key.split(".");
    const value = keys.reduce((obj, currentKey) => {
      if (obj && obj[currentKey] !== undefined) {
        return obj[currentKey];
      } else {
        return undefined;
      }
    }, item);
    return value;
  }

}
