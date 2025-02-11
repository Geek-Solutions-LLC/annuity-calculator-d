import {Component} from '@angular/core';
import {PayoutType, PaymentSchedule, CalculationResult, Month} from '../interfaces';
import {paymentSchedule} from '../constant';
import * as XLSX from 'xlsx';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-annuity-calculator',
  templateUrl: './annuity-calculator.component.html',
  styleUrls: ['./annuity-calculator.component.scss']
})
export class AnnuityCalculatorComponent {
  annuity: number | null = null;
  payoutType: PayoutType = PayoutType.FixedYears;
  age: number = 59;
  result: CalculationResult;

  constructor(private snackBar: MatSnackBar) {
    this.result = {
      payoutType: PayoutType.FixedYears,
      years: 10,
      monthlyPayment: 1321.51,
      totalPayments: 120,
      totalOfPayments: 158580.88,
      totalInterest: 58580.88,
      paymentSchedule: paymentSchedule,
      totalMonths: 1000,
      totalYears: 1000,
      remainingMonths: 0,
      startingAge: 0
    };
  }


  onFormSubmit(formData: { payoutType: PayoutType; principal: string; rate: number; years: number; monthlyWithdrawal: string, age: number | null }) {
    const {payoutType, years} = formData;
    this.payoutType = formData.payoutType;
    const rate = parseInt(String(formData.rate).replace(/,/g, ''), 10);
    const principal = parseInt(String(formData.principal).replace(/,/g, ''), 10);
    const monthlyWithdrawal = parseInt(String(formData.monthlyWithdrawal).replace(/,/g, ''), 10);
    if (formData.age) {
      this.age = formData.age;
    }

    if (payoutType === PayoutType.FixedYears) {
      this.calculateAnnuityDetails(principal, rate, years);
    } else if (payoutType === PayoutType.MonthlyWithdrawal) {
      this.calculateMonthsOfIncome(principal, rate, monthlyWithdrawal);
    }
  }

  calculateAnnuityDetails(PV: number, r: number, t: number): void {
    const n = 12;
    r = r / 100;
    let monthlyPayment = (PV * (r / n)) / (1 - Math.pow(1 + r / n, -n * t));
    let totalPayments = n * t;
    let totalOfPayments = monthlyPayment * totalPayments;
    let totalInterest = totalOfPayments - PV;
    let remainingBalance = PV;

    let results: PaymentSchedule[] = [];
    let age = this.age;


    let cumulativeWithdrawal = 0;
    let cumulativeInterest = 0;


    for (let year = 1; year <= t; year++) {
      let yearInterest = 0;
      let yearWithdrawal = 0;
      let months: PaymentSchedule['months'] = [];


      for (let month = 1; month <= n; month++) {
        let interest = remainingBalance * (r / n);
        remainingBalance = remainingBalance - monthlyPayment + interest;


        months.push({
          month,
          withdrawal: +monthlyPayment.toFixed(2),
          interest: +interest.toFixed(2),
          remainingBalance: +remainingBalance.toFixed(2)
        });


        yearInterest += interest;
        yearWithdrawal += monthlyPayment;
      }


      cumulativeWithdrawal += yearWithdrawal;
      cumulativeInterest += yearInterest;


      results.push({
        year,
        age: age++,
        totalWithdrawal: +yearWithdrawal.toFixed(2),
        totalInterest: +yearInterest.toFixed(2),
        cumulativeWithdrawal: +cumulativeWithdrawal.toFixed(2),
        cumulativeInterest: +cumulativeInterest.toFixed(2),
        remainingBalance: +remainingBalance.toFixed(2),
        months
      });
    }


    this.result = {
      payoutType: this.payoutType,
      years: t,
      monthlyPayment: +monthlyPayment.toFixed(2),
      totalPayments: totalPayments,
      totalOfPayments: +totalOfPayments.toFixed(2),
      totalInterest: +totalInterest.toFixed(2),
      paymentSchedule: results
    };
  }


  calculateMonthsOfIncome(startingPrincipal: number, interestRate: number, monthlyWithdrawal: number): void {
    const n = 12;
    const r = interestRate / 100;
    const startingAge = this.age;
    const maxAge = 100;
    const maxIterations = (maxAge - startingAge) * 12;


    if (monthlyWithdrawal <= startingPrincipal * (r / n)) {

    }

    let remainingBalance = startingPrincipal;
    let totalPayments = 0;
    let totalInterest = 0;
    let age = startingAge;
    let cumulativeWithdrawal = 0;
    let cumulativeInterest = 0;
    const paymentSchedule: PaymentSchedule[] = [];
    let iterations = 0;


    while (remainingBalance > 0 && iterations < maxIterations && age < maxAge) {
      let yearInterest = 0;
      let yearWithdrawal = 0;
      let months: PaymentSchedule['months'] = [];


      for (let month = 1; month <= n; month++) {
        let interest = remainingBalance * (r / n);
        remainingBalance = remainingBalance - monthlyWithdrawal + interest;

        if (remainingBalance < 0) remainingBalance = 0;

        months.push({
          month,
          withdrawal: +monthlyWithdrawal.toFixed(2),
          interest: +interest.toFixed(2),
          remainingBalance: +remainingBalance.toFixed(2)
        });

        yearInterest += interest;
        yearWithdrawal += monthlyWithdrawal;
        totalPayments += monthlyWithdrawal;
        totalInterest += interest;
        iterations++;


        if (remainingBalance <= 0) {
          break;
        }


        if (iterations >= maxIterations) {

          break;
        }
      }

      cumulativeWithdrawal += yearWithdrawal;
      cumulativeInterest += yearInterest;


      paymentSchedule.push({
        year: age - startingAge + 1,
        age: age++,
        totalWithdrawal: +yearWithdrawal.toFixed(2),
        totalInterest: +yearInterest.toFixed(2),
        cumulativeWithdrawal: +cumulativeWithdrawal.toFixed(2),
        cumulativeInterest: +cumulativeInterest.toFixed(2),
        remainingBalance: +remainingBalance.toFixed(2),
        months
      });


      if (remainingBalance <= 0 || age >= maxAge) {
        break;
      }
    }


    const totalOfPayments = (totalPayments + totalInterest).toFixed(2);

    const totalMonths = (age - startingAge) * 12;

    this.result = {
      payoutType: PayoutType.MonthlyWithdrawal,
      totalPayments: +totalPayments.toFixed(2),
      totalOfPayments: +totalOfPayments,
      totalInterest: +totalInterest.toFixed(2),
      paymentSchedule: paymentSchedule,
      totalMonths: Math.ceil(totalMonths),
      totalYears: age - startingAge,
      startingAge: startingAge,
      remainingMonths: 0,
      monthlyPayment: monthlyWithdrawal
    };
  }


  printPage() {
    window.print();
  }

  exportAsCSV() {
    const csvData = this.convertToCSV(this.result.paymentSchedule ?? []);
    const blob = new Blob([csvData], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.href = url;
    a.download = 'payment-schedule.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  convertToCSV(objArray: PaymentSchedule[]) {
    let csv = 'Year,Age,Total Withdrawal,Total Interest,Cumulative Withdrawal,Cumulative Interest,Remaining Balance,Month,Monthly Withdrawal,Monthly Interest,Monthly Remaining Balance\r\n';

    objArray.forEach(schedule => {
      schedule.months.forEach(month => {
        csv += `${schedule.year},${schedule.age},${schedule.totalWithdrawal},${schedule.totalInterest},${schedule.cumulativeWithdrawal},${schedule.cumulativeInterest},${schedule.remainingBalance},${month.month},${month.withdrawal},${month.interest},${month.remainingBalance}\r\n`;
      });
    });

    return csv;
  }

  exportToExcel(): void {
    const excelData = this.prepareExcelData(this.result.paymentSchedule ?? []);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'PaymentSchedule');

    XLSX.writeFile(wb, 'payment_schedule.xlsx');
  }

  prepareExcelData(data: any[]): any[] {
    const excelData: any[] = [];

    data.forEach(schedule => {
      schedule.months.forEach((el: Month) => {
        excelData.push({
          Year: schedule.year,
          Age: schedule.age,
          Total_Withdrawal: schedule.totalWithdrawal,
          Total_Interest: schedule.totalInterest,
          Cumulative_Withdrawal: schedule.cumulativeWithdrawal,
          Cumulative_Interest: schedule.cumulativeInterest,
          Remaining_Balance: schedule.remainingBalance,
          Month: el.month,
          Monthly_Withdrawal: el.withdrawal,
          Monthly_Interest: el.interest,
          Monthly_Remaining_Balance: el.remainingBalance
        });
      });
    });

    return excelData;
  }
}
