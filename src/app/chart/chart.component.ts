import { AfterViewInit, OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { DatePipe } from '@angular/common'
import { ChartService } from './chart.service';
import { environment } from "../../environments/environment"
import { NgForm } from '@angular/forms';



import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';



const BACKEND_URL = environment.apiUrl + "/socket"

import { io } from "socket.io-client";
import { HttpClient } from '@angular/common/http';
import { Drug } from '../drugs/drugs.interface';

const socket = io(environment.baseUrl);


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('lineCanvas') lineCanvas: ElementRef;
  lineChart: any;

  private numTrans: any[] = []
  private dateTrans: any[] = []
  private startDate: Date = new Date('2021-03-01')
  private endDate: Date = new Date('2021-12-01')
  public drugsAutoComplete: Drug[]

  constructor(private chartService: ChartService, public datepipe: DatePipe, private http: HttpClient) { }


  ngOnInit() {


  }


  searchField(searchText: string) {
    console.log(searchText)
    socket.emit("search", searchText);

    socket.on("searchResult", (searchResult: Drug[]) => {
      this.drugsAutoComplete = searchResult
    })

  }

  addDrugGraph(drugDataForm: NgForm) {
    // This is where i will send the req to get the drug for a particular Id 

    // Deletes or updates current graph for duration
    if (drugDataForm.invalid) return

    this.chartService.getTransactionsForOne('2021-03-01', '2021-03-01', drugDataForm.form.value.drugId)
      .subscribe(
        (res) => {
          console.log(res)
        }
      )

    // Consolas, 'Courier New', monospace
  }






  public dateInputFields: any[] = [

    {
      name: "startDate", placeholder: "Start Date", type: "date", label: "Start Date"
    },
    {
      name: "endDate", placeholder: "End Date", type: "date", label: "End Date"
    }
  ]
  sendDates(dateForm: NgForm) {
    if (dateForm.invalid) return

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

  getGraphData() {

    this.chartService.getTransactionGraphForDuration(this.startDate, this.endDate)
      .subscribe((res: any) => {
        const graphData = res.transStat.graphData

        graphData.forEach((el: any) => {
          this.numTrans.push(el.numTran)
          this.dateTrans.push(el.transactionDate)

        })
        this.lineChartMethod(this.dateTrans, this.numTrans);

      })
  }



  lineChartMethod(labels: String[], values: String[]) {

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
          // {
          //   // ? Original color rgba(75,192,192,1)
          //   label: 'Paracetamol sold over Duration',
          //   fill: true,
          //   tension: 0,
          //   backgroundColor: 'rgba(0,0,12,.1)',
          //   borderColor: 'rgba(119,37,51,1)',
          //   borderCapStyle: 'butt',
          //   borderDash: [],
          //   borderDashOffset: 0.0,
          //   borderJoinStyle: 'miter',
          //   pointBorderColor: 'rgba(75,192,192,1)',
          //   pointBackgroundColor: '#fff',
          //   pointBorderWidth: 2,
          //   pointHoverRadius: 5,
          //   pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          //   pointHoverBorderColor: 'rgba(220,220,220,1)',
          //   pointHoverBorderWidth: 5,
          //   pointRadius: 3,
          //   pointHitRadius: 10,
          //   data: ["1", "2", "3", '6', null, "7", "0"],
          //   spanGaps: true,
          // },

          // {
          //   // ? Original color rgba(75,192,192,1)
          //   label: 'Penicilin sold over Duration',
          //   fill: true,
          //   tension: 0,
          //   backgroundColor: 'rgba(233,0,12,.1)',
          //   borderColor: 'rgba(219,37,51,1)',
          //   borderCapStyle: 'butt',
          //   borderDash: [],
          //   borderDashOffset: 0.0,
          //   borderJoinStyle: 'miter',
          //   pointBorderColor: 'rgba(75,12,192,1)',
          //   pointBackgroundColor: '#fff',
          //   pointBorderWidth: 2,
          //   pointHoverRadius: 5,
          //   pointHoverBackgroundColor: 'rgba(75,12,192,1)',
          //   pointHoverBorderColor: 'rgba(22,220,20,1)',
          //   pointHoverBorderWidth: 5,
          //   pointRadius: 3,
          //   pointHitRadius: 10,
          //   data: ["5", "3", "1", '6', null, "1", "0"],
          //   spanGaps: true,
          // }
        ],

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
