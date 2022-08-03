import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tokenGetter } from '../app.module';
import { ServiceCustomer } from '../models/serviceCustomer';
import { ServiceCustomersListPost } from '../models/servicesCustomerListPost';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class OrdersBackService {
  apiURL = environment.apiURL;
  token = tokenGetter();
  headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': '*/*',
     'Authorization': "Bearer "+this.token
  });

  httpOptions = {
    headers: this.headers_object
  };
  constructor(private http:HttpClient) { }

  public getOrders():Observable<ServiceCustomer[]>{ 
    return this.http.get<ServiceCustomer[]>(this.apiURL+Constants.GET_SERVICECUSTOMER_SERVICE,this.httpOptions);    
  }

  public getOrdersCompleted():Observable<ServiceCustomer[]>{
    return this.http.get<ServiceCustomer[]>(this.apiURL+Constants.GET_SERVICECUSTOMER_COMPLETE_SERVICE,this.httpOptions); 
  }

  public createOrder(order: ServiceCustomersListPost): Observable<ServiceCustomersListPost>{
    return this.http.post<ServiceCustomersListPost>(this.apiURL+Constants.POST_SERVICECUSTOMER_SERVICE, order, this.httpOptions);
  }

  public getOrdersByCustomer(id:number): Observable<ServiceCustomer[]>{
    var urlApi = this.apiURL+Constants.GETBYCUSTOMER_SERVICECUSTOMER_SERVICE;
    urlApi=`${urlApi}/${id}/orders`;

    return this.http.get<ServiceCustomer[]>(urlApi, this.httpOptions);
  }

  public deleteOrder(id:number): Observable<{}>{
    var urlApi = this.apiURL+Constants.DELETE_SERVICECUSTOMER_SERVICE;
    urlApi=`${urlApi}/${id}`;

    return this.http.delete(urlApi, this.httpOptions);
  }

  public updateOrder(serviceCustomer: ServiceCustomer, id:number){
    var urlApi = this.apiURL+Constants.PUT_SERVICECUSTOMER_SERVICE;
    return this.http.put(`${urlApi}/${id}`, serviceCustomer, this.httpOptions);
  }

  public UpdateOrders(orders: ServiceCustomersListPost): Observable<ServiceCustomersListPost>{
    var urlApi = this.apiURL+Constants.PUT_SERVICESCUSTOMER_SERVICE;
    return this.http.put<ServiceCustomersListPost>(urlApi,orders, this.httpOptions);
  }

}