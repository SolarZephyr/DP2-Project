import { Component } from '@angular/core';
import { CRUDService } from '../common/services/crudservice';

let api = new CRUDService(this);

@Component({
  selector: 'Inventory',
  templateUrl: './inventory.component.html'
})

export class Inventory {
  title = 'inventory';
  Inventory = api.getProducts('/Inventory');
}
