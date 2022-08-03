import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MenuServicesService } from 'src/app/services/menu-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  susbcription!:Subscription;
  namePage:string="";
  constructor(private menu:MenuServicesService) { }

  ngOnInit(): void {
   this.susbcription=this.menu.getMenuId().subscribe(x=> this.namePage=x);
  }

  ngOnDestroy(): void {
    this.susbcription.unsubscribe();
  }

  logOut = () => {
    localStorage.removeItem("jwt");
  }
}
