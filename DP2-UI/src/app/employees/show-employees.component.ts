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

  LoadAllProducts(){
    this.sv.getProducts().subscribe(data => {
            this.products = data;
            },
            err => {
                console.log('we got an error:', err);
                
            });
  }


}
