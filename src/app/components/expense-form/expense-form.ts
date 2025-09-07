import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Expense } from '../../models/expense';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import moment from 'moment';

const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'pem-expense-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.scss',
})
export class ExpenseForm implements OnInit {
  form!: FormGroup;
  @Input() expense?: Expense;
  @Output() saveExpense = new EventEmitter<Expense>();
  @Output() cancelExpense = new EventEmitter<void>();

  ngOnInit() {
    // Still trying to figure out strongly typed Angular forms
    // I skip using formBuilder and defined the form as follow, only way I got to make it work
    this.form = new FormGroup({
      id: new FormControl<number | null>(null),
      title: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
      amount: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0.01)],
      }),
      date: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
      note: new FormControl<string | null>(''),
    });

    if (this.expense) {
      console.log(new Date(this.expense.date));
      this.form.setValue({
        ...this.expense,
        date: moment(this.expense.date, 'YYYY-MM-DD'), // convert string to Date for datepicker
      });
    }
  }

  submit() {
    const expense = { ...this.form.value, date: this.form.value.date.format('YYYY-MM-DD') };
    this.saveExpense.emit(expense);
  }

  cancel() {
    // TODO: Check if form is touched and show confirmation dialog
    this.cancelExpense.emit();
  }
}
