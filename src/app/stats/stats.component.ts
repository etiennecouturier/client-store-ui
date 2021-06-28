import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
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

  public ageData: ChartDataSets[] = [];
  public ageLabels: Label[];

  public sexData: ChartDataSets[] = [];
  public sexLabels: Label[];

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

  public pieChartOptions: (ChartOptions & { annotation: any }) = {
    scales: {
      yAxes: [ { display: false } ],
      xAxes: [ { display: false } ]
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

  public pieChartColors: Color[] = [
    {
      backgroundColor: [
        'rgba(244,67,54,0.3)',
        'rgba(146, 146, 146, 0.25)'
      ],
      borderColor: 'red'
    }
  ];

  constructor(private clientService: ClientsService) {
  }

  ngOnInit(): void {
    this.clientService.findVisitCountForLast10Days()
      .subscribe(res => {
        this.chartData = [
          {data: res.map(value => value.count), label: 'látogatások száma'}
        ];
        this.chartLabels = res.map(value => formatDate(value.date, 'yyyy-MM-dd', 'en-US'));
      });

    this.clientService.findVisitorCountPerAge()
      .subscribe(res => {
        this.ageData = [
          {data: res.map(value => value.count), label: 'látogatók kora'}
        ];
        this.ageLabels = res.map(value => value.range);
      });

    this.clientService.findVisitorCountPerSex()
      .subscribe(res => {
        this.sexData = [
          {data: res.map(value => value.count), label: 'látogatók neme'}
        ];
        this.sexLabels = res.map(value => value.sex);
      });
  }

}
