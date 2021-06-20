import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {ClientsService} from '../services/clients.service';
import {CountPerDate} from '../model/count-per-date';
import {formatDate} from '@angular/common';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  public data: CountPerDate[] = [];
  public chartData: ChartDataSets[] = [];
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

  constructor(private clientService: ClientsService) { }

  ngOnInit(): void {
    this.clientService.findVisitCountForLast10Days()
      .subscribe( res => {
        this.data = res;
        const dates = this.data.map(value => formatDate(value.date, 'yyyy-MM-dd', 'en-US'));
        const counts = this.data.map(value => value.count);
        this.chartData = [
          {data: counts, label: 'látogatások'}
        ];
        this.chartLabels = dates;
      });
  }

}
