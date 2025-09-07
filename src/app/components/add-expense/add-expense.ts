import { Component, inject } from '@angular/core';
import { Expense } from '../../models/expense';
import { ExpenseForm } from '../expense-form/expense-form';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense-service';

@Component({
  selector: 'pem-add-expense',
  imports: [ExpenseForm],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.scss',
})
export class AddExpense {
  private router = inject(Router);
  private expenseService = inject(ExpenseService);

  onSave(expense: Expense) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...newExpense } = expense;
    // this.expenseService.addExpense()
    this.expenseService.addExpense(expense).subscribe({
      next: () => this.router.navigate(['/expenses']),
      error: (err) => console.error('Failed to add expense', err),
    });
  }

  onCancel() {
    this.router.navigateByUrl('/expenses');
  }
}
