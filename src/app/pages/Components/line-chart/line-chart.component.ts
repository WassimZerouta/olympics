import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartOptions, ChartData } from 'chart.js';
import { OlympicCountry } from '../../../core/models/Olympic';

@Component({
  standalone: true,
  imports: [BaseChartDirective],
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() country: OlympicCountry | undefined; 
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  public lineChartLabels: string[] = []; 
  public lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: []
  };

  public lineChartType: ChartType = 'line';

  public lineChartOptions: ChartOptions = {
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
    if (this.country) {
      this.updateChart();
    } else {
      console.log('Aucun pays sélectionné');
    }
  }

  updateChart(): void {
    if (!this.country) {
      return;
    }

    const years = this.country.participations.map(participation => participation.year.toString());  
    const medals = this.country.participations.map(participation => participation.medalsCount); 

    this.lineChartLabels = years;

    this.lineChartData = {
      labels: this.lineChartLabels,
      datasets: [
        {
          label: `${this.country.country} - Médailles`,
          data: medals, 
          fill: false,
          borderColor: '#08838F',
          tension: 0
        }
      ]
    };

    if (this.chart) {
      this.chart.update();
    }
  }
}
