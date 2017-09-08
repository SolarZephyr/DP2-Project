import { Component } from '@angular/core';
import { Product } from '../common/typings/typings.d';
import { CRUDService } from '../common/services/crudservice';
import { ActivatedRoute }     from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

let api = new CRUDService(this);


@Component({
  selector: 'item-form',
  templateUrl: './item-form.component.html',
  providers:[]
})



export class ItemForm {
  title = 'item form';
  item:Observable<Product>;
  itemID:number;
  editMode: Boolean = false;
  sub: any;
  id: number = null;

  constructor(private route: ActivatedRoute) {
    this.itemID = null;
    
    //this.item = api.getProducts(this.routeParams.ID);
  }

  save(item: Product) {
    api.addProduct('/Item', item);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['ID']; // (+) converts string 'id' to a number
    
    });

    if(!isNaN(this.id))
      this.editMode = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
