import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DatePipe } from '@angular/common'
import { ChartService } from './chart.service';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('lineCanvas') lineCanvas: ElementRef;
  lineChart: any;

  private numTrans:any[]=[]
  private dateTrans:any[]=[]

  constructor(private chartService:ChartService,public datepipe: DatePipe) { }

  ngAfterViewInit(): void {

    this.chartService.getTransactionGraphForDuration('2021-03-01','2021-12-01')
    .subscribe((res:any)=>{
      const graphData =res.transStat.graphData

      graphData.forEach((el:any) =>{
        this.numTrans.push(el.numTran)


        // Transforming the date
        // let date = this.datepipe.transform(new Date(el.transactionDate), 'EE, M/d/yy');
        this.dateTrans.push(el.transactionDate)

      })
    this.lineChartMethod(this.dateTrans,this.numTrans);

    })
  }



  lineChartMethod(labels:String[],values:String[]) {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            // ? Original color rgba(75,192,192,1)
            label: 'Drug sales per day',
            fill: true,
            tension: 0,
            backgroundColor: 'rgba(141,192,50,.2)',
            borderColor: 'rgba(219,37,51,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(219,37,51,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 5,
            pointRadius: 3,
            pointHitRadius: 10,
            data: values,
            spanGaps: true,
          }
        ]
      },

      options: {
        scales: {
            y: {
              // This enables stacked Charts at Y-axis(What I want to implement)
                stacked: true
            }
        }
    }

    });
  }

}
