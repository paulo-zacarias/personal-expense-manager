import { Component, effect, inject, OnInit } from '@angular/core';
import { ExpenseTable } from '../expense-table/expense-table';
import { Router, RouterModule } from '@angular/router';
import { ExpenseService } from '../../services/expense-service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'pem-expense-list',
  imports: [ExpenseTable, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.scss',
})
export class ExpenseList implements OnInit {
  private router = inject(Router);
  private expenseService = inject(ExpenseService);
  expenses = this.expenseService.expensesSignal;

  ngOnInit() {
    console.log('Hello from the other side :)');
  }

  test = effect(() => console.log('from the list component', this.expenses()));

  onEdit(expenseId: number) {
    this.router.navigate(['/expenses', expenseId, 'edit']);
  }

  onDelete(expenseId: number) {
    this.expenseService.deleteExpense(expenseId).subscribe((res: unknown) => console.log(res));
  }
}
