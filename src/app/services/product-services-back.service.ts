import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tokenGetter } from '../app.module';
import { ProductService } from '../models/productService';
import { ProductServicePost } from '../models/productServicePost';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductServicesBackService {
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

  public getProductsServices():Observable<ProductService[]>{ 
    return this.http.get<ProductService[]>(this.apiURL+Constants.GET_PRODUCTSERVICE_SERVICE, this.httpOptions);    
  }

  public createProductsServices(service: ProductServicePost): Observable<ProductServicePost>{
    return this.http.post<ProductServicePost>(this.apiURL+Constants.POST_PRODUCTSERVICE_SERVICE, service, this.httpOptions);
  }

  public updateProductsServices(productService: ProductService, id:number){
    var urlApi = this.apiURL+Constants.PUT_PRODUCTSERVICE_SERVICE;
    return this.http.put(`${urlApi}/${id}`, productService, this.httpOptions);
  }

  public deleteCustomer(id:number): Observable<{}>{
    var urlApi = this.apiURL+Constants.DELETE_PRODUCTSERVICE_SERVICE;
    urlApi=`${urlApi}/${id}`;

    return this.http.delete(urlApi, this.httpOptions);
  }
}
