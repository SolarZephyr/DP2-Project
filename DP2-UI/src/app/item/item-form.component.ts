import { Component } from '@angular/core';
import { Product } from '../common/typings/typings.d';
import { CRUDService } from '../common/services/crudservice';

let api = new CRUDService(this);


@Component({
  selector: 'item-form',
  templateUrl: './item-form.component.html'
})



export class ItemForm {
  title = 'item form';
  item:Product;
  itemID:number;
 
  constructor() {
    this.itemID = null;
    //this.item = api.getProducts(this.itemID);
  }

  save(item: Product) {
    api.addProduct('/Item', item);
  }

}
