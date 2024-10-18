import { Component, OnInit, OnDestroy  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTitleComponent } from '../Components/main-title/main-title.component';
import {InfosViewComponent } from '../Components/infos-view/infos-view.component';
import { PieChartComponent } from '../Components/pie-chart/pie-chart.component';
import { OlympicCountry } from '../../core/models/Olympic';
import { OlympicService } from '../../core/services/olympic.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MainTitleComponent,
    InfosViewComponent,
    PieChartComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {

  public olympics$!: Observable<OlympicCountry[] | undefined>;
  public numberOfJos: string = "";
  public numberOfCountries: string = "";

  private olympicsSubscription!: Subscription;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympicsSubscription = this.olympics$.subscribe(data => {

      if (data) {
        this.numberOfCountries = data.length.toString();
        this.numberOfJos = data[0].participations.length.toString();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.olympicsSubscription) {
      this.olympicsSubscription.unsubscribe();
    }
  }
}
