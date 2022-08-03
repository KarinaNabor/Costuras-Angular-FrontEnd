import { Component, IterableDiffers, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Customers } from 'src/app/models/customers';
import { ProductService } from 'src/app/models/productService';
import { ServiceCustomer } from 'src/app/models/serviceCustomer';
import { ServiceCustomersListPost } from 'src/app/models/servicesCustomerListPost';
import { CustomersBackService } from 'src/app/services/customers-back.service';
import { MenuServicesService } from 'src/app/services/menu-services.service';
import { OrdersBackService } from 'src/app/services/orders-back.service';
import { ProductServicesBackService } from 'src/app/services/product-services-back.service';
import { Constants } from 'src/app/shared/constants';
import { DialogFormOrderComponent } from './dialog-form-order/dialog-form-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  listOrders: Array<ServiceCustomer> = []; 
  listCustomer: Array<Customers> = []; 
  listProductServices: Array<ProductService>=[];
  public displayedColumns: string[] = ['id','codeClothing','descriptionService', 'typeService', 'price',
                                      'registrationDate','deliveryDate','status','actions'];
  dataSource! : MatTableDataSource<any>;
  order!:ServiceCustomersListPost;
  customerName:string="";
  idCustomer!:number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog:MatDialog, public orderBack:OrdersBackService,
              public customersBack:CustomersBackService, 
              public productServicesBack:ProductServicesBackService,
              private _snackBar: MatSnackBar,
              private menu:MenuServicesService) { }

  ngOnInit(): void {
    this.loadServiceCustomer();
    this.getCustomer();
    this.getProductService();
    this.menu.setMenuId("Nuevo pedido")
  }

  loadServiceCustomer(){
    this.listOrders=this.listOrders.slice();
    this.dataSource=new MatTableDataSource(this.listOrders);
  } 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog():void{
    const dialogRef = this.dialog.open(DialogFormOrderComponent,{
      disableClose:true,
      autoFocus:false,
      data:{customers:this.listCustomer,sewings:this.listProductServices}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.order=result;
        this.idCustomer=this.order.serviceCustomersList[0].customerId;
        this.addListOrder(this.order);
      } 
      this.getProductService();
      this.getCustomer();
    });    
  }

  getCustomer(){
    this.customersBack.getCustomers().subscribe({
      next:(response)=>{
          if(response){
          this.listCustomer=response;
          }   
      },
      error:(e)=>{
        this.showSnackBar(e.error,Constants.SNACK_ERROR);
      }
    });   
  }

  getProductService(){
    this.productServicesBack.getProductsServices().subscribe({
      next:(response)=>{
        if(response){
          this.listProductServices=response;
        }
      },
      error:(e)=>{
        this.showSnackBar(e.error,Constants.SNACK_ERROR);
      }
    });
  }

  addListOrder(orders:ServiceCustomersListPost){
    this.orderBack.createOrder(orders).subscribe({
      next:(response)=>{
        this.showSnackBar(Constants.ADD_ORDERS,Constants.SNACK_SUCCESS);
        this.getListOrderByCustomer();
        this.getCustomerName();
      },
      error:(e)=>{
        this.showSnackBar(e.error,Constants.SNACK_ERROR);
      }
    });
  }

  UpdateListOrders(orders:ServiceCustomersListPost){
    this.orderBack.UpdateOrders(orders).subscribe({
      next:(response)=>{
        this.showSnackBar(Constants.EDIT_ORDER,Constants.SNACK_SUCCESS);
        this.getListOrderByCustomer();
        this.getCustomerName();
      },
      error:(e)=>{
        this.showSnackBar(e.error,Constants.SNACK_ERROR);
      }
    });
  }

  showSnackBar(message:string, snackType:string){
    this._snackBar.open(message,'',{
      duration:3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass:[snackType]
    })
  }

  getListOrderByCustomer(){
    this.orderBack.getOrdersByCustomer(this.idCustomer).subscribe({
      next:(response)=>{
        this.listOrders = response.map((order)=>{
          return {
            id: order.id,
            customerId: order.customerId,
            productServiceId: order.productServiceId,
            realPrice: order.realPrice,
            registrationDate: order.registrationDate,
            deliveryDate: order.deliveryDate,
            status:order.status,
            descriptionService:order.descriptionService,
            statusPaid:order.statusPaid,
            productServiceName:this.listProductServices.find(x=>x.id==order.productServiceId)?.name,
            codeClothing:order.codeClothing,
            codeShort:order.codeClothing.substring(0,8).toLocaleUpperCase(),
            associateId:order.associateId
          }
        }); 
        this.dataSource.data = this.listOrders;
      },
      error:(e)=>{
        this.showSnackBar(e.error,Constants.SNACK_ERROR);
      }
    });
  }

  getCustomerName(){
    let customer:Customers= this.listCustomer.find(x=>x.id==this.idCustomer) as Customers;
    this.customerName = customer.name + " "+ customer.paternalSurname + " "+customer.maternalSurname;
  }

  deleteOrderById(id:number){
    this.orderBack.deleteOrder(id).subscribe({
      next:(response)=>{
        this.showSnackBar(Constants.DELETE_ORDER,Constants.SNACK_SUCCESS);
        this.getListOrderByCustomer();
      },
      error:(e)=>{
        this.showSnackBar(e.error,Constants.SNACK_ERROR);
      }
    });
  }
  
  openDialogToEdit(element:ServiceCustomer,id:number):void{
    var listOrdersOfCustomer=this.listOrders.filter(x=>x.codeClothing==element.codeClothing);
    const dialogRef = this.dialog.open(DialogFormOrderComponent,{
      disableClose:true,
      autoFocus:false,
      data:{customers:this.listCustomer,
            sewings:this.listProductServices,
            orders:listOrdersOfCustomer, 
            customer:element.customerId,
            code:element.codeClothing,
            deliveryDate:element.deliveryDate,
            descriptionService:element.descriptionService,
            statusPaid:element.statusPaid
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.order=result;
        this.idCustomer=this.order.serviceCustomersList[0].customerId;
        for(let i=0;i<this.order.serviceCustomersList.length;i++){
          this.order.serviceCustomersList[i].codeClothing=element.codeClothing;
          this.order.serviceCustomersList[i].registrationDate=element.registrationDate;
        }
        this.UpdateListOrders(this.order);
      } 
      this.getProductService();
      this.getCustomer();
    });    
  }
}