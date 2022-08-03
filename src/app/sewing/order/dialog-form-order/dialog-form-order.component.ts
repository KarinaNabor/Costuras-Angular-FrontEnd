import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { ServicesAndCustomers } from 'src/app/models/ServicesAndCustomers';
import { Customers } from 'src/app/models/customers';
import { ProductService } from 'src/app/models/productService';
import { DialogEditPriceComponent } from './dialog-edit-price/dialog-edit-price.component';
import { ServiceCustomersListPost } from 'src/app/models/servicesCustomerListPost';
import { ServiceCustomerPost } from 'src/app/models/serviceCustomerPost';
import { StatusPaid } from 'src/app/enums/statusPaid';
import { ServiceCustomer } from 'src/app/models/serviceCustomer';
import { SelectStatusPaid } from 'src/app/models/selectStatusPaid';

@Component({
  selector: 'app-dialog-form-order',
  templateUrl: './dialog-form-order.component.html',
  styleUrls: ['./dialog-form-order.component.css']
})

export class DialogFormOrderComponent implements OnInit {
  sewingSelected = new FormControl();
  sewingsList!:Array<ProductService>;
  myControl = new FormControl();
  options!: Array<Customers>;
  filteredOptions!: Observable<Customers[]>;
  checked:boolean=false;
  finalPrice:number=0;
  serviceCustomersListPost:ServiceCustomersListPost={} as ServiceCustomersListPost;
  idCustomer!:number;
  dateDelivery:Date=new Date;
  descriptionServices!:string;
  enumKeys:any[]=[];
  enumPaid=StatusPaid;
  orders!:Array<ServiceCustomer>;
  serviceComplete!:ServiceCustomer;
  selectedValue!: number;
  nameCustomer:string="";
  customer!:Customers;

  statusOptions: SelectStatusPaid[] = [
    {id: 1, paidStatus: 'No pagado'},
    {id: 0, paidStatus: 'Pagado'},
    {id: 2, paidStatus: 'Adelanto'},
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogFormOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ServicesAndCustomers,
    public dialog:MatDialog
    ) {
    this.filteredOptions = this.myControl.valueChanges.pipe
    (
      debounceTime(500),
      startWith(''),
      map(user=>(user?this._filter(user):this.options.slice())),);
   }

  ngOnInit(): void {
    this.options=this.data.customers; 
    this.sewingsList=this.data.sewings;
    this.orders=this.data.orders;
    this.getCustomerOrder();
    this.myControl.setValue(this.nameCustomer);
    this.setExistingSewing();
    this.setValuesEdit();
  }

  setExistingSewing(){
    if(this.orders){
      var newListSewings:Array<ProductService>=[];
      for(let i=0;i<this.orders.length;i++){
        let item:ProductService=this.sewingsList.find(x=>x.id==this.orders[i].productServiceId) as ProductService;
        item.suggestedPrice=this.orders[i].realPrice;
        newListSewings.push(item);
      }    
      this.sewingSelected.setValue(newListSewings);
      this.totalPriceSum();
      this.idCustomer=this.data.customer;
    }
  }
  
  setValuesEdit(){
    if(this.orders){
      this.descriptionServices=this.data.descriptionService;
      this.selectedValue=this.data.statusPaid;
    }
  }

  private _filter(value: string): Customers[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(user => 
        user.name.toLowerCase().includes(filterValue)
      );
  }

  getCustomerId(item:any){
    this.idCustomer=item.id;
  }

  OnDateDelivery(event:any){
    this.dateDelivery=event;
  }

  onSewingChange(item:ProductService){
      item.active=!item.active;
      this.totalPriceSum();   
  }

  viewPrice(item:ProductService){
    const dialogRef = this.dialog.open(DialogEditPriceComponent,{
      disableClose:true,
      autoFocus:true,
      data:{price:item.suggestedPrice}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        item.suggestedPrice = result.price;
        this.totalPriceSum(); 
      }
    });
  }

  totalPriceSum(){
    var sumPrice=0;
    for(let i=0; i<this.sewingsList.length;i++){
      if(this.sewingsList[i].active){
        sumPrice=this.sewingsList[i].suggestedPrice + sumPrice;
      }
      this.finalPrice=sumPrice;
    }
  }

  createPostList(){
    let serviceCustomersList:ServiceCustomerPost[]=[];
    let valueStatus=this.statusOptions.find(x=>x.id==this.selectedValue) as SelectStatusPaid;
    for(let i=0; i<this.sewingsList.length;i++){
      if(this.sewingsList[i].active){
        let serviceCustomerPost={} as ServiceCustomerPost;
        serviceCustomerPost.customerId=this.idCustomer;
        serviceCustomerPost.productServiceId=this.sewingsList[i].id;
        serviceCustomerPost.realPrice=this.sewingsList[i].suggestedPrice;
        serviceCustomerPost.deliveryDate=this.dateDelivery;
        serviceCustomerPost.status=0;
        serviceCustomerPost.statusPaid=valueStatus.id;
        serviceCustomerPost.descriptionService=this.descriptionServices;

        serviceCustomersList.push(serviceCustomerPost);
      }
    }
    this.serviceCustomersListPost.serviceCustomersList=serviceCustomersList;
  }

  getCustomerOrder(){
    this.customer= this.options.find(x=>x.id==this.data.customer) as Customers;
    if(this.customer){
      this.nameCustomer=this.customer.name + " "+ this.customer.paternalSurname + " "+this.customer.maternalSurname;
    }
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}