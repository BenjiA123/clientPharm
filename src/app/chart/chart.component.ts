import { AfterViewInit, Component, ElementRef, ViewChild ,OnInit} from '@angular/core';
import { Chart,ChartType, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit,AfterViewInit {
  @ViewChild('lineCanvas') lineCanvas: ElementRef;
  lineChart: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.lineChartMethod();
  }


  ngOnInit(): void {
  }


  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7', 'Day8', 'Day9', 'Day10', 'Day11','Day12', 'Day13', 'Day14', 'Day15', 'Day16', 'Day17', 'Day18', 'Day19', 'Day2', 'Day21', 'Day22'],
        datasets: [
          {
            // ? Original color rgba(75,192,192,1)
            label: 'Sell per week',
            fill: true,
            tension: 0,
            backgroundColor: 'rgba(219,37,51,.2)',
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
            data: [100, 95, 80, 81, 70, 60, 95, 40, 50, 50, 70, 38,65, 59, 80, 81, 70, 55, 95, 10, 5, 50, 10, 38],
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
