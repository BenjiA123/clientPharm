import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DatePipe } from '@angular/common'
import { ChartService } from './chart.service';
import { NgForm } from '@angular/forms';
import { time } from 'console';
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
  private startDate:Date = new Date('2021-03-01')
  private endDate:Date  = new Date('2021-12-01')



  public dateInputFields:any[]= [

    {
      name:"startDate",placeholder:"Start Date",type:"date",label:"Start Date"
    },
    {
      name:"endDate",placeholder:"End Date",type:"date",label:"End Date"
    }
  ]

  constructor(private chartService:ChartService,public datepipe: DatePipe) { }

  sendDates(dateForm:NgForm){
    if(dateForm.invalid) return
  
    this.numTrans = []
    this.dateTrans = []
    this.startDate = dateForm.value.startDate
    this.endDate = dateForm.value.endDate

    this.lineChart.destroy();
    this.getGraphData()


  }

  ngAfterViewInit(): void {
    // Sets initial graph
    this.getGraphData()
  }

  getGraphData(){
    this.chartService.getTransactionGraphForDuration(this.startDate,this.endDate)
    .subscribe((res:any)=>{
      const graphData =res.transStat.graphData

      graphData.forEach((el:any) =>{
        this.numTrans.push(el.numTran)
        this.dateTrans.push(el.transactionDate)

      })
    this.lineChartMethod(this.dateTrans,this.numTrans);

    })
  }

   lineGraphDataSet = {
       // ? Original color rgba(75,192,192,1)
       label: '',
       fill: true,
       tension: 0,
       backgroundColor: 'rgba(0,0,12,.1)',
       borderColor: 'rgba(119,37,51,1)',
       borderCapStyle: 'butt',
       borderDash: [],
       borderDashOffset: 0.0,
       borderJoinStyle: 'miter',
       pointBorderColor: 'rgba(75,192,192,1)',
       pointBackgroundColor: '#f6f',
       pointBorderWidth: 2,
       pointHoverRadius: 5,
       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
       pointHoverBorderColor: 'rgba(220,220,220,1)',
       pointHoverBorderWidth: 5,
       pointRadius: 3,
       pointHitRadius: 10,
       data: ["1" ,"2" ,"3",'6',null,"7","0" ],
       spanGaps: true,

  }

  lineChartMethod(labels:String[],values:String[]) {

    // I will create an array that would append a dataset according to the amont
    // in that array
    // It should contain type, and data, randomise the color
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            // ? Original color rgba(75,192,192,1)
            label: 'Drugs sold over Duration',
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
          },
          {
            // ? Original color rgba(75,192,192,1)
            label: 'Test sold over Duration',
            fill: true,
            tension: 0,
            backgroundColor: 'rgba(0,0,12,.1)',
            borderColor: 'rgba(119,37,51,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 5,
            pointRadius: 3,
            pointHitRadius: 10,
            data: ["1" ,"2" ,"3",'6',null,"7","0" ],
            spanGaps: true,
          }
        ]
      },

      options: {
        scales: {
            y: {
              //? This enables the next chart to be stacked on the previous
              // ? False for now
                stacked: false
            },
        }
    }

    });
  }

}
