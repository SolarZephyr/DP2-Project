import { Component, OnInit } from '@angular/core';
import { Sale, Transaction, Employee } from '../common/typings/typings.d';
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
  employees: Array<Employee>;
  months: Array<string>;
  param: any;
  sort: string;
  title = 'display sales';
  
  
  filterObj: Transaction;

  maxPage;
  page = 1;
  state = {"skip":0, "take":10};
  public paginate(dir: string){
    switch(dir){
      case('left'):
        if(this.state.skip > 0){
          if(this.state.skip-10 > 0){
            this.state.skip -= 10;
          }else{
            this.state.skip = 0;
          }
        }
        break;
      case('right'):
        this.state.skip += 10;
        break;
      default:
        break;
    }
    this.calcpage();
    this.LoadAllTransactions();
  }

  public calcpage(){
    this.page = (this.state.skip/10)+1;
  }


  public calcMaxPage(){
    this.sv.getCountTransaction().subscribe(data => {
      this.maxPage = data[0].COUNT;
      
      },
      err => {
          console.log('we got an error:', err);
          
      },
      () => {
        this.maxPage = (this.maxPage / this.state.take);
        this.maxPage = Math.ceil(this.maxPage);
      });
  }

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
      this.LoadEmployees();
      this.calcMaxPage();
    }
  
    LoadEmployees(){
      this.sv.getEmployees().subscribe(data => {
        this.employees = data;
        },
        err => {
            console.log('we got an error:', err);
            
        });
    }

  constructor(private sv: CRUDService) {
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
    
    this.sv.voidTransaction(this.selectedID).subscribe(
      () => {},
      err => {
        console.log('we got an error:', err);
      },
      () => {
        console.log("voided: " + this.selectedID);
      }
    );
   
  }

  GenerateCSV(){
    console.log("Generating");
    this.sv.getCSV().subscribe(
      () => {},
      err => {},
      () => {
        console.log("Successfully generated CSV");
      }
    );
  }
  
  LoadAllTransactions(){
    this.sv.getTransactions(this.state).subscribe(data => {
      this.transactions = data;
      console.log(data);
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
