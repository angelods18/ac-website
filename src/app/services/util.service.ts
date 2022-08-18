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

   checkLocaleDateString(localDate:string){
    let datePart = localDate.split('/');
    if(datePart[0].length===1){
      datePart[0]='0'+datePart[0];
    }
    if(datePart[1].length===1){
      datePart[1]='0'+datePart[1];
    }
    return datePart[2]+'-'+datePart[1]+'-'+datePart[1]+'T00:00:00.000Z';
   }
}
