import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeSales } from '../data-analysis/employee-sales/employee-sales.component';
import { MonthlySales } from '../data-analysis/monthly-sales/monthly-sales.component';
import { NeededStock } from '../data-analysis/needed-stock/needed-stock.component';
import { SalesPrediction } from '../data-analysis/sales-prediction/sales-prediction.component';

@Component({
  selector: 'data-analysis',
  templateUrl: './data-analysis.component.html'
})

export class DataAnalysis {
  title = 'Data Analysis';
  
}
