import { Customers } from "./customers";
import { ProductService } from "./productService";
import { ServiceCustomer } from "./serviceCustomer";

export interface ServicesAndCustomers{
    customers: Array<Customers> ; 
    sewings: Array<ProductService>;
    orders:Array<ServiceCustomer>;
    customer:number;
    deliveryDate:Date;
    descriptionService:string;
    statusPaid:number;
}