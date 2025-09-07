import { Injectable, signal } from '@angular/core';
import { delay, of } from 'rxjs';
import { Expense } from '../models/expense';
import { dummyExpenses } from '../dummy_expenses';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private _expenses = signal<Expense[]>(dummyExpenses);
  expensesSignal = this._expenses;

  getExpenseById(id: number) {
    const cached = this._expenses().find((e) => e.id === id);
    console.log('cached?', cached);

    // Check cache first
    // const cached = this.getByIdCached(id);
    if (cached) return of(cached);

    // Mock backend response
    const mock: Expense = {
      id,
      title: 'Mock Expense',
      amount: 100,
      date: '2025-09-06', // ISO string
      note: 'This is a mocked expense',
    };

    // Simulate HTTP delay
    // return of(mock).pipe(delay(300));
    return of(mock).pipe(delay(300));
  }

  addExpense(expense: Expense) {
    const newExpense = { ...expense, id: Math.floor(Math.random() * 1000) };
    this._expenses.update((list) => [...list, newExpense]);
    return of(newExpense);
  }

  updateExpense(id: number, expense: Expense) {
    this._expenses.update((list) => list.map((e) => (e.id === id ? { ...expense, id } : e)));
    return of({ ...expense, id });
  }

  deleteExpense(id: number) {
    this._expenses.update((list) => list.filter((e) => e.id !== id));
    return of(void 0);
  }
}
