import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-quicksurvey',
  templateUrl: './quicksurvey.component.html',
  styleUrls: ['./quicksurvey.component.scss']
})
export class QuicksurveyComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<QuicksurveyComponent>) { 
   

  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();

  }
}
