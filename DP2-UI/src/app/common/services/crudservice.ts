
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Product} from '../typings/typings.d';

@Component({
    providers:[HttpClient]
})

export class CRUDService {
 
 
  baseURL: string = "http://localhost:4201";  
    
  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}
 
  getProducts(): Observable<Product[]> {
    // Make the HTTP request:
    return this.http.get(this.baseURL + "/ProductInventory").map(res => <Product[]>res );
  }

  getProductByID(id: number): Observable<Product> {
      return this.http.get(this.baseURL + "/Product/ID/" + id).map(res => <Product>res );
  }

}