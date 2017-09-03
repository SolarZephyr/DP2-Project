import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//IMPORT PAGES
import { SalesForm } from './sales/sales-form.component';
import { ItemForm } from './item/item-form.component';
import { DataAnalysis } from './data-analysis/data-analysis.component';
import { DisplaySales } from './sales/display-sales.component';
import { Inventory } from './inventory/inventory.component';
import { NotFound } from './common/notfound/not-found.component';

import {HttpClientModule} from '@angular/common/http';

//IMPORT ROUTES
import { appRoutes } from './app.routing';
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    //IMPORT PAGE COMPONENTS
    SalesForm,
    DisplaySales,
    DataAnalysis,
    ItemForm,
    Inventory,
    NotFound,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
