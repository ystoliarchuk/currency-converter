import { Component, OnInit, ViewChild, Input, OnChanges, ModuleWithComponentFactories } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() currencyFrom
  @Input() currencyTo


  @ViewChild('lineChart') public chartRef;
  chart: any;
  labels = [];
  dataPoints: any;
  historyRates = []


  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('curValues', 'history').subscribe((d: any) => {

      for (let prop in d.rates) {
        this.historyRates.push({ date: prop, rates: d.rates[prop] })
      }
      this.historyRates.sort((a: any, b: any) => {
        if (moment(a.date).isAfter(moment(b.date)))
          return 1;
        if (moment(b.date).isAfter(moment(a.date))) {
          return -1;
        }
      })
    })

  }
  ngOnChanges() {
    this.dataPoints = []
    this.labels = []
    if (this.chart) {
      this.chart.destroy();
    }

    let rates = this.historyRates
    for (let prop in rates) {
      this.dataPoints.push(rates[prop].rates[`${this.currencyFrom}`] / rates[prop].rates[`${this.currencyTo}`]);
      this.labels.push(moment(rates[prop].date).format('MMM YYYY'))
    }
    console.log(this.labels)
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels, 
        datasets: [
          {
            data: this.dataPoints,
            borderColor: '#8d5af4',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false,        
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 10,
              padding: 5,
            }
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

}
