import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { ClientComponent } from './client/client.component';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { SewingComponent } from './sewing.component';

const routes: Routes = [{ path: '', component: SewingComponent, children:[
  {path:'',component:HomeComponent},
  {path:'clientes',component:ClientComponent},
  {path:'composturas',component:CatalogComponent},
  {path:'registro-pedido',component:OrderComponent},
  {path:'pedidos-completados',component:CompletedOrdersComponent},
] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SewingRoutingModule { }
