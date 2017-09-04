export interface Product{
   ID ?: number;
   Name ?: string;
   Type ?: string;
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