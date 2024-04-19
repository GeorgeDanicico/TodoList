import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-basic-info-card',
  standalone: true,
  imports: [
    MatButton, MatIcon
  ],
  templateUrl: './basic-info-card.component.html',
  styleUrl: './basic-info-card.component.scss'
})
export class BasicInfoCardComponent {

}
