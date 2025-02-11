import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Input() calculationResult: any;
  @ViewChild('principalInput', { static: true }) principalInput!: NgModel;
  formData = {
    age: 59,
    payoutType: 'fixedYears',
    principal: '100,000',
    rate: '10',
    years: '10',
    monthlyWithdrawal: '1000'
  };

  ageFromUrl: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const ageParam = urlParams.get('age');

    if (ageParam) {
      this.ageFromUrl = true;
      this.formData.age = +ageParam;
      this.onSubmit();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.formData.monthlyWithdrawal = this.calculationResult?.monthlyPayment ?? '1000';
  }

  onSubmit() {
    this.formSubmit.emit(this.formData);
  }

  preventNonNumericalInput(event: KeyboardEvent) {
    const invalidKeys = ['-', '+', 'e', 'E'];
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];

    if (allowedKeys.indexOf(event.key) !== -1) {
      return;
    }

    if (invalidKeys.includes(event.key) || !/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }


  onInput(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  onPrincipalInput() {
    const control = this.principalInput.control;
    const value = this.formData.principal ? parseFloat(this.formData.principal.replace(/,/g, '')) : 0;
    if (value < 5000 || value > 5000000) {
      control.setErrors({ outOfRange: true });
    } else {
      control.setErrors(null);
    }
  }
}
