import { Component, OnInit } from '@angular/core';
import { Sale, Transaction } from '../common/typings/typings.d';
import { CRUDService } from '../common/services/crudservice';

declare var componentHandler: any;
@Component({
  selector: 'display-sales',
  templateUrl: './transaction-log.component.html',
  providers:[CRUDService]
})

export class TransactionsComponent implements OnInit {
  transactions: Array<Transaction>;
  sales: Array<Sale>;
  selectedID: number;
  title = 'display sales';
  //sales = ['0001', '0001', '0001', 'jgldjslgj', 'Medicin', '10.00', '10'];
  
  public MDLtxtFieldsCheckDirty(){
    var nodeList = document.querySelectorAll('.mdl-textfield'); //for all
    Array.prototype.forEach.call(nodeList, function (elem) {
        if(elem.MaterialTextfield != null)
            elem.MaterialTextfield.checkDirty();   
    });
  }
  ngAfterContentChecked(){
    this.MDLtxtFieldsCheckDirty();
  }


    ngOnInit(){
      this.LoadAllTransactions();
    }
  

  constructor(private sv: CRUDService){
    
    this.transactions = [];
    this.sales = [];
  }

  selectTransaction(newID: number){
    this.selectedID = newID;
    componentHandler.upgradeAllRegistered();
    this.sv.getSalesByTransactionID(newID).subscribe(data => {
      this.sales = data;
      console.log(data);
      },
      err => {
          console.log('we got an error:', err);
      });
  }

  updateStatus(){
    if (this.transactions.find(transaction => transaction.ID == this.selectedID).Status == 0){
      this.transactions.find(transaction => transaction.ID == this.selectedID).Status = 1;
    } else {
      this.transactions.find(transaction => transaction.ID == this.selectedID).Status = 0;
    }
   
  }


  
  LoadAllTransactions(){
    this.sv.getTransactions().subscribe(data => {
      this.transactions = data;
      },
      err => {
          console.log('we got an error:', err);
      });
  }

  LoadSalesByTransaction(id: number){
    this.sv.getSalesByTransactionID(id).subscribe(data => {
      this.sales = data;
      },
      err => {
          console.log('we got an error:', err);
      });
  }
}
