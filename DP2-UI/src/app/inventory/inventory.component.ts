import { Component } from '@angular/core';
import { Product, ProdType } from '../common/typings/typings.d';
import { CRUDService } from '../common/services/crudservice';
declare var componentHandler: any;

let api = new CRUDService(this);

@Component({
  selector: 'display-sales',
  templateUrl: './inventory.component.html'
})



export class InventoryComponent {
  products: Array<Product>;
  types: Array<ProdType>;

    constructor(){
        this.products = [];

        this.products.push(
          {ID: 1, Name:"Product A", Type:1, Price:10.05, Stock:52}, 
          {ID: 2, Name:"Product B", Type:1, Price:11.25, Stock:12},
          {ID: 3, Name:"Product C", Type:2, Price:40.55, Stock:15},
          {ID: 4, Name:"Product D", Type:1, Price:2.05, Stock:2},
          {ID: 5, Name:"Product E", Type:3, Price:0.25, Stock:23}
      );

      this.types = [];
      this.types.push(
          {ID: 1, Description:"Medicine"}, 
          {ID: 2, Description:"Poison"}, 
          {ID: 3, Description:"Misc."}, 
          {ID: 4, Description:"??"}, 
          {ID: 5, Description:"Something else"} 
      );

  }
}
