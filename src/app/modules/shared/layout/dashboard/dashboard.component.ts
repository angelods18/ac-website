import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UtilService } from 'src/app/services/util.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  openedMenu: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(
    private _router: Router,
    private _dashboardService: DashboardService,
    private utilService: UtilService
  ) {

  }

  ngOnInit(): void {
    this._router.events.subscribe((val) => {
      this.openedMenu = false;
      this.utilService.isSidebarOpen = this.openedMenu;
      this.utilService.openSidebarEvent.emit(this.openedMenu);
    });

    this._dashboardService.menuOpened$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((open: boolean)=>{
      this.openedMenu = open;
    })
  }

  ngOnDestroy(): void{
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
