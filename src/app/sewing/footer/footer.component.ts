import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  redirectToFacebook(){
    window.open("https://www.facebook.com/Costuras-Cristi-114614593561903");
  }

  redirectToWhatsApp(){
    window.open("https://wa.me/+527123142392?text=Costuras%20Cris");
  }
}
