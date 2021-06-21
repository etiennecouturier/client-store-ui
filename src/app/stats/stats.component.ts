import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {ClientsService} from '../services/clients.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

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
      annotations: [],
    },
  };
  public chartColors: Color[] = [
    {
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
        this.chartData = [
          {data: res.map(value => value.count), label: 'látogatások'}
        ];
        this.chartLabels = res.map(value => formatDate(value.date, 'yyyy-MM-dd', 'en-US'));
      });
  }

}
