import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  breakpoint: any = 1;

   tiles: Tile[] = [
    {text: 'ACR', cols: 1, rows: 1},
    {text: 'GVS', cols: 1, rows: 1},
    {text: 'GVN', cols: 1, rows: 1},
    {text: 'ADULTI', cols: 1, rows: 1},
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth < 1000) ? 1 : 2;
  }

  apriSettore(settore: string){
    this.router.navigate(['/settore/'+ settore]);
  }

  onResize(){
    this.breakpoint = (window.innerWidth < 1000) ? 1 : 2;
  }
}

export interface Tile {
  color?: string;
  background?: string;
  cols: number;
  rows: number;
  text: string;
}
