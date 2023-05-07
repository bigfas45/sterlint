import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ControlService } from 'src/app/control/control.service';

@Component({
  selector: 'app-create-web-advert-dialog',
  templateUrl: './create-web-advert-dialog.component.html',
  styleUrls: ['./create-web-advert-dialog.component.scss']
})
export class CreateWebAdvertDialogComponent implements OnInit {

  createAdvertForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100),
    ]),
    status:new FormControl(false),
    advertUri: new FormControl('', []),
  })

  myfile!: File;

  constructor(private controlService: ControlService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.myfile = event.target.files[0];
      // this.createAdvertForm.get('advertUri')?.setValue(file);
    }
  }


  addControl(){

   
      
    if (this.createAdvertForm.invalid) {
      return;
    }


    // const formData = new FormData();
    // formData.append('advertUri', this.myfile) 
    // formData.append('advertUri', 'dsdsdsds')    



    //     // @ts-ignore
    // formData.append('title', this.createAdvertForm.value.title)
    // // @ts-ignore
    // formData.append('description', this.createAdvertForm.value.description)
    // // @ts-ignore
    // formData.append('status', this.createAdvertForm.value.status)

    // console.log(formData);
    
    

    this.controlService.createAdvert(this.createAdvertForm.value).subscribe({
      next: (res) => {
        console.log(res);
        
        this.dialog.closeAll();

      },
      error: ({error}) => {
        console.log(error);
        
      //  if (error.appName || error.appURL || error.appURL ) {
      //    this.createAdvertForm.setErrors({credentials: true})
      //  }
      }
    })

  }


}
