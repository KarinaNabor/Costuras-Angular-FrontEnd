import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Customers } from 'src/app/models/customers';
import { ProductService } from 'src/app/models/productService';
import { SelectStatusOrder } from 'src/app/models/selectStatusOrder';
import { SelectStatusPaid } from 'src/app/models/selectStatusPaid';
import { ServiceCustomer } from 'src/app/models/serviceCustomer';
import { CustomersBackService } from 'src/app/services/customers-back.service';
import { MenuServicesService } from 'src/app/services/menu-services.service';
import { OrdersBackService } from 'src/app/services/orders-back.service';
import { ProductServicesBackService } from 'src/app/services/product-services-back.service';
import { Constants } from 'src/app/shared/constants';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { ViewDescriptionComponent } from './view-description/view-description.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listOrders: ServiceCustomer[] = []; 
  listOrdersFilter: ServiceCustomer[] = []; 
  listCustomers: Array<Customers> = []; 
  listProductServices: Array<ProductService>=[];
  dataSource! : MatTableDataSource<any>;
  public displayedColumns: string[] = ['codeClothing','nameCustomer', 'typeService', 'price',
                                      'registrationDate','deliveryDate','status','statusPaid','actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dateDeliveryfilter?: Date;
  selectedValuePaidFilter!: number;
  selectedValueStatusOrder!:number;
  nameCustomerFilter:string="";
  dateFilter?:any;

  statusOptions: SelectStatusPaid[] = [
    {id: -1, paidStatus: ''},
    {id: 0, paidStatus: 'Pagado'},
    {id: 1, paidStatus: 'No pagado'},
    {id: 2, paidStatus: 'Adelanto'},
  ];

  statusOrderOptions: SelectStatusOrder[] = [
    {id: -1, orderStatus: ''},
    {id: 0, orderStatus: 'Pendiente'},
    {id: 1, orderStatus: 'En proceso'},
    {id: 3, orderStatus: 'Terminado'},
    {id: 2, orderStatus: 'Retrasado'},
    {id: 4, orderStatus: 'Entregado'},
  ];

  constructor(private menu:MenuServicesService,
              public orderBack:OrdersBackService,
              public customersBack:CustomersBackService, 
              public productServicesBack:ProductServicesBackService,
              private _snackBar: MatSnackBar,
              private dialog:MatDialog,
              public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getCustomer();
    this.getProductService();
    this.getAllOrders();  
    this.loadOrders(); 
    this.menu.setMenuId("Lista de pedidos");  
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadOrders(){
    this.listOrders=this.listOrders.slice();
    this.dataSource=new MatTableDataSource<ServiceCustomer>(this.listOrders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.data=this.listOrders;
  }

  loadFilterOrders(){
    this.listOrdersFilter=this.listOrdersFilter.slice();
    this.dataSource=new MatTableDataSource(this.listOrdersFilter);
    this.dataSource.paginator = this.paginator;
    this.dataSource.data=this.listOrdersFilter;
  }

  showSnackBar(message:string, snackType:string){
    this._snackBar.open(message,'',{
      duration:3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass:[snackType]
    });
  }

  getCustomer(){
    this.customersBack.getCustomers().subscribe({
      next:response=>{
        if(response){
        this.listCustomers=response;
        }   
      },
      error: (e) => {
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
      error: (e) => {
        this.showSnackBar(e.error,Constants.SNACK_ERROR);
      },
    });
  }

  getFullNameCustomer(id:number){
    let customer:Customers= this.listCustomers.find(x=>x.id==id) as Customers;
    return customer.name + " "+ customer.paternalSurname + " "+customer.maternalSurname;
  }

  getAllOrders(){
    this.orderBack.getOrders().subscribe({
      next:(orders)=>{
        this.listOrders=orders.map((order)=>{
          return{
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
            nameCustomer:this.getFullNameCustomer(order.customerId),
            associateId:order.associateId
          }
        })
        this.loadOrders()
      },
      error: (e) => {
        this.showSnackBar(e.error,Constants.SNACK_ERROR);
      }
    });
  }

  deleteOrderById(id:number){
    this.orderBack.deleteOrder(id).subscribe({
      next:response=>{
        this.showSnackBar(Constants.DELETE_ORDER,Constants.SNACK_SUCCESS);
        this.getAllOrders();
      },
      error: (e) => {
        this.showSnackBar(e.error,Constants.SNACK_ERROR);
      }
    })
  }

  filterByCustomer(event:any){
    this.nameCustomerFilter=(event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  filterByStatusPaid(){
    this.applyFilters()
  }   

  filterByDateDelivery(event:any){ 
    this.dateDeliveryfilter=event;
    this.dateFilter=this.datepipe.transform(this.dateDeliveryfilter,'dd/MM/yyyy');
    this.applyFilters();
  }

  filterByStatusOrder(){
    this.applyFilters();
  }

  applyFilters(){
    this.listOrdersFilter=[];
    let applyFilter:boolean=false;
    if(this.nameCustomerFilter.length>2){
      this.listOrdersFilter=this.listOrders.filter(
          x=>x.nameCustomer?.toLocaleLowerCase().includes(this.nameCustomerFilter.toLocaleLowerCase())
        );
      applyFilter=true;
    }
    if(this.listOrdersFilter.length>0 && this.selectedValuePaidFilter>=0){
      this.listOrdersFilter=this.listOrdersFilter.filter(
        x=>x.statusPaid==this.selectedValuePaidFilter
      ); 
      applyFilter=true;
    }
    else{
      if(this.selectedValuePaidFilter>=0){
        this.listOrdersFilter=this.listOrders.filter(
          x=>x.statusPaid==this.selectedValuePaidFilter
        );
        applyFilter=true;
      }
    }
    if(this.listOrdersFilter.length>0 && this.dateFilter){
      this.listOrdersFilter=this.listOrdersFilter.filter(
        date=>this.datepipe.transform(date.deliveryDate,'dd/MM/yyyy')==(this.dateFilter));
      applyFilter=true;
    }
    else{
      if(this.dateFilter){
        this.listOrdersFilter=this.listOrders.filter(
          date=>this.datepipe.transform(date.deliveryDate,'dd/MM/yyyy')==(this.dateFilter));
        applyFilter=true;
      }
    }
    if(this.listOrdersFilter.length>0 && this.selectedValueStatusOrder>=0){
      this.listOrdersFilter=this.listOrdersFilter.filter(
        x=>x.status==this.selectedValueStatusOrder
      ); 
      applyFilter=true;
    }
    else{
      if(this.selectedValueStatusOrder>=0){
        this.listOrdersFilter=this.listOrders.filter(
          x=>x.status==this.selectedValueStatusOrder
        );
        applyFilter=true;
      }
    }
    if(applyFilter){
      this.loadFilterOrders();
    }
    else{
      this.loadOrders();
    }
  }

  openDialogToDescription(element:ServiceCustomer,id:number):void{
    const dialogRef = this.dialog.open(ViewDescriptionComponent,{
      disableClose:true,
      autoFocus:true,
      data:{productServiceName:element.productServiceName, 
            descriptionService:element.descriptionService,
            status:element.status,
            realPrice:element.realPrice
          }
    });
  }

  openDialogToEdit(element:ServiceCustomer, id: number):void{
    const dialogRef = this.dialog.open(EditOrderComponent,{
      disableClose:true,
      autoFocus:true,
      data:{
        status:element.status,statusPaid:element.statusPaid,deliveryDate:element.deliveryDate
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        element.id=element.id;
        element.codeClothing=element.codeClothing;
        element.customerId=element.customerId;
        element.deliveryDate=result.deliveryDate;
        element.descriptionService=element.descriptionService;
        element.productServiceId=element.productServiceId;
        element.realPrice=element.realPrice;
        element.registrationDate=element.registrationDate;
        element.status=result.status;
        element.statusPaid=result.statusPaid;

        this.orderBack.updateOrder(element, id).subscribe({
          next:(response)=>{
            this.showSnackBar(Constants.EDIT_ORDER, Constants.SNACK_SUCCESS);
            this.getAllOrders();
          },
          error: (e) => {
            this.showSnackBar(e.error,Constants.SNACK_ERROR);
          }
        });
      }
    });
  }
  
}