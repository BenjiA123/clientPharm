import { AfterViewInit, OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { DatePipe } from '@angular/common'
import { ChartService } from './chart.service';
import { environment } from "../../environments/environment"
import { NgForm } from '@angular/forms';
import { io } from "socket.io-client";
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
  private allTransNumber: any[] = []
  private allTransDate: any[] = []
  private startDate: Date = new Date(Date.now() - 2678500000)

  private endDate: Date = new Date(Date.now())
  public drugsAutoComplete: Drug[]
  public selectedDrugsArray: any[] = []

  constructor(private chartService: ChartService, public datepipe: DatePipe) { }


  ngOnInit() {

    this.selectedDrugsArray = []



    socket.on("updateTransGraph", (data: any) => {
      console.log("At client", data)
    })


  }



  searchField(searchText: string) {
    socket.emit("searchDrug", searchText);

    socket.on("drugSearchResult", (searchResult: Drug[]) => {
      this.drugsAutoComplete = searchResult
    })

  }

  graphData
  dataSet(dataValues) {

    this.graphData.push(dataValues)

  }

  selectDrugs(drugId: any, genericName: string) {
    if (this.selectedDrugsArray.length > 0) {
      this.selectedDrugsArray = this.selectedDrugsArray.filter(selectedDrugs => selectedDrugs.drugId != drugId)

    }
    this.chartService.getTransactionsForOne(this.startDate, this.endDate, drugId)
      .subscribe(
        (res: any) => {

          if (this.selectedDrugsArray.length > 0) {
            this.selectedDrugsArray.shift()

          }

          let singleDrugGraphData = res.transStat.singleDrug

          this.numTrans = []
          this.dateTrans = []
          singleDrugGraphData.forEach((el: any) => {
            this.numTrans.push(el.numTran)
            this.dateTrans.push(el.transactionDate)

          })


          this.lineChart.destroy();

          this.lineChartMethod(this.dateTrans, this.allTransNumber)
          this.selectedDrugsArray.push({ drugId, genericName })


        }

      )



  }

  unSelectDrug(unselectId: string) {
    // perform a http call to remove the graph or delete from UI
    this.selectedDrugsArray = this.selectedDrugsArray.filter(selectedDrug => selectedDrug.drugId != unselectId)
    this.lineChart.destroy();

    this.lineChartMethod(this.allTransDate, this.allTransNumber)

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
    this.selectedDrugsArray = []
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

        this.allTransDate = this.dateTrans
        this.allTransNumber = this.numTrans
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
            label: 'Transactions over Duration',
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
