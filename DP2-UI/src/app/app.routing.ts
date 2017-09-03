import { RouterModule, Routes } from '@angular/router';
import { SalesForm } from './sales/sales-form.component';
import { ItemForm } from './item/item-form.component';
import { Inventory } from './inventory/inventory.component';
import { DataAnalysis } from './data-analysis/data-analysis.component';
import { NotFound } from './common/notfound/not-found.component';

export const appRoutes: Routes = [
  { path: '',
    redirectTo: 'Sales',
    pathMatch: 'full'
  },
  { path: 'Sales', component: SalesForm },
  { path: 'Data', component: DataAnalysis },
  { path: 'Item', component: ItemForm},
  //{ path: 'Inventory', component: Inventory},
  { path: '**', component: NotFound }
];