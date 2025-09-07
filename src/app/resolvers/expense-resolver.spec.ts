import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { expenseResolver } from './expense-resolver';

describe('expenseResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => expenseResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
