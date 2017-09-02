import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {Product} from '../typings/typings.d'

export class CRUDService {
 
  // Inject HttpClient into your component or service.
  constructor(private _http: HttpClient) {}
    
    //GET
    /**
     * Returns an Array of Product Items
     */
    getProducts(url: string): Observable<Product[]>{
       return this._http.get(url)           
                .map((response) => <Product[]>response
                );
    }

    //POST
    /**
     * Adds a product to the database
     */
    addProduct(url: string, data: Product){
        this._http.post(url, data);
    }
    //PUT

    //'DELETE'
}

