import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-settore-card',
  templateUrl: './settore-card.component.html',
  styleUrls: ['./settore-card.component.scss']
})
export class SettoreCardComponent implements OnInit {

  @Input() incontro: any;
  
  constructor() { }

  ngOnInit(): void {
  }

  apriIncontro(){
    
  }
}
