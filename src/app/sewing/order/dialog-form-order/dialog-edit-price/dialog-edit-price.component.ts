import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditPrice } from 'src/app/models/editPrice';

@Component({
  selector: 'app-dialog-edit-price',
  templateUrl: './dialog-edit-price.component.html',
  styleUrls: ['./dialog-edit-price.component.css']
})
export class DialogEditPriceComponent implements OnInit {
  form: FormGroup;
  constructor(private fb:FormBuilder,public dialogRef: MatDialogRef<DialogEditPriceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditPrice) { 
      this.form=this.fb.group({
        price:[0, (Validators.min(5))],
      });
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
