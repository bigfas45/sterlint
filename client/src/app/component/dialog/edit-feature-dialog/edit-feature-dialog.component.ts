import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ControlService } from 'src/app/control/control.service';


@Component({
  selector: 'app-edit-feature-dialog',
  templateUrl: './edit-feature-dialog.component.html',
  styleUrls: ['./edit-feature-dialog.component.scss']
})
export class EditFeatureDialogComponent implements OnInit {

  controlSubFeatureForm = new FormGroup({
    appControlId: new FormControl(this.data.controlFeatureInfo.appControlId, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    featureId: new FormControl(this.data.controlFeatureInfo.featureId, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    featureName: new FormControl(this.data.controlFeatureInfo.featureName, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    featureRoute: new FormControl(this.data.controlFeatureInfo.featureRoute, [
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
  })

  isLoadingUpdateBtn: boolean = false;


  constructor(
    private controlService: ControlService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  updateSubFeature(){
    this.isLoadingUpdateBtn = true;
    if (this.controlSubFeatureForm.invalid) {
      return;
    }

      this.controlService.controlSubFeaturesUpdate(this.controlSubFeatureForm.value, this.data.controlFeatureInfo.id).subscribe({
        next: (res) => {

          this.controlSubFeatureForm.reset();          
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
