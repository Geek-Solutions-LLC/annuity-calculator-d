import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnChanges {
  @Input() calculationResult: any;

  payoutType: string = 'fixedYears';
  years: number = 10;
  monthlyPayment: number = 0;
  totalPayments: number = 0;
  totalOfPayments: number = 0;
  totalInterest: number = 0;
  totalMonth: number = 0;
  totalYears: number = 0;
  remainingMonths: number = 0;
  startingAge: number = 0;


  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.years = this.calculationResult.years;
    this.payoutType = this.calculationResult.payoutType;
    this.monthlyPayment = this.calculationResult.monthlyPayment;
    this.totalPayments = this.calculationResult.totalPayments;
    this.totalOfPayments = this.calculationResult.totalOfPayments;
    this.totalInterest = this.calculationResult.totalInterest;
    this.totalMonth = this.calculationResult.totalMonth;
    this.totalYears = this.calculationResult.totalYears;
    this.remainingMonths = this.calculationResult.remainingMonths;
    this.startingAge = this.calculationResult.startingAge;
  }
}
