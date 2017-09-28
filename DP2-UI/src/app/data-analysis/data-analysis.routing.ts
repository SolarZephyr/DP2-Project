import { RouterModule, Routes } from '@angular/router';
import { EmployeeSales } from './employee-sales/employee-sales.component';
import { MonthlySales } from './monthly-sales/monthly-sales.component';
import { NeededStock } from './needed-stock/needed-stock.component';
import { SalesPrediction } from './sales-prediction/sales-prediction.component';

export const analysisRoutes: Routes = [
  { path: 'SalesAnalysis/',
    redirectTo: 'EmployeeSales',
    pathMatch: 'full'
  },
  { path: 'DataAnalysis/EmployeeSales', component:EmployeeSales}
];