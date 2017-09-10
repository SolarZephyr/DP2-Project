export interface Product{
   ID ?: number;
   Name ?: string;
   Type ?: number;
   Price ?: number;
   Stock ?: number;
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