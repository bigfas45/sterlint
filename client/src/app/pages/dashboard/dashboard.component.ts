import { Component, 
  OnInit,
  Input,
  Output,
  ViewChild,
  TemplateRef, } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { DeleteControlDialogComponent } from 'src/app/component/dialog/delete-control-dialog/delete-control-dialog.component';
import { ControlService } from 'src/app/control/control.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AddControlDialogComponent } from 'src/app/component/dialog/add-control-dialog/add-control-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() controls = [] as any;
  title = 'OnlineBankingFrontendControlApplication';

  isloading = false;
  constructor(         
    private router: Router,
    public dialog: MatDialog,
    private controlService: ControlService,
    ) {
      this.fetchControl();

     }
  appList: any;
  ngOnInit(): void {
    
  }


  fetchControl() {
    this.isloading = true;
    this.controlService.control().subscribe((response: any) => {
      console.log(response);
      
      this.controls = response;
      // this.controls = response;
      this.isloading = false;
      console.log('controls');
      console.log(this.controls);
      

    });
  }

  addAppControl(){
    const addAppDialogRef = this.dialog.open(AddControlDialogComponent);

    addAppDialogRef.afterClosed().subscribe((res: any) => {
      this.fetchControl();
    });
  }



  editapp(controlInfo: any){
    let navigationExtras: NavigationExtras = {
      state: {
        controlInfo: controlInfo,
      },
    };
    this.router.navigate([`dashboard/updatecontrol`], navigationExtras);
    // console.log('sasa');
  }

  deleteapp(appId: any){
    const deleteAppDialogRef = this.dialog.open(DeleteControlDialogComponent);

    deleteAppDialogRef.afterClosed().subscribe(result=>{
      if (result == 'continue') {
        this.deleteNow(appId);
      }
    });

  }


  deleteNow(appId: any) {
    this.isloading = true;

    this.controlService
      .deleteControlById(appId)
      .subscribe((response: any) => {

        console.log(response);

        this.fetchControl();
      });
  }


  search(event: any){
    console.log(event.target.value)
    
    this.controlService
    .controlSearch(event.target.value )
    .subscribe((response: any) => {
      console.log(response);
    
      // this.controls = response;
    
      // this.fetchControl();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log("ffff", event.previousIndex, event.currentIndex)
    moveItemInArray(this.controls, event.previousIndex, event.currentIndex);

    this.controlService
    .controlOrderUpdate(event.currentIndex + 1, event.previousIndex + 1 )
    .subscribe((response: any) => {
      console.log(response);

      this.fetchControl();
    });
  }



  setStatus(status: any, id: any) {
    let sta: boolean;
    if (status === true) {
      sta = false;
    } else {
      sta = true;
    }

    let data = { status: sta };

    console.log(data);
    this.controlService
      .controlUpdateStatus(data, id)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

}
