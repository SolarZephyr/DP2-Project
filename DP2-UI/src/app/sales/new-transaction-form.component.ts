import { Component, OnInit } from '@angular/core';
import { Sale, Product } from '../common/typings/typings.d';
import { CRUDService } from '../common/services/crudservice';
@Component({
  selector: 'sales-form',
  templateUrl: './new-transaction-form.component.html',
  providers:[CRUDService]
})

export class NewTransactionForm  implements OnInit{
  title = 'sales form';
  transaction_id: number;
  allProducts: Array<Product>;
  newTransaction: Array<Sale>;
  toAdd: Sale;
  total: number = 0;
  tempSaleID: number = 0;

  constructor(private sv: CRUDService){
    this.transaction_id = 0;
    
    //this.allProducts = CRUDService.getAllProducts();
    this.allProducts = [];
    this.newTransaction = [];
    this.toAdd = {};
    this.newTransaction = [];
  }

  ngOnInit(){
    this.LoadAllProducts();
  }

  LoadAllProducts(){
    this.sv.getProducts().subscribe(data => {
            this.allProducts = data;
            },
            err => {
                console.log('we got an error:', err);
                
            });
  }


  addSale(){
    this.toAdd.TransID = this.transaction_id;
    this.toAdd.UnitPrice =  this.allProducts.find(product => product.ID == this.toAdd.ProdID).Price;
    const temp: Sale = {
      ID: this.tempSaleID,
      TransID: null,
      ProdID: this.toAdd.ProdID,
      UnitPrice: this.toAdd.UnitPrice,
      AmtSold: this.toAdd.AmtSold
    };
    if(temp.AmtSold == null)
      temp.AmtSold = 1;

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
    (<HTMLInputElement>document.getElementById("amt")).value = null;
  }


  postSales(tID: number){
  

    //Then, post each sale
    for(var i = 0; i< this.newTransaction.length; i++){
      //First set all sale IDs to be tID
      this.newTransaction[i].TransID = tID;
      //then post
      this.sv.postSale(this.newTransaction[i]).subscribe( 
        data => {},
        err => console.log("There was an error:",err)
      );
    }
  }


  saveTransaction(){
    var tempEmp = {"EmployeeID":1};
    var maxT;
    this.sv.newTransaction(tempEmp).subscribe(
      () => {},
      err => {},
      () => {
        //new Transaction was successfully made.
        //Get the ID
        this.sv.getMaxTransaction().subscribe(
          data => {
            maxT = data[0].MAX_TRANSACTION;
            },
          err => {},
          () => {
            //successfully got the max transaction no.

            //Now post sales.
            this.postSales(maxT);
          }
        )
      }
    );
  }

  ngAfterContentChecked(){
    this.MDLtxtFieldsCheckDirty();
  }
  

  public MDLtxtFieldsCheckDirty(){
    var nodeList = document.querySelectorAll('.mdl-textfield'); //for all
    Array.prototype.forEach.call(nodeList, function (elem) {
        if(elem.MaterialTextfield != null)
            elem.MaterialTextfield.checkDirty();   
    });
  }
}
