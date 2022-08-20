import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoIncontroComponent } from '../info-incontro/info-incontro.component';

@Component({
  selector: 'app-settore-card',
  templateUrl: './settore-card.component.html',
  styleUrls: ['./settore-card.component.scss']
})
export class SettoreCardComponent implements OnInit {

  @Input() incontro: any;
  @Input() settore: string;
  
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log("incontro", this.incontro.id);
  }

  apriIncontro(){
    const dialogRef = this.dialog.open(InfoIncontroComponent, {
      width:'800px',
      data: {
        incontroId: this.incontro.id,
        settore: this.settore
      }
    })
  }
}
