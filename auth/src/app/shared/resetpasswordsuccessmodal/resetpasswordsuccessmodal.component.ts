import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resetpasswordsuccessmodal',
  templateUrl: './resetpasswordsuccessmodal.component.html',
  styleUrls: ['./resetpasswordsuccessmodal.component.scss']
})
export class ResetpasswordsuccessmodalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ResetpasswordsuccessmodalComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  resetpage(){
    this.router.navigate(['auth/newrestpasswordpage']);
    
    this.dialogRef.close();
    
   
  }
 
}




  
