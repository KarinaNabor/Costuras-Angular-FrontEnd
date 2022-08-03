import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceCustomer } from 'src/app/models/serviceCustomer';

@Component({
  selector: 'app-view-description',
  templateUrl: './view-description.component.html',
  styleUrls: ['./view-description.component.css']
})
export class ViewDescriptionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ServiceCustomer,
              public dialogRef: MatDialogRef<ViewDescriptionComponent>,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
