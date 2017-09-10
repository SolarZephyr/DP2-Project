import { Component } from '@angular/core';
import { Product, ProdType } from '../common/typings/typings.d';
import { CRUDService } from '../common/services/crudservice';
import { ActivatedRoute, ParamMap }     from '@angular/router';
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
  
  selType: number;

  editMode: Boolean = false;
  sub: any;
  id: number = null;

  products: Array<Product>; 
  types: Array<ProdType>;


  constructor(private route: ActivatedRoute) {
    //TEMP FAKE DB PROD
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


  save(item: Product) {
    api.addProduct('/Item', item);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['ID']; // (+) converts string 'id' to a number
    
    });

    if(!isNaN(this.id))
      this.editMode = true;

    
    if(this.editMode){
      this.LoadData();
    }

  }

  LoadData(){
    (<HTMLInputElement>document.getElementById("itmName")).value = (this.products.find(x => x.ID == this.id)).Name;

    (<HTMLInputElement>document.getElementById("itmPrice")).value = (this.products.find(x => x.ID == this.id)).Price.toString();
    (<HTMLInputElement>document.getElementById("itmQuantity")).value = (this.products.find(x => x.ID == this.id)).Stock.toString();
    
    var _t;
    _t = (this.products.find(x => x.ID == this.id)).Type;
    this.selType = this.types.find(x => x.ID == _t).ID;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
