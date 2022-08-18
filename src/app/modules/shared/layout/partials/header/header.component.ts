import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UtilService } from 'src/app/services/util.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject();
  isSidebarOpen: boolean = false;

  constructor(
    private  _dashboardService: DashboardService,
    private route: Router,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.isSidebarOpen = !this.isSidebarOpen;
    this.utilService.isSidebarOpen = this.isSidebarOpen;
    this.utilService.openSidebarEvent.emit(this.isSidebarOpen);
    this._dashboardService.toggleMenu();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}