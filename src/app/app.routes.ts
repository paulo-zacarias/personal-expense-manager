import { Routes } from '@angular/router';
import { ExpenseList } from './components/expense-list/expense-list';
import { AddExpense } from './components/add-expense/add-expense';
import { EditExpense } from './components/edit-expense/edit-expense';
import { expenseResolver } from './resolvers/expense-resolver';

export const routes: Routes = [
  { path: 'expenses', component: ExpenseList },
  {
    path: 'expenses/:id/edit',
    component: EditExpense,
    resolve: { expense: expenseResolver },
  },
  { path: 'expenses/new', component: AddExpense },
  { path: '', redirectTo: '/expenses', pathMatch: 'full' },
];
