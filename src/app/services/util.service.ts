import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private baseUrl: string;
  openSidebarEvent = new EventEmitter<boolean>();
  public isSidebarOpen : boolean = false;

  refreshIntervalEvent = new EventEmitter<boolean>();

  constructor() {
    this.baseUrl= ""
   }
}
