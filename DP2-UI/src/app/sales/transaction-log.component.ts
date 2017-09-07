import { Component } from '@angular/core';
import { Sale, Transaction } from '../common/typings/typings.d';
declare var componentHandler: any;
@Component({
  selector: 'display-sales',
  templateUrl: './transaction-log.component.html'
})

export class TransactionsComponent {
  transactions: Array<Transaction>;
  sales: Array<Sale>;
  selectedID: number;
  title = 'display sales';
  //sales = ['0001', '0001', '0001', 'jgldjslgj', 'Medicin', '10.00', '10'];
  
  ngAfterViewInit() {
        componentHandler.upgradeAllRegistered();
    }

  constructor(){
    this.selectedID = null;
    this.transactions = [];
    this.sales = [];
    this.transactions.push({
      ID: 20,
      EmployeeID: 42,
      Status: 0,
      Date: new Date
    });
    this.transactions.push({
      ID: 21,
      EmployeeID: 42,
      Status: 0,
      Date: new Date
    })


    this.sales.push(
      {
        ID: 1, 
        ProdID: 1, 
        TransID: 20, 
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
        TransID: 20, 
        ProdName: "Product A", 
        ProdType: "Medicin", 
        UnitPrice: 10.05, 
        AmtSold: 3
      }
    );
  }

  selectTransaction(newID: number){
    this.selectedID = newID;
    componentHandler.upgradeAllRegistered();
  }

  updateStatus(){
    if (this.transactions.find(transaction => transaction.ID == this.selectedID).Status == 0){
      this.transactions.find(transaction => transaction.ID == this.selectedID).Status = 1;
    } else {
      this.transactions.find(transaction => transaction.ID == this.selectedID).Status = 0;
    }
   
  }
}
