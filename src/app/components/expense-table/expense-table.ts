import {
  AfterViewInit,
  // ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { Expense } from '../../models/expense';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'pem-expense-table',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './expense-table.html',
  styleUrl: './expense-table.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseTable implements AfterViewInit {
  constructor() {
    // Using effect as unfortunately there's no good way to dinamically udpate mat-table data, while keeping pagination and sorting
    effect(() => (this.dataSource.data = this.expenses()));
  }
  private _liveAnnouncer = inject(LiveAnnouncer);
  @Input() expenses!: WritableSignal<Expense[]>;
  @Output() editExpense = new EventEmitter<number>();
  @Output() deleteExpense = new EventEmitter<number>();
  displayedColumns: string[] = ['title', 'amount', 'date', 'note', 'actions'];
  dataSource = new MatTableDataSource<Expense>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onEdit(expenseId: number) {
    this.editExpense.emit(expenseId);
  }

  onDelete(expenseId: number) {
    this.deleteExpense.emit(expenseId);
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
