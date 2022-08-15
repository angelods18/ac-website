import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settore',
  templateUrl: './settore.component.html',
  styleUrls: ['./settore.component.scss']
})
export class SettoreComponent implements OnInit {

  public settore: string = '';
  public search_term:any = '';

  constructor(
     private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.settore=params.params.settore;
    });
  }

  keypress(event:any){

  }

  onSearchSubmit(){
    console.log(this.search_term);
  }
}
