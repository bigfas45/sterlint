import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFeatureDialogComponent } from 'src/app/component/dialog/add-feature-dialog/add-feature-dialog.component';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormArray ,FormBuilder} from '@angular/forms';
import { ControlService } from 'src/app/control/control.service';
import { CreateWebAdvertDialogComponent } from 'src/app/component/dialog/create-web-advert-dialog/create-web-advert-dialog.component';

@Component({
  selector: 'app-manage-advert-create-new',
  templateUrl: './manage-advert-create-new.component.html',
  styleUrls: ['./manage-advert-create-new.component.scss']
})
export class ManageAdvertCreateNewComponent implements OnInit {
  createAdvertForm!: FormGroup;

  constructor(
    public dialog: MatDialog,) { }

  ngOnInit(): void {

    this.fetchAdvert();

  }

  fetchAdvert(){

  }

  

  createAdvert(){

    const createAdvertDialogRef = this.dialog.open(CreateWebAdvertDialogComponent);

    createAdvertDialogRef.afterClosed().subscribe((res: any) => {
      this.fetchAdvert();
    });
    
  }

}
