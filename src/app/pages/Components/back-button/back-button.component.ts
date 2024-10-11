import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Pour pouvoir utiliser routerLink dans le HTML

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [RouterModule],  // Ajoute RouterModule pour pouvoir utiliser routerLink
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {

}