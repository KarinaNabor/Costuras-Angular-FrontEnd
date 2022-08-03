import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticatedResponse } from '../models/authenticatedResponse';
import { Login } from '../models/login';
import { Constants } from '../shared/constants';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public hide = true;
  loading = false;
  apiURL = 'https://localhost:4200';
  invalidLogin!:boolean;
  credentials: Login = {userAccount:'', password:''};
  key="peluchin";
  constructor(private _snackBar: MatSnackBar, 
              private router:Router, 
              private http:HttpClient) {
  }

  ngOnInit(): void {
  }

  login = ( form: NgForm) => {
    if (form.valid) {
      let credentialsEnv: Login = {userAccount:'', password:''};
      credentialsEnv.userAccount = btoa(this.credentials.userAccount.trim()).toString();  
      credentialsEnv.password = btoa(this.credentials.password.trim()).toString();  
      this.http.post<AuthenticatedResponse>(this.apiURL+Constants.POST_ASSOCIATE_SERVICE, credentialsEnv, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          localStorage.setItem("jwt", token); 
          this.invalidLogin = false; 
          this.loading=true;
        setTimeout(() =>{
          this.router.navigateByUrl('/inicio');
        },1500);
        },
        error: (err: HttpErrorResponse) => {
          this.invalidLogin = true,
          this.loading=false,
          this.errorLogin();
          this.credentials.password='';
          this.credentials.userAccount='';
        }  
      })
    }
  }

  errorLogin(){
    this._snackBar.open('Usuario o contraseña incorrecta, intentelo de nuevo.','',{
      duration:5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass:['error']
    })
  }
}
