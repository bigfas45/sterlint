import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFeatureDialogComponent } from 'src/app/component/dialog/add-feature-dialog/add-feature-dialog.component';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormArray ,FormBuilder} from '@angular/forms';
import { ControlService } from 'src/app/control/control.service';
import { EditFeatureDialogComponent } from 'src/app/component/dialog/edit-feature-dialog/edit-feature-dialog.component';
import { DeleteFeatureDialogComponent } from 'src/app/component/dialog/delete-feature-dialog/delete-feature-dialog.component';


@Component({
  selector: 'app-update-control',
  templateUrl: './update-control.component.html',
  styleUrls: ['./update-control.component.scss']
})
export class UpdateControlComponent implements OnInit {

  title = 'OnlineBankingFrontendControlApplication';


  @Input() controlSubFeatureList : any[]=[];
  controlForm!: FormGroup;
  controlInfo: any;
  featuresInfo: any;

  IsRetail: boolean = false;
  IsSME: boolean = false;
  IsRetailSME: boolean = false;
  IsEOLApproval: boolean = false;

  typeArray: any[]=[];

  isLoadingFeatures: boolean = true;
  isLoadingUpdateBtn: boolean = false;
  



  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private controlService: ControlService,
    ) { 

      if (this.router.getCurrentNavigation()!.extras.state) {
         this.controlInfo = this.router.getCurrentNavigation()!.extras.state!['controlInfo'];
        console.log(this.controlInfo);
      }


    }

  ngOnInit(): void {

    if (this.controlInfo!=null) {
      this.fetchAllControlSubFeatures(this.controlInfo.appControlId);

      this.controlForm = this.formBuilder.group({
        appName: new FormControl(this.controlInfo.appName, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
        appURL: new FormControl(this.controlInfo.appURL, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ]),
        appMenuName: new FormControl(this.controlInfo.appMenuName, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ]),
        appRoute: new FormControl(this.controlInfo.appRoute, [
          Validators.minLength(4),
          Validators.maxLength(100),
        ]),
        appIcon: new FormControl(this.controlInfo.appIcon, [
          Validators.minLength(3),
        ]),
  
      });

      this.controlInfo.type.forEach((element: any) => {
        if (element == 'RETAIL') {
          this.IsRetail = true
        }else if (element == 'EOL') {
          this.IsSME =true
        }else if (element == 'EOLAPPROVAL') {
          this.IsEOLApproval = true
        }else{}
      });

    }else{
      this.router.navigate([`dashboard`]);

    }

    
   
  }

 

  updateAppControl(){
    this.isLoadingUpdateBtn = true;

    if (this.controlForm.invalid) {
      return;
    }

    this.typeArray = []

    if (this.IsRetail == true) {      
      this.typeArray.push('RETAIL')
    }

    if (this.IsSME == true) {
      this.typeArray.push('EOL')
    }

    if (this.IsEOLApproval == true) {
      this.typeArray.push('EOLAPPROVAL')
    }



    var data = {
      appControlId: this.controlInfo.appControlId,
      appName: this.controlForm.value.appName,
      appURL: this.controlForm.value.appURL,
      appMenuName: this.controlForm.value.appMenuName,
      appRoute: this.controlForm.value.appRoute,
      appIcon: this.controlForm.value.appIcon,
      status: false,
      order: 0,
      type: this.typeArray
    }

    this.controlService.controlUpdate(data, this.controlInfo.appControlId).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoadingUpdateBtn = false
        
        this.router.navigate([`dashboard`]);

      },
      error: ({error}) => {
        console.log(error);
        
      //  if (error.appName || error.appURL || error.appURL ) {
      //    this.controlForm.setErrors({credentials: true})
      //  }
      }
    })
  }



  fetchAllControlSubFeatures(id: any){

    this.isLoadingFeatures = true;
    this.controlService.fetchAllSubFeatureByControlId(id).subscribe((response: any) => {

      this.isLoadingFeatures = false;
      if (response.hasError==false) {
        this.featuresInfo = response.content;
        console.log(this.featuresInfo);
      }
      // console.log(response);
      
    })
  }

  addsubfeatureOpenDialog(){
    
    let addfeatureDialog = this.dialog.open(AddFeatureDialogComponent,{
      data: {
        controlId: this.controlInfo.appControlId,
      },
    }); 
    addfeatureDialog.afterClosed().subscribe(result=>{
      this.fetchAllControlSubFeatures(this.controlInfo.appControlId)
    });
  }

  updateSubFeatureOpenDialog(controlFeatureInfo: any){
    console.log(controlFeatureInfo);
    
    let updateFeatureDialog = this.dialog.open(EditFeatureDialogComponent,{
      data: {
        controlFeatureInfo: controlFeatureInfo,
      },
    }); 

    updateFeatureDialog.afterClosed().subscribe(result=>{
      // this.fetchAllControlSubFeatures(controlFeatureInfo.appControlId)
      this.isLoadingFeatures = true;
      console.log('initaite refresh');
      
      this.featuresInfo = []
      this.controlService.fetchAllSubFeatureByControlId(controlFeatureInfo.appControlId).subscribe((response: any) => {

        this.isLoadingFeatures = false;
        if (response.hasError==false) {
          this.featuresInfo = response.content;
          console.log(this.featuresInfo);
        }
        // console.log(response);
        
      })
    });
  }


  deleteSubFeatureOpenDialog(subId: any){
    const deleteAppDialogRef = this.dialog.open(DeleteFeatureDialogComponent);

    deleteAppDialogRef.afterClosed().subscribe(result=>{
      if (result == 'continue') {
        this.deleteControlFeatures(subId);
      }
    });

  }




  deleteControlFeatures(subId: any){
    this.controlService.deleteSubFeatures(subId).subscribe({
      next: (res) => {
        this.fetchAllControlSubFeatures(this.controlInfo.appControlId)
      },
      error: ({error}) => {
       if (error.appName || error.appURL || error.appURL ) {
         this.controlForm.setErrors({credentials: true})
       }
      }
    })
  }

 

}
