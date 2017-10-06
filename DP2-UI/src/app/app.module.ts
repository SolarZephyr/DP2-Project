import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//IMPORT PAGES
import { NewTransactionForm } from './sales/new-transaction-form.component';
import { ItemForm } from './products/product-form.component';
import { DataAnalysis } from './data-analysis/data-analysis.component';
import { TransactionsComponent } from './sales/transaction-log.component';
import { InventoryComponent } from './products/product-inventory.component';
import { NotFound } from './common/notfound/not-found.component';
import { EmployeeForm } from './employees/employee-form.component';
import { ShowEmployeesComponent } from './employees/show-employees.component';
import { DefaultPage } from './default-page/default-page.component';


import {HttpClientModule} from '@angular/common/http';

//IMPORT ROUTES
import { appRoutes } from './app.routing';
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    //IMPORT PAGE COMPONENTS
    DefaultPage,
    NewTransactionForm,
    TransactionsComponent,
    DataAnalysis,
    ItemForm,
    InventoryComponent,
    EmployeeForm,
    ShowEmployeesComponent,
    NotFound,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
