import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ExpenseService } from '../services/expense-service';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense';

export const expenseResolver: ResolveFn<Observable<Expense | null>> = (route) => {
  const expenseService = inject(ExpenseService);
  const id = Number(route.paramMap.get('id'));
  return expenseService.getExpenseById(id);
};
