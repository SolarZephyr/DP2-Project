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
  providers:[CRUDService]
})



export class ItemForm {
  title = 'item form';
  
  editMode: Boolean = false;
  sub: any;
  id: number = null;

  types: ProdType[];
  currentProduct: Product;


  constructor(private route: ActivatedRoute, private sv: CRUDService) {
   
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['ID']; // (+) converts string 'id' to a number    
    });

    this.LoadTypeData();

    if(!isNaN(this.id))
      this.editMode = true;

    this.currentProduct = {};
    if(this.editMode){
      this.LoadProductData();

    }

  }

  LoadTypeData(){
    this.sv.getAllTypes().subscribe(data => {
      this.types = data;
      },
      err => {
          console.log('we got an error:', err);
          
      });
  }

  LoadProductData(){
    this.sv.getProductByID(this.id).subscribe(data => {
      this.currentProduct = data;
      },
      err => {
          console.log('we got an error:', err);
          
      }, () =>{
        this.FillForm();
      });
  }

  FillForm(){
    (<HTMLInputElement>document.getElementById("ProductName")).value = this.currentProduct.Name;
    (<HTMLInputElement>document.getElementById("ProductType")).value = this.currentProduct.Type.toString();
    (<HTMLInputElement>document.getElementById("ProductPrice")).value = this.currentProduct.Price.toString();
    (<HTMLInputElement>document.getElementById("ProductStock")).value = this.currentProduct.Stock.toString();
  }

  SaveProduct(){
    if(this.editMode)
      this.sv.putProduct(this.id, this.generateProductFromForm()).subscribe(
        res => res, 
        err => {},
        () => {
            //after success
            this.FillForm();
        }
        );
    else{
      this.sv.postProduct(this.generateProductFromForm());
    }

  }


  generateProductFromForm(): Product{ 
    var temp = {
      Name: (<HTMLInputElement>document.getElementById("ProductName")).value,
      Type: Number((<HTMLInputElement>document.getElementById("ProductType")).value),
      Price: Number((<HTMLInputElement>document.getElementById("ProductPrice")).value),
      Stock: Number((<HTMLInputElement>document.getElementById("ProductStock")).value)
     };
     return temp;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
