import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectStatusOrder } from 'src/app/models/selectStatusOrder';
import { SelectStatusPaid } from 'src/app/models/selectStatusPaid';
import { ServiceCustomerPost } from 'src/app/models/serviceCustomerPost';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  statusOrderOptions: SelectStatusOrder[] = [
    {id: -1, orderStatus: ''},
    {id: 0, orderStatus: 'Pendiente'},
    {id: 1, orderStatus: 'En proceso'},
    {id: 2, orderStatus: 'Retrasado'},
    {id: 3, orderStatus: 'Terminado'},
    {id: 4, orderStatus: 'Entregado'},
  ];

  statusOptions: SelectStatusPaid[] = [
    {id: -1, paidStatus: ''},
    {id: 0, paidStatus: 'Pagado'},
    {id: 1, paidStatus: 'No pagado'},
    {id: 2, paidStatus: 'Adelanto'},
  ];

  constructor( 
              public dialogRef: MatDialogRef<EditOrderComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: ServiceCustomerPost) {
               }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
