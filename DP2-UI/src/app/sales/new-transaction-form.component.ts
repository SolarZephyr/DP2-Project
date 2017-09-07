import { Component } from '@angular/core';
import { Sale, Product } from '../common/typings/typings.d';

@Component({
  selector: 'sales-form',
  templateUrl: './new-transaction-form.component.html',
  
})

export class NewTransactionForm {
  title = 'sales form';
  transaction_id: number;
  allProducts: Array<Product>;
  newTransaction: Array<Sale>;
  toAdd: Sale;
  total: number = 0;
  tempSaleID: number = 0;

  constructor(){
    this.transaction_id = 0;
    
    //this.allProducts = CRUDService.getAllProducts();
    this.allProducts = [];
    this.newTransaction = [];
    this.toAdd = {};
    this.allProducts.push(
      {ID: 1, Name:"Product A", Type:"Medicine", Price:10.05, Stock:52},
      {ID: 2, Name:"Product B", Type:"Medicine", Price:20.50, Stock:12},
      {ID: 3, Name:"Product C", Type:"Poison", Price:0.50, Stock:2}
    
    );

    this.newTransaction = [];
  }

  Save(){
    this.toAdd.TransID = this.transaction_id;
    this.toAdd.UnitPrice =  this.allProducts.find(product => product.ID == this.toAdd.ProdID).Price;
    const temp: Sale = {
      ID: this.tempSaleID,
      TransID: this.transaction_id,
      ProdID: this.toAdd.ProdID,
      UnitPrice: this.toAdd.UnitPrice,
      AmtSold: this.toAdd.AmtSold
    };
    this.tempSaleID++;

    this.newTransaction.push(temp);
    this.total += (temp.UnitPrice*temp.AmtSold);
  }

  remove(toRem: number){
    for (var i = 0; i < this.newTransaction.length; i++)
    if (this.newTransaction[i].ID == toRem) { 
      
        this.total -= (this.newTransaction[i].UnitPrice*this.newTransaction[i].AmtSold);  
        this.newTransaction.splice(i, 1);
        break;
    }
  }
  clear(){
    this.newTransaction = [];
    this.total = 0;
  }
}
