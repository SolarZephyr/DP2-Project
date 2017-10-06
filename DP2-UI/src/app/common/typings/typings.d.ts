export interface Product{
   ID ?: number;
   Name ?: string;
   Price ?: number;
   Stock ?: number;
   Description ?: string;
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