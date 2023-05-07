import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-successbox',
  templateUrl: './successbox.component.html',
  styleUrls: ['./successbox.component.scss']
})
export class SuccessboxComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef< SuccessboxComponent >,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }

  ngOnInit(): void {
  }

 
  done(){
    this.dialogRef.close();
    
  }
 
}

 
