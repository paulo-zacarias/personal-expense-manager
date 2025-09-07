import { inject, Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { Expense } from '../models/expense';
import { HttpClient, httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:8080/expenses';
  private expensesResource = httpResource<Expense[]>(() => this.apiUrl, { defaultValue: [] });
  private http = inject(HttpClient);

  expensesSignal = this.expensesResource.value;

  getExpenseById(id: number) {
    const cached = this.expensesSignal().find((e) => e.id === id);
    console.log('cached?', cached);

    if (cached) {
      // Return cached value as an observable
      return of(cached);
    }

    // Fetch from server if not in cache
    return this.http.get<Expense>(`${this.apiUrl}/${id}`);
  }

  addExpense(expense: Expense) {
    return this.http
      .post<Expense>(this.apiUrl, expense)
      .pipe(
        tap((newExpense: Expense) => this.expensesSignal.update((list) => [...list, newExpense])),
      );
  }

  updateExpense(expense: Expense) {
    const { id, ...updated } = expense;
    return this.http
      .put<Expense>(`${this.apiUrl}/${id}`, updated)
      .pipe(
        tap((expense: Expense) =>
          this.expensesSignal.update((list) =>
            list.map((e) => (e.id === id ? { ...expense, id } : e)),
          ),
        ),
      );
  }

  deleteExpense(id: number) {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => this.expensesSignal.update((list) => list.filter((e) => e.id !== id))));
  }
}
