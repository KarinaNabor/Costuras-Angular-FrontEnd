import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuServicesService {

  public idMenu: BehaviorSubject<string> = new BehaviorSubject("");
  constructor() { }

  getMenuId(): Observable<string> {
    return this.idMenu.asObservable();
}

setMenuId(menuId: string) {
    this.idMenu.next(menuId);
}

}
