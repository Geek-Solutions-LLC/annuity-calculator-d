import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges{
  chart: any;
  @Input() calculationResult: any;  // Получение данных от родителя

  ngOnInit() {
    if(this.calculationResult) {
      this.initChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initChart();
  }

  initChart() {
    const xData = this.fillArray([], this.calculationResult.years); // Заполняем массив
    let option = {
      title: {
        text: 'Annuity Balance',
        left: 'center',
        top: 'top',
        textStyle: {
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#000000'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          let tooltipContent = '';
          if (Array.isArray(params)) {
            params.forEach((item: any) => {
              tooltipContent += `<strong>${item.seriesName}</strong>: ${item.data}<br/>`;
            });
          } else {
            tooltipContent += `<strong>${params.seriesName}</strong>: ${params.data}<br/>`;
          }
          return tooltipContent;
        }
      },
      legend: {
        data: ['Annuity Balance', 'Interest Return'],
        orient: 'horizontal',
        left: 'center',
        bottom: '0%',
        textStyle: {
          color: '#000',
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xData,
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Annuity Balance',
          type: 'line',
          areaStyle: {
            color: 'rgba(54, 162, 235, 0.3)'
          },
          itemStyle: {
            color: '#36a2eb'
          },
          data: this.calculationResult.paymentSchedule.map((el: any) => el.remainingBalance),
        },
        {
          name: 'Interest Return',
          data: this.calculationResult.paymentSchedule.map((el: any) => el.totalInterest),
          type: 'line',
          areaStyle: {
            color: 'rgba(255, 99, 132, 0.3)'
          },
          itemStyle: {
            color: '#ff6384'
          },
        },
      ]
    };
    const chartDom = document.getElementById('area-chart')!;
    this.chart = echarts.init(chartDom);

    this.chart.setOption(option);
  }

  fillArray(arr: number[], n: number): number[] {
    for (let i = arr.length + 1; i <= n; i++) {
      arr.push(i);
    }
    return arr;
  }
}
