import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateWebAdvertDialogComponent } from 'src/app/component/dialog/create-web-advert-dialog/create-web-advert-dialog.component';
import { ControlService } from 'src/app/control/control.service';

@Component({
  selector: 'app-manage-advert',
  templateUrl: './manage-advert.component.html',
  styleUrls: ['./manage-advert.component.scss']
})
export class ManageAdvertComponent implements OnInit {

  dataList: any[]=[];
  createNew = false;

  displayTitle: any;
  displayDescription: any;
  displayCallToAction: any;
  displayAudience: any;
  displayEligibility: any;
  displayStatus: any;
  displayImage: any;

  isLoadingAdvert:boolean=true;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private controlService: ControlService
    ) { }

  ngOnInit(): void {

      this.fetchAdvert();
  }

  switchTo(title: any,advertUri: any){
    this.displayTitle = title;
    this.displayImage = advertUri
    

    console.log(this.displayTitle);
    
    // this.router.navigate([path]);
  }

  fetchAdvert(){


    
     this.controlService.getAdvertsList().subscribe((response: any) => {
      this.isLoadingAdvert = false;
      if (response.content.length == 0) {
        
        this.dataList = response.content;

      }else{

        this.dataList = response.content;
        console.log(response);
      }
      

    });

  }


  createAdvert(){

    const createAdvertDialogRef = this.dialog.open(CreateWebAdvertDialogComponent);

    createAdvertDialogRef.afterClosed().subscribe((res: any) => {
      this.fetchAdvert();
    });
    
  }






}
