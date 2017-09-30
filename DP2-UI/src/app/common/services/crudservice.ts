
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

  postProduct(data: any): Observable<any> {
    let h = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post(this.baseURL + '/Products', JSON.stringify(data), {headers: h}).map(res => res );
  }

  public putProduct(Id:string,data:any): Observable<any>{
    return this.http.put(this.baseURL + "/Products/" + Id, data)
    .map(response => response)
    .catch( ( errorRes: Response ) => {
        return Observable.throw( errorRes.json() );
     });
  }

  public newTransaction(data:any): Observable<any> {
    let h = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post(this.baseURL + '/Transactions', JSON.stringify(data), {headers: h}).map(res => res );
  }


  postSale(data: any): Observable<any> {
    let h = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post(this.baseURL + '/Sales', JSON.stringify(data), {headers: h}).map(res => res );
  }

  getMaxTransaction(): Observable<any> {
    // Make the HTTP request:
    return this.http.get(this.baseURL + "/Transactions/Max").map(res => res );
  }


}