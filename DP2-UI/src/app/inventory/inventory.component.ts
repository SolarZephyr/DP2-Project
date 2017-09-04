import { Component } from '@angular/core';
import { Product } from '../common/typings/typings.d';
declare var componentHandler: any;
@Component({
  selector: 'display-sales',
  templateUrl: './inventory.component.html'
})

export class InventoryComponent {
  products: Array<Product>;
    constructor(){
        this.products = [];

        this.products.push({ID: 1, Name:"Product A", Type:"Medicine", Price:10.05, Stock:52}, {ID:2})
  }
}
