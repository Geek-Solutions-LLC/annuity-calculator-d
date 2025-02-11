// payout-type.enum.ts
export enum PayoutType {
  FixedYears = 'fixedYears',
  MonthlyWithdrawal = 'monthlyWithdrawal'
}

export interface Month {
  month: number;
  withdrawal: number;
  interest: number;
  remainingBalance: number;
}

export interface PaymentSchedule {
  year: number;
  age: number;
  totalWithdrawal: number;
  totalInterest: number;
  cumulativeWithdrawal: number;
  cumulativeInterest: number;
  remainingBalance: number;
  months: Month[];
}

export interface CalculationResult {
  payoutType?: PayoutType;
  years?: number;
  monthlyPayment?: number;
  totalPayments?: number;
  totalOfPayments?: number;
  totalInterest?: number;
  paymentSchedule?: PaymentSchedule[];
  totalMonths?: number;
  totalYears?: number;
  remainingMonths?: number;
  startingAge?: number | string;
}

