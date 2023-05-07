import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ControlService } from 'src/app/control/control.service';

@Component({
  selector: 'app-add-control-dialog',
  templateUrl: './add-control-dialog.component.html',
  styleUrls: ['./add-control-dialog.component.scss']
})
export class AddControlDialogComponent implements OnInit {

  isLoadingSubmit: boolean = false;
  
  controlForm = new FormGroup({
    appName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    appURL: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    appMenuName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    appRoute: new FormControl('', [

      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    appIcon: new FormControl('', [
      Validators.minLength(3),
    ]),
    status: new FormControl(false),
    order: new FormControl(0),
    type: new FormControl([]),
  })

  constructor(private controlService: ControlService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addControl(){
      this.isLoadingSubmit = true;
    if (this.controlForm.invalid) {
      this.isLoadingSubmit = false;

      return;
    }

    console.log(this.controlForm.value);
    

    this.controlService.controlAddNew(this.controlForm.value).subscribe({
      next: (v) => {
        this.isLoadingSubmit = false;

        console.log(v);
        
        
        this.dialog.closeAll();

      },
      error: ({error}) => {
       if (error.appName || error.appURL || error.appURL ) {
         this.controlForm.setErrors({credentials: true})
       }
      }
    })

  }

  

}
