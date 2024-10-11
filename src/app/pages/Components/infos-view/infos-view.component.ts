import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-component',
  standalone: true,
  imports: [],
  templateUrl: './infos-view.component.html',
  styleUrl: './infos-view.component.scss'
})
export class InfosViewComponent implements OnInit {

  @Input() label!: string;  
  @Input() value!: string;


  public country: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.country = this.route.snapshot.paramMap.get('country');
  }


}
