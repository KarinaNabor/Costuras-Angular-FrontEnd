import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Customers } from 'src/app/models/customers';
import { CustomersPost } from 'src/app/models/customersPost';
import { CustomersBackService } from 'src/app/services/customers-back.service';
import { MenuServicesService } from 'src/app/services/menu-services.service';
import { Constants } from 'src/app/shared/constants';
import { DialogFormClientComponent } from './dialog-form-client/dialog-form-client.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{
  subscription!:Subscription;
  client!:CustomersPost;
  listClients: Array<Customers> = []; 
  public displayedColumns: string[] = ['id','name', 'paternalSurname', 'maternalSurname','phone', 'email','actions'];
  dataSource! : MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _snackBar: MatSnackBar, 
              public dialog:MatDialog, 
              private customerBack:CustomersBackService,
              private menu:MenuServicesService) { }

  ngOnInit(): void {
    this.loadClients(); 
    this.getCustomersList();  
    this.menu.setMenuId("Clientes");
  }

  loadClients(){
    this.listClients=this.listClients.slice();
    this.dataSource=new MatTableDataSource(this.listClients);
  } 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteClient(id:number){
    this.customerBack.deleteCustomer(id).subscribe({
      next:(response)=>{
        this.showSnackBar(Constants.DELETE_CLIENT,Constants.SNACK_SUCCESS),
        this.getCustomersList()
      },
      error:(e)=>{
        this.showSnackBar(e.error,Constants.SNACK_ERROR);
      }
    });
  }

  openDialog():void{
    const dialogRef = this.dialog.open(DialogFormClientComponent,{
      disableClose:true,
      autoFocus:false,
      data:{name:"", paternalSurname:"", maternalSurname:"",phone:"",email:""}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
      this.client = result;
      this.addNewClient(this.client);
      } 
    });    
  }

  addNewClient(client:CustomersPost){
    this.customerBack.createCustomer(client).subscribe({
      next:(response)=> {
        this.showSnackBar(Constants.ADD_CLIENT,Constants.SNACK_SUCCESS);
        this.getCustomersList(); 
      },
      error:(e)=>{
        this.showSnackBar(e.error,Constants.SNACK_ERROR);
      }
    }); 
  }

  openDialogToEdit(element:Customers,id:number):void{
    const dialogRef = this.dialog.open(DialogFormClientComponent,{
      disableClose:true,
      autoFocus:true,
      data:{name:element.name, 
            paternalSurname:element.paternalSurname, 
            maternalSurname:element.maternalSurname,
            phone:element.phone,email:element.email}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        element.id=element.id;
        element.name=result.name;
        element.paternalSurname=result.paternalSurname;
        element.maternalSurname=result.maternalSurname;
        element.phone=result.phone;
        element.email=result.email;
        this.customerBack.updateCustomers(element,id).subscribe({
          next:(response)=>{
            this.getCustomersList(); 
            this.showSnackBar(Constants.EDIT_CLIENT, Constants.SNACK_SUCCESS);
          },
          error:(e)=>{
            this.showSnackBar(e.error,Constants.SNACK_ERROR);
          }
        });
      }
    });    
  }

  showSnackBar(message:string, snackType:string){
    this._snackBar.open(message,'',{
      duration:3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass:[snackType]
    });
  }

  getCustomersList(){
    this.customerBack.getCustomers().subscribe({
      next:(response)=> {
        this.listClients = response; 
        this.dataSource.data = this.listClients;
      },
      error: (e) => {
        this.showSnackBar(e.error,Constants.SNACK_ERROR);
      }, 
    }); 
  }

}