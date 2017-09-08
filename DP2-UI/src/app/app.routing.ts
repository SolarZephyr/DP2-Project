import { RouterModule, Routes } from '@angular/router';
import { NewTransactionForm } from './sales/new-transaction-form.component';
import { ItemForm } from './item/item-form.component';
import { ItemEdit } from './item/item-edit.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DataAnalysis } from './data-analysis/data-analysis.component';
import { NotFound } from './common/notfound/not-found.component';
import { TransactionsComponent } from './sales/transaction-log.component';

export const appRoutes: Routes = [
  { path: '',
    redirectTo: 'Sales',
    pathMatch: 'full'
  },
  { path: 'Sales', component: NewTransactionForm },
  { path: 'Data', component: DataAnalysis },
  { path: 'Item', component: ItemForm},
  { path: 'EditItem:ID', component: ItemEdit},
  { path: 'Transactions', component: TransactionsComponent},
  { path: 'Inventory', component: InventoryComponent},
  { path: '**', component: NotFound }
];