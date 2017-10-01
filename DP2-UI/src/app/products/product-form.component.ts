import { Component } from '@angular/core';
import { Product, ProdType } from '../common/typings/typings.d';
import { CRUDService } from '../common/services/crudservice';
import { ActivatedRoute, ParamMap }     from '@angular/router';
import {Observable} from 'rxjs/Observable';
declare var componentHandler: any;
import 'rxjs/Rx';

let api = new CRUDService(this);


@Component({
  selector: 'item-form',
  templateUrl: './product-form.component.html',
  providers:[CRUDService]
})



export class ItemForm {
  title = 'item form';
  
  editMode: Boolean = false;
  sub: any;
  id: number = null;

  types: ProdType[];
  currentProduct: Product;
  newProduct: Product = {};

  constructor(private route: ActivatedRoute, private sv: CRUDService) {
   
  }
  public MDLtxtFieldsCheckDirty(){
    var nodeList = document.querySelectorAll('.mdl-textfield'); //for all
    Array.prototype.forEach.call(nodeList, function (elem) {
        if(elem.MaterialTextfield != null)
            elem.MaterialTextfield.checkDirty();   
    });
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
  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
  }

  ngAfterContentChecked(){
    this.MDLtxtFieldsCheckDirty();
  }
  
  SaveProduct(){
    this.generateProductFromForm();
    if(this.editMode){ 
      this.sv.putProduct(this.id.toString(), this.newProduct).subscribe(
        () => {},
      err => {console.log("failure")}, //if error
      () => {console.log("success")}); //if success
      
    }
    else{
      this.sv.postProduct(this.newProduct).subscribe(data => {
        
        },
        err => {
            console.log('we got an error:', err);
            
        }, () =>{
          alert("POST SUCCESS!");
        });
    }

  }


  generateProductFromForm(){ 
    if(this.editMode)
        this.newProduct.ID = this.id;
    this.newProduct.Name = (<HTMLInputElement>document.getElementById("ProductName")).value;
    this.newProduct.Type = Number((<HTMLInputElement>document.getElementById("ProductType")).value);
    this.newProduct.Price =  Number((<HTMLInputElement>document.getElementById("ProductPrice")).value);
    this.newProduct.Stock =  Number((<HTMLInputElement>document.getElementById("ProductStock")).value);

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
