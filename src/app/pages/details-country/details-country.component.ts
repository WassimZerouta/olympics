import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from '../../core/services/olympic.service';
import { OlympicCountry } from '../../core/models/Olympic';
import { MainTitleComponent } from '../Components/main-title/main-title.component';
import { InfosViewComponent } from '../Components/infos-view/infos-view.component';
import { PieChartComponent } from '../Components/pie-chart/pie-chart.component';
import { LineChartComponent } from '../Components/line-chart/line-chart.component';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { BackButtonComponent } from 'src/app/pages/Components/back-button/back-button.component';

@Component({
  selector: 'app-details-country',
  standalone: true,
  imports: [    MainTitleComponent,
   InfosViewComponent,
    PieChartComponent,
    LineChartComponent,
    CommonModule,
    BackButtonComponent
  ],
  templateUrl: './details-country.component.html',
  styleUrl: './details-country.component.scss'
})
export class DetailsCountryComponent implements OnInit {
  
  public id: number | null = null; 
  public selectedCountry: OlympicCountry | undefined; 
  public nameOfCountry: string = "";
  public numberOfJos: string = "0"; 
  public totalMedals: string = "0"; 
  public totalAthletes: string = "0";  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private olympicService: OlympicService 
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.olympicService.olympics$.subscribe(olympics => {
      if (olympics) {
        this.selectedCountry = olympics.find(country => country.id === this.id);
    
        if (this.selectedCountry) {
          this.nameOfCountry = this.selectedCountry.country;
          
          this.numberOfJos = this.selectedCountry.participations.length.toString();

          this.totalMedals = this.selectedCountry.participations
            .reduce((numberOfMedals, participation) => numberOfMedals + participation.medalsCount, 0)
            .toString();
            
          this.totalAthletes = this.selectedCountry.participations
            .reduce((numberOfAthlete, participation) => numberOfAthlete + participation.athleteCount, 0)
            .toString();
        } else {
          this.router.navigate(['/not-found']);
        }
      }
    });
  }
}