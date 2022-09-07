import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-insert-credentials',
  templateUrl: './insert-credentials.component.html',
  styleUrls: ['./insert-credentials.component.scss']
})
export class InsertCredentialsComponent implements OnInit {

  credentials: any = {};

  constructor(
    public dialogRef: MatDialogRef<InsertCredentialsComponent>
  ) { }

  ngOnInit(): void {
  }

  continue(){
    this.dialogRef.close(this.credentials);
  }

  close(){
    this.dialogRef.close();
  }

}
