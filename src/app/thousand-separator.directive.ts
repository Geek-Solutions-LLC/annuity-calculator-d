import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appThousandSeparator]'
})
export class ThousandSeparatorDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any): void {
    let input = event.target.value.replace(/[^0-9]/g, '');

    input = this.removeLeadingZeros(input);

    if (input) {
      const formattedValue = this.formatNumberWithCommas(parseInt(input, 10));
      const cursorPosition = this.el.nativeElement.selectionStart;

      this.el.nativeElement.value = formattedValue;

      this.el.nativeElement.setSelectionRange(cursorPosition, cursorPosition);
    } else {
      this.el.nativeElement.value = '';
    }
  }

  private removeLeadingZeros(value: string): string {
    return value.replace(/^0+(?!$)/, '');
  }

  private formatNumberWithCommas(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
