import { RouterModule, Routes } from '@angular/router';
import { SalesForm } from './sales/sales-form.component';
import { DataAnalysis } from './data-analysis/data-analysis.component';
import { NotFound } from './common/notfound/not-found.component';

export const appRoutes: Routes = [
  { path: '',
    redirectTo: 'SalesForm',
    pathMatch: 'full'
  },
  { path: 'Sales', component: SalesForm },
  { path: 'Data', component: DataAnalysis },
  { path: '**', component: NotFound }
];