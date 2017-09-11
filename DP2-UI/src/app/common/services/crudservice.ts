
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Product, ProdType} from '../typings/typings.d';

@Component({
    providers:[HttpClient]
})

export class CRUDService {
 
  port: string = "4201";
  baseURL: string = "http://localhost:" + this.port;  
    
  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}
 
  getProducts(): Observable<Product[]> {
    // Make the HTTP request:
    return this.http.get(this.baseURL + "/Products").map(res => <Product[]>res );
  }

  getProductByID(id: number): Observable<Product> {
      return this.http.get(this.baseURL + "/Products/" + id).map(res => <Product>res[0] );
  }

  getAllTypes(){
    return this.http.get(this.baseURL + "/Types").map(res => <ProdType[]>res );
  }

  postProduct(data: any){
    this.http.post(this.baseURL + "/Products", JSON.stringify(data));
  }

  putProduct(id: number, data:Product){
    this.http.put(this.baseURL + "/Products/" + id, JSON.stringify(data));
  }

}