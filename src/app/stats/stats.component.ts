import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  // public product: Product;
  public chartData: ChartDataSets[];
  public chartLabels: Label[];
  public chartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'y-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public chartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(244,67,54,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public chartLegend = true;
  public chartType: ChartType = 'line';

  constructor() { }

  ngOnInit(): void {
    this.chartData = [
      // {data: [50, 4, 8, 6, 12], label: 'prices'},
      {data: [65, 84, 99, 14, 102], label: 'quantities'}
    ];
    this.chartLabels = ['2020.03.31', '2020.03.31', '2020.03.31', '2020.03.31', '2020.03.31'];
  }

}
