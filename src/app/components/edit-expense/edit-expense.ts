import { Component, inject, OnInit } from '@angular/core';
import { ExpenseForm } from '../expense-form/expense-form';
import { Expense } from '../../models/expense';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../services/expense-service';

@Component({
  selector: 'pem-edit-expense',
  imports: [ExpenseForm],
  templateUrl: './edit-expense.html',
  styleUrl: './edit-expense.scss',
})
export class EditExpense implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private expenseService = inject(ExpenseService);

  expense!: Expense;

  ngOnInit() {
    this.expense = this.route.snapshot.data['expense'];
    if (!this.expense) {
      this.router.navigate(['/404']);
    }
  }

  onSave(expense: Expense) {
    this.expenseService.updateExpense(expense).subscribe({
      next: () => this.router.navigate(['/expenses']),
      error: (err) => console.error('Failed to update expense', err),
    });
  }
  onCancel() {
    this.router.navigateByUrl('/expenses');
  }
}
