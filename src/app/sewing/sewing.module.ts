import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SewingRoutingModule } from './sewing-routing.module';
import { SewingComponent } from './sewing.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MatTableModule } from '@angular/material/table';
import { CatalogComponent } from './catalog/catalog.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { DialogFormComponent } from './catalog/dialog-form/dialog-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ClientComponent } from './client/client.component';
import { DialogFormClientComponent } from './client/dialog-form-client/dialog-form-client.component';
import { OrderComponent } from './order/order.component';
import { DialogFormOrderComponent } from './order/dialog-form-order/dialog-form-order.component';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { DialogEditPriceComponent } from './order/dialog-form-order/dialog-edit-price/dialog-edit-price.component';
import {MatChipsModule} from '@angular/material/chips';
import { ViewDescriptionComponent } from './home/view-description/view-description.component';
import { EditOrderComponent } from './home/edit-order/edit-order.component';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';

@NgModule({
  declarations: [
    SewingComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent, 
    CatalogComponent, 
    DialogFormComponent, 
    ClientComponent, 
    DialogFormClientComponent, 
    OrderComponent, 
    DialogFormOrderComponent, 
    DialogEditPriceComponent, 
    ViewDescriptionComponent, EditOrderComponent, CompletedOrdersComponent
  ],
  imports: [
    CommonModule,
    SewingRoutingModule, 
    MatTableModule, 
    FormsModule,
    ReactiveFormsModule, 
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,  
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatCardModule,
    MatChipsModule
  ],
  exports:[
    MatTableModule, 
    MatIconModule, 
    MatToolbarModule,
    MatTooltipModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatCardModule,
    MatChipsModule
  ]
})
export class SewingModule { }
