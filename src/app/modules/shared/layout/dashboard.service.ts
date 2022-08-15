import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private menuOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loader: BehaviorSubject<string> = new BehaviorSubject('');
  private numNotifications: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private numMessages: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  menuOpened$: Observable<boolean>;
  loader$! : Observable<string>;
  numNotifications$! : Observable<number>;
  numMessages$! : Observable<number>;


  constructor() {
    this.menuOpened$ = this.menuOpened.asObservable();
    this.loader$ = this.loader.asObservable();
    this.numNotifications$ = this.numNotifications.asObservable();
    this.numMessages$ = this.numMessages.asObservable();
  }

  /**
   * chiude/apre la siebar
   */
  toggleMenu(): void{
    this.menuOpened.next(!this.menuOpened.value);
  }
  /**
  * apre la sidebar
  */
  openMenu(): void{
    this.menuOpened.next(true);
  }

  /**
   * chiude la sidebar
   */
  closeMenu(): void{
    this.menuOpened.next(false);
  }
}
