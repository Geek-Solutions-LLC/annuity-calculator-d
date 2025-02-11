import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatAccordion} from "@angular/material/expansion";
import {paymentSchedule} from "../../constant";

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ScheduleComponent implements OnChanges {
  @Input() calculationResult: any;  // Получение данных от родителя

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  dataSource: any[] = paymentSchedule;
  expandedElement: any | null = null;
  isFixedYears: boolean = true;
  isMonthlyWithdrawal: boolean = false;
  isPanelsOpen = false;

  columnsToDisplay: string[] = ['year', 'age', 'withdrawal', 'interest', 'remainingBalance'];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = this.calculationResult.paymentSchedule;
    this.isFixedYears = this.calculationResult.payoutType === 'fixedYears';
    this.isMonthlyWithdrawal = this.calculationResult.payoutType === 'monthlyWithdrawal';
  }

  openAllPanels() {
    this.accordion.openAll();
  }

  closeAllPanels() {
    this.accordion.closeAll()
  }

  togglePanels(isOpen: boolean) {
    if (isOpen) {
      this.openAllPanels();
    } else {
      this.closeAllPanels();
    }
  }
}
