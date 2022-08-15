import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {


   tiles: Tile[] = [
    {text: 'ACR', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'GVS', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'GVN', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'ADULTI', cols: 1, rows: 1, color: '#DDBDF1'},
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  apriSettore(settore: string){
    this.router.navigate(['/settore/'+ settore]);
  }
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
