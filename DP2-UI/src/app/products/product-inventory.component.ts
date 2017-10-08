import { Component, OnInit } from '@angular/core';
import { Product, ProdType } from '../common/typings/typings.d';
import { CRUDService } from '../common/services/crudservice';


@Component({
  selector: 'display-sales',
  templateUrl: './product-inventory.component.html',
  providers:[CRUDService]
})



export class InventoryComponent implements OnInit{
  products: Array<Product>;
  types: Array<ProdType>;
  mode: string = "default";
  constructor(private sv: CRUDService){
    this.products = [];
  }

  ngOnInit(){
    this.LoadAllProducts();
    this.calcMaxPage();
  }


  page = 1;
  maxPage;
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
    this.LoadAllProducts();
  }

  public calcpage(){
    this.page = (this.state.skip/10)+1;
  }

  public calcMaxPage(){
    this.sv.getCountProduct().subscribe(data => {
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

  LoadDefault(){
    this.mode = "default";
    this.state.skip = 0;
    this.state.take = 10;
    this.LoadAllProducts();
  }

  LoadLowStock(){
    this.mode = "lowstock";
    this.state.skip = 0;
    this.state.take = 10;
    this.LoadLowProducts();
  }

  LoadAllProducts(){
  var data = {"skip":this.state.skip,"take":this.state.take};
  this.sv.getProductPage(data).subscribe(data => {
          this.products = data;
          
          },
          err => {
              console.log('we got an error:', err);
              
          });
  }

  LoadLowProducts(){
    this.sv.getLowStockProduct().subscribe(data => {
            this.products = data;
            },
            err => {
                console.log('we got an error:', err);
                
            });
  }


}
