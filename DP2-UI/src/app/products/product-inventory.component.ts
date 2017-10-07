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

  constructor(private sv: CRUDService){
    this.products = [];
  }

  ngOnInit(){
    this.LoadAllProducts();
  }


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
    this.LoadAllProducts();
  }

  public calcpage(){
    this.page = (this.state.skip/10)+1;
  }

  LoadAllProducts(){
  var data = {"skip":this.state.skip,"take":this.state.take};
  this.sv.getProductPage(data).subscribe(data => {
          this.products = data;
          console.log(data);
          },
          err => {
              console.log('we got an error:', err);
              
          });
  }


}
