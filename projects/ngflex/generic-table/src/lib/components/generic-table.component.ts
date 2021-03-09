import { Component, Input, ViewChild, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { timer } from 'rxjs';

import { Moment } from 'moment';

import { LayoutService } from '../services/layout.service';
import { NgFlexHelpers } from '../helpers/ng-flex.helpers';
import { TableColumn } from '../models/table-column.model';

@Component({
  selector: 'ng-flex-table',
  templateUrl: 'generic-table.component.html',
})
export class NgFlexGenericTableComponent implements OnChanges {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() public translatePrefix: string;

  @Input() public entities: any[]; // async
  @Input() public loading: boolean; // async
  @Input() public cols: TableColumn[];

  @Input() public isSelectable: boolean = false;
  @Input() public smallActionColumn: boolean = false;
  @Input() public filterOnTagClick: boolean = false;
  @Input() public flexActions: boolean = false;

  @Input() public pageSize: number = 5;
  @Input() public excludedSearchCols: string[] = [];

  // TEMPLATES

  @Input() public toolbarActionButtonsTemplate: TemplateRef<any>;
  @Input() public filterActionButtonsTemplate: TemplateRef<any>;
  @Input() public actionMobileListItems: TemplateRef<any>;
  @Input() public actionButtonListItems: TemplateRef<any>;

  public displayedColumns: string[] = [];
  public dataSource: MatTableDataSource<any>;
  public selection = new SelectionModel<any>(true, []);
  public filter: string;

  public mobileQuery: MediaQueryList;

  public constructor(
    private layoutService: LayoutService,
  ) {
    this.mobileQuery = this.layoutService.mobileQuery;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.entities && this.entities) {
      this.dataSource = new MatTableDataSource(this.entities);

      timer(5).subscribe(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data, search) => this.cols
          .filter(col => !this.excludedSearchCols.includes(col.field))
          .some((col: any) => {
          const value: string = this.accessObjectValue(data, col.field);

          return value ? value.toString().toLowerCase().includes(search) : false;
        });
        this.dataSource.sortingDataAccessor = (item, property) => this.accessObjectValue(item, property);
        this.dataSource.sort = this.sort;
      });
    }

    if (changes.cols && this.cols) {
      this.displayedColumns = this.setDisplayedColumns();
    }
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  public masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public accessObjectValue(object: {}, path: string, keepBoolean: boolean = false): any {
    return path ? NgFlexHelpers.leaf(object, path, keepBoolean) : null;
  }

  public onTagClick(value: string): void {
    if (this.filterOnTagClick) {
      this.filter = value;
      this.applyFilter(this.filter);
    }
  }

  public emptyResultColSpan(): number {
    return this.cols.length + (this.isSelectable ? 2 : 1);
  }

  public toDate(value: any, format: string = 'L'): string {
    return value && (value as Moment).format(format);
  }

  private setDisplayedColumns(): string[] {
    const cols: string[] = this.isSelectable
      ? ['select']
      : [];

    this.cols.forEach(col => cols.push(col.field));
    cols.push('actions');

    return cols;
  }
}
