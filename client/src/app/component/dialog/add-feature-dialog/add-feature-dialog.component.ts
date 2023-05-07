import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ControlService } from 'src/app/control/control.service';

@Component({
  selector: 'app-add-feature-dialog',
  templateUrl: './add-feature-dialog.component.html',
  styleUrls: ['./add-feature-dialog.component.scss']
})
export class AddFeatureDialogComponent implements OnInit {

  controlSubFeatureForm = new FormGroup({
    featureName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    featureRoute: new FormControl('', [

      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
  })

  constructor(
    private controlService: ControlService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  addSubFeature(){

    if (this.controlSubFeatureForm.invalid) {
      return;
    }
    console.log('control Id');
    console.log(this.data.controlId);    
    console.log('Payload');
    console.log(this.controlSubFeatureForm.value);
    
    
    this.controlService.controlFeaturesAdd(this.controlSubFeatureForm.value, this.data.controlId).subscribe({
      next: (res) => {
        this.controlSubFeatureForm.reset();
        console.log(res);
        
        this.dialog.closeAll();

      },
      error: ({error}) => {
       if (error.appName || error.appURL || error.appURL ) {
         this.controlSubFeatureForm.setErrors({credentials: true})
       }
      }
    })
  }


}
