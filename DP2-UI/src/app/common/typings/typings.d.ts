/**
 * This 'type declaration' file contains
 * types for many of the data objects used 
 * by the User Interface. 
 * 
 * These objects are pretty self explanatory 
 * They are an interface, with a number of fields.
 * 
 * All fields are nullable because the IDs are provided 
 * by the Database
 */

export interface Product{
   ID ?: number;
   Name ?: string;
   Price ?: number;
   Stock ?: number;
   Type ?: string;
}

export interface PredictedSales{
    ID ?: number;
    Name ?: string;
    Type ?: number;
    Price ?: number;
    Stock ?: number;
    PredictedAmountSold ?: number;
 }

export interface Sale{
    ID ?: number;
    TransID ?: number;
    ProdID ?: number;
    ProdName ?: string;
    ProdType ?: string;
    UnitPrice ?: number;
    AmtSold ?: number;
}

export interface Transaction{
    ID ?: number;
    EmployeeID ?: number;
    Status ?: number;
    Date ?: Date;
}

export interface ProdType{
    ID ?: number;
    Description ?: string;
}

export interface Employee{
    ID ?: number;
    FirstName ?: string;
    LastName ?: string;
}