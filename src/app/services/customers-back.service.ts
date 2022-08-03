import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tokenGetter } from '../app.module';
import { Customers } from '../models/customers';
import { CustomersPost } from '../models/customersPost';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CustomersBackService {
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

  public getCustomers():Observable<Customers[]>{ 
    return this.http.get<Customers[]>(this.apiURL+Constants.GET_CUSTOMER_SERVICE, this.httpOptions);    
  }

  public createCustomer(customer: CustomersPost): Observable<CustomersPost>{
    return this.http.post<CustomersPost>(this.apiURL+Constants.POST_CUSTOMER_SERVICE, customer, this.httpOptions);
  }

  public deleteCustomer(id:number): Observable<{}>{
    var urlApi = this.apiURL+Constants.DELETE_CUSTOMER_SERVICE;
    urlApi=`${urlApi}/${id}`;

    return this.http.delete(urlApi,this.httpOptions);
  }
  
  public updateCustomers(customer: CustomersPost, id:number){
    var urlApi = this.apiURL+Constants.PUT_CUSTOMER_SERVICE;
    return this.http.put(`${urlApi}/${id}`, customer, this.httpOptions);
  }
}