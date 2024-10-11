import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-title',
  standalone: true,
  imports: [],
  templateUrl: './main-title.component.html',
  styleUrl: './main-title.component.scss'
})
export class MainTitleComponent implements OnInit {

  title!: String

  ngOnInit(): void {
   this.title = "Medals per Country";
  }

}
