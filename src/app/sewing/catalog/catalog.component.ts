import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, of, throwError } from 'rxjs';
import { ProductService } from 'src/app/models/productService';
import { ProductServicePost } from 'src/app/models/productServicePost';
import { MenuServicesService } from 'src/app/services/menu-services.service';
import { ProductServicesBackService } from 'src/app/services/product-services-back.service';
import { Constants } from 'src/app/shared/constants';
import { DialogFormComponent } from './dialog-form/dialog-form.component';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  catalog!:ProductServicePost;
  listSewings: ProductService[] = []; 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns: string[] = ['id','name', 'description','suggestedPrice', 'actions'];
  dataSource! : MatTableDataSource<any>;
  
  constructor(public dialog: MatDialog, 
              private _snackBar: MatSnackBar, 
              private productSBack:ProductServicesBackService,
              private menu:MenuServicesService){}
  
  ngOnInit():void{
    this.loadSewings();
    this.getProductsServicesList();
    this.menu.setMenuId("Catálogo composturas");
  }

  loadSewings(){
    this.listSewings=this.listSewings.slice();
    this.dataSource=new MatTableDataSource(this.listSewings);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  openDialog():void{
      const dialogRef = this.dialog.open(DialogFormComponent,{
        disableClose:true,
        autoFocus:false,
        data:{name:"", description: "", suggestedPrice:null}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.catalog = result;
        this.addNewSewing(this.catalog);
        } 
      });    
  }

  openDialogToEdit(element:ProductService,id:number):void{
    const dialogRef = this.dialog.open(DialogFormComponent,{
      disableClose:true,
      autoFocus:true,
      data:{suggestedPrice:element.suggestedPrice, 
            name:element.name, 
            description:element.description}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        element.id=element.id;
        element.name=result.name;
        element.description=result.description;
        element.suggestedPrice=result.suggestedPrice;

        this.productSBack.updateProductsServices(element, id).subscribe({
          next:(response)=>{
            this.showSnackBar(Constants.EDIT_SEWING, Constants.SNACK_SUCCESS);
            this.getProductsServicesList()           
          },
          error:(e)=>{
            this.showSnackBar(e.error,Constants.SNACK_ERROR);
          }
        });
      }
    });    
}

  deleteSewing(id: number){
    this.productSBack.deleteCustomer(id).subscribe({
      next:(response)=>{
        this.showSnackBar(Constants.DELETE_SEWING, Constants.SNACK_SUCCESS),
        this.getProductsServicesList()       
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

  addNewSewing(sewing:ProductServicePost){
    this.productSBack.createProductsServices(sewing).subscribe({
      next:(response)=>{
        this.showSnackBar(Constants.ADD_CLIENT,Constants.SNACK_SUCCESS);
        this.getProductsServicesList();       
      },
      error:(e)=>{
        this.showSnackBar(e.error,Constants.SNACK_ERROR);
      }
    });
  }

  getProductsServicesList(){
    this.productSBack.getProductsServices()
    .subscribe({
      next:(response)=> { 
          this.listSewings=response; 
          this.dataSource.data=this.listSewings; 
      },
      error: (e) => {
          this.showSnackBar(e.error,Constants.SNACK_ERROR);
      }
    });
  }
}