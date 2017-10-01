
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Product, ProdType, Employee, Sale, Transaction} from '../typings/typings.d';

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

  getTransactions(): Observable<Transaction[]> {
    // Make the HTTP request:
    return this.http.get(this.baseURL + "/Transactions/id").map(res => <Transaction[]>res );
  }

  getSalesByTransactionID(id: number): Observable<Sale[]> {
    return this.http.get(this.baseURL + "/Sales/" + id).map(res => <Sale[]>res );
}

  getEmployees(): Observable<Product[]> {
    // Make the HTTP request:
    return this.http.get(this.baseURL + "/Employees").map(res => <Employee[]>res );
  }

  getEmployeeByID(id: number): Observable<Product> {
    return this.http.get(this.baseURL + "/Employees/" + id).map(res => <Employee>res[0] );
}

  postEmployee(data: any): Observable<any> {
    let h = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post(this.baseURL + '/Employees', JSON.stringify(data), {headers: h}).map(res => res );
  }

  public putEmployee(Id:string,data:any): Observable<any>{
    return this.http.put(this.baseURL + "/Employees/" + Id, data)
    .map(response => response)
    .catch( ( errorRes: Response ) => {
        return Observable.throw( errorRes.json() );
    });
}

}