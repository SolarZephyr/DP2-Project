import { Component, OnInit } from '@angular/core';
import { Sale, Product } from '../common/typings/typings.d';
import { CRUDService } from '../common/services/crudservice';
import { LoginService } from '../common/services/loginservice';
import { Router }     from '@angular/router';
declare var componentHandler: any;
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

  constructor(private router: Router, private sv: CRUDService, public loginService: LoginService){
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
            console.log(data);
            },
            err => {
                console.log('we got an error:', err);
                
            });
  }

  findPrice(id: number){
    return (this.allProducts.find(p => p.ID == id).Price);
  }

  addSale(){
    
    const temp: Sale = {    };
    temp.ID = this.tempSaleID;
    temp.TransID = null;
    temp.ProdID = this.toAdd.ProdID;
    temp.UnitPrice = this.findPrice(this.toAdd.ProdID);
    temp.AmtSold = this.toAdd.AmtSold;
    

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
        err => console.log("There was an error:",err),
        () => {
          this.router.navigate(['/Transactions']);
        }
      );
    }
  }


  saveTransaction(){
    var tempEmp = {"EmployeeID": this.loginService.user.ID}
    if(this.loginService.loggedIn){
      
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

  }else{
    alert("Please log in!");
  }
  }

  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
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
