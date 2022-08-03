import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customers } from 'src/app/models/customers';
import { CustomersPost } from 'src/app/models/customersPost';

@Component({
  selector: 'app-dialog-form-client',
  templateUrl: './dialog-form-client.component.html',
  styleUrls: ['./dialog-form-client.component.css']
})
export class DialogFormClientComponent implements OnInit {

  formCustomer!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogFormClientComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: CustomersPost) {}

  ngOnInit(): void {
    this.createForm();
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm(){
    this.formCustomer=new FormGroup({
      name:new FormControl ('', Validators.required),
      paternalSurname:new FormControl('', Validators.required),
      maternalSurname:new FormControl('', Validators.required),
      phone:new FormControl('', [Validators.required,Validators.maxLength(10)]),
      email:new FormControl('',Validators.email)
    });
  }
}
