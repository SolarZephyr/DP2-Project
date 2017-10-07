
//Import required objects
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//Import Type definitions from the definition file
import {Product, ProdType, Employee, Sale, Transaction, PredictedSales} from '../typings/typings.d';

/**
 * This is the CRUD Service component, it is used for all API calls
 * It is simply a collection of HTTP GET, POST and PUT calls
 */

@Component({
    providers:[HttpClient]
})

export class CRUDService {
  //This is the port
  port: string = "4201";
  //this is the url
  baseURL: string = "http://localhost:" + this.port;  
    
  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}
 

  //PRODUCTS
  /**
   * Gets all products
   */
  getProducts(): Observable<Product[]> {
    // Make the HTTP request:
    return this.http.get(this.baseURL + "/Products/all").map(res => <Product[]>res );
  }
  getProductPage(data: any): Observable<Product[]> {
    // Make the HTTP request:
    return this.http.get(this.baseURL + "/Products/skip/" + data.skip + '/take/' + data.take).map(res => <Product[]>res );
  }

  /**
   * Gets products by ID
   * @param id The ID of the product to get
   */
  public getProductByID(id: number): Observable<Product> {
      return this.http.get(this.baseURL + "/Products/id/" + id).map(res => <Product>res[0] );
  }

  /**
   * Creates a new Product. The ID will be automatically generated by the DB
   * @param data This contains the product data for the new product record
   */
  public postProduct(data: any): Observable<any> {
    let h = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post(this.baseURL + '/Products', JSON.stringify(data), {headers: h}).map(res => res );
  }

  /**
   * This updates an existing product
   * @param Id The ID of the existing product to update
   * @param data The new data of the existing product to update to
   */
  public putProduct(Id:string,data:any): Observable<any>{
    return this.http.put(this.baseURL + "/Products/" + Id, data)
    .map(response => response)
    .catch( ( errorRes: Response ) => {
        return Observable.throw( errorRes.json() );
     });
  }

  public getCountProduct(): Observable<any> {
    // Make the HTTP request:
    return this.http.get(this.baseURL + "/Products/count").map(res => res );
  }

  //TYPES
  /**
   * This call gets all types
   */
  public getAllTypes(){
    return this.http.get(this.baseURL + "/Types").map(res => <ProdType[]>res );
  }

  //TRANSACTIONS & SALES
  /**
   * Returns a number of transactions ('take') 
   * @param data the 'skip' and 'take' that make up pages of transaction records (Eg. Skip 10, take 10 would be page 2)
   */
  getTransactions(data: any): Observable<Transaction[]> {
    // Make the HTTP request:
    return this.http.get(this.baseURL + "/Transactions/skip/" + data.skip + '/take/' + data.take).map(res => <Transaction[]>res );
  }
  
  /**
   * This creates a new Transaction record (A Transaction is a collection of sales)
   * @param data The data fields of the new transaction record
   */
  public newTransaction(data:any): Observable<any> {
    let h = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post(this.baseURL + '/Transactions', JSON.stringify(data), {headers: h}).map(res => res );
  }

  /**
   * This creates a new Sale record (Sale of individual product, many sales = a transaction)
   * @param data The data fields of the new sale record
   */
  postSale(data: any): Observable<any> {
    let h = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post(this.baseURL + '/Sales', JSON.stringify(data), {headers: h}).map(res => res );
  }

  /**
   * gets the latest transaction record from the DB
   * NOTE: this will break if 2 people try to use the sales system at the same time
   */
  getMaxTransaction(): Observable<any> {
    // Make the HTTP request:
    return this.http.get(this.baseURL + "/Transactions/Max").map(res => res );
  }
  getCountTransaction(): Observable<any> {
    // Make the HTTP request:
    return this.http.get(this.baseURL + "/Transactions/Count").map(res => res );
  }

  
  /**
   * Returns all Sales associated with a particular ID
   * @param id the Transaction ID to find associated Sales for
   */
  public getSalesByTransactionID(id: number): Observable<Sale[]> {
    return this.http.get(this.baseURL + "/Sales/" + id).map(res => <Sale[]>res );
  }

  //PREDICTIONS
  public getPredictions(){
    return this.http.get(this.baseURL + "/PredictedSales").map(res => <PredictedSales[]>res );
    
  }

  //EMPLOYEES
  /**
   * Get all employees
   */
  public getEmployees(): Observable<Product[]> {
    // Make the HTTP request:
    return this.http.get(this.baseURL + "/Employees").map(res => <Employee[]>res );
  }

  /**
   * get employee Ids
   */
  public getEmployeeIds(): Observable<number[]> {
    // Make the HTTP request:
    return this.http.get(this.baseURL + "/Employees/Ids").map(res => <number[]>res );
  }

  /**
   * Get Employee by ID
   * @param id the ID to get employee by
   */
  public getEmployeeByID(id: number): Observable<Product> {
    return this.http.get(this.baseURL + "/Employees/" + id).map(res => <Employee>res[0] );
  }

  /**
   * Create new Employee record
   * @param data data of new employee
   */
  public postEmployee(data: any): Observable<any> {
    let h = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post(this.baseURL + '/Employees', JSON.stringify(data), {headers: h}).map(res => res );
  }

  /**
   * Update existing Employee record
   * @param Id ID of record to update
   * @param data New data to update the existing record to
   */
  public putEmployee(Id:string,data:any): Observable<any>{
    return this.http.put(this.baseURL + "/Employees/" + Id, data)
    .map(response => response)
    .catch( ( errorRes: Response ) => {
        return Observable.throw( errorRes.json() );
    });
}

}