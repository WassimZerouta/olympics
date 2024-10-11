import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartOptions, ChartData } from 'chart.js';
import { OlympicCountry } from '../../../core/models/Olympic';

@Component({
  standalone: true,
  imports: [BaseChartDirective],
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  constructor(private router: Router) {}

  @Input() olympics: OlympicCountry[] = [];
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  public pieChartLabels: string[] = [];
  
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [],
      backgroundColor: ['#89A1DC', '#793D52', '#956065', '#BEE0F2', '#977FA1'],
      hoverBackgroundColor: ['#89A1DC', '#793D52', '#956065', '#BEE0F2', '#977FA1']
    }],
  };

  public pieChartType: ChartType = 'pie';
  
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#08838F',
        displayColors: false, 
        callbacks: {
          label: function (tooltipItem: any) {
            const value = tooltipItem.raw || 0;
            return `🏅 ${value}`;
          }
        }
      }
    },
  };

  ngOnInit(): void {
    if (this.olympics.length > 0) {
      this.updateChart();
    }
  }

  updateChart(): void {
    this.pieChartLabels = this.olympics.map((olympic: OlympicCountry) => olympic.country);

    const medalCounts = this.olympics.map((olympic: OlympicCountry) => {
      return olympic.participations.reduce((acc: number, participation: any) => acc + participation.medalsCount, 0);
    });

    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [{
        data: medalCounts,
        backgroundColor: ['#89A1DC', '#793D52', '#956065', '#B8CCE6', '#977FA1'],
        hoverBackgroundColor: ['#89A1DC', '#793D52', '#956065', '#B8CCE6', '#977FA1']
      }],
    };
  }

  onChartClick(event: any): void {
    const activePoints = this.chart.chart?.getElementsAtEventForMode(event.event, 'nearest', { intersect: true }, true);

    if (activePoints && activePoints.length > 0) {
      const index = activePoints[0].index;
      const id = this.olympics[index].id;

      this.onCountryClick(id);
    }
  }

  onCountryClick(id: number): void {
    this.router.navigate(['/details', id]); 
  }
}