import { Component } from '@angular/core';
import { Product } from '../common/typings/typings.d';
import { CRUDService } from '../common/services/crudservice';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

let api = new CRUDService(this);


@Component({
  selector: 'item-edit',
  templateUrl: './item-edit.component.html'
})



export class ItemEdit {
  title = 'item edit';
  item:Observable<Product>;
  itemID:number;
 
  constructor() {
    this.itemID = null;
    //this.item = api.getProduct(routeParams.ID);
  }

  update(item: Product) {
    //api.updateProduct('/Item', item);
  }

}
