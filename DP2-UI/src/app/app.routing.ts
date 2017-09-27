import { RouterModule, Routes } from '@angular/router';
import { NewTransactionForm } from './sales/new-transaction-form.component';
import { ItemForm } from './products/product-form.component';
import { InventoryComponent } from './products/product-inventory.component';
import { DataAnalysis } from './data-analysis/data-analysis.component';
import { NotFound } from './common/notfound/not-found.component';
import { TransactionsComponent } from './sales/transaction-log.component';
import { EmployeeForm } from './employees/employee-form.component';

export const appRoutes: Routes = [
  { path: '',
    redirectTo: 'Sales',
    pathMatch: 'full'
  },
  { path: 'Sales', component: NewTransactionForm },
  { path: 'Data', component: DataAnalysis },
  { path: 'Item', component: ItemForm},
  { path: 'Item/:ID', component: ItemForm},
  { path: 'Transactions', component: TransactionsComponent},
  { path: 'Inventory', component: InventoryComponent},
  { path: 'EmployeeForm', component: EmployeeForm},
  { path: 'EmployeeForm/:ID', component: EmployeeForm},
  { path: '**', component: NotFound }
];