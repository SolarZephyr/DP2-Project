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
 
  save(item: Product) {
    api.addProduct('/Item', item);
  }

}
