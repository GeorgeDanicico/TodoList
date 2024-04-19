import { Component } from '@angular/core';
import {BasicInfoCardComponent} from "../../shared/components/dashboard/basic-info-card/basic-info-card.component";
import {ChartCardComponent} from "../../shared/components/dashboard/chart-card/chart-card.component";
import {PieChartCardComponent} from "../../shared/components/dashboard/pie-chart-card/pie-chart-card.component";
import {TransactionsComponent} from "../../shared/components/dashboard/transactions/transactions.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BasicInfoCardComponent, ChartCardComponent, PieChartCardComponent, TransactionsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
