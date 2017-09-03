import { Component } from '@angular/core';
import { Sale } from '../common/typings/typings.d'
@Component({
  selector: 'display-sales',
  templateUrl: './display-sales.component.html'
})

export class DisplaySales {
  sales: Array<Sale>;
  title = 'display sales';
  //sales = ['0001', '0001', '0001', 'jgldjslgj', 'Medicin', '10.00', '10'];
  
  constructor(){
    this.sales = [];
    this.sales.push(
      {
        ID: 1, 
        ProdID: 1, 
        TransID: 1, 
        ProdName: "Product A", 
        ProdType: "Medicin", 
        UnitPrice: 10.05, 
        AmtSold: 2
      }
    );

    this.sales.push(
      {
        ID: 2, 
        ProdID: 1, 
        TransID: 1, 
        ProdName: "Product A", 
        ProdType: "Medicin", 
        UnitPrice: 10.05, 
        AmtSold: 3
      }
    );
  }
}
