import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductServicePost } from 'src/app/models/productServicePost';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css']
})
export class DialogFormComponent implements OnInit {
  form: FormGroup
  constructor(private fb:FormBuilder, public dialogRef: MatDialogRef<DialogFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: ProductServicePost) {
    this.form=this.fb.group({
      name:['', Validators.required],
      description:[''],
      suggestedPrice:[0, (Validators.required,Validators.min(5))]
    });
   }

  ngOnInit(): void {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}