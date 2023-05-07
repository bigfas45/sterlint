import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetpasswordsuccessmodalComponent } from '../../shared/resetpasswordsuccessmodal/resetpasswordsuccessmodal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmOtpComponent } from '../../shared/confirm-otp/confirm-otp.component';
import { ResetCredentialsService } from '../../core/services/reset-credentials.service';
import { MiscService } from '../../core/services/mics.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';




@Component({
 selector: 'app-pinreset',
 templateUrl: './pinreset.component.html',
  styleUrls: ['./pinreset.component.scss']
})
export class PinresetComponent implements OnInit {
  checkin:FormGroup;
  formslide:any;

  timer: number = 0;
  minutes: number = 0;
  timerSubscription: Subscription;
  seconds: number = 0;

  constructor(private route:ActivatedRoute,private router:Router ,
    public dialog:MatDialog ,private resetCredentialsService: ResetCredentialsService,public miscService: MiscService,private formbuilder: FormBuilder ) { }

  ngOnInit(): void {

    this.checkin =  this.formbuilder.group({
      BankingID: ['',[Validators.required]],
      Pin: ['',[Validators.required]]
     })

  }

  onGoBack(){

   this.router.navigate(['/auth/resetpassword']);

 }

 //Submit(){
  //this.openDialog()
 //}

 openDialog(): void{
  let dialogRef = this.dialog.open(ResetpasswordsuccessmodalComponent,{
    height: '250px',
    width: '340px',
    data:{
    successful: false,
    title: 'Reset Successful'}
  })
}
  onSubmit(form:NgForm){

  console.warn(this.checkin.value)
  var userIdMap = {
    userId: '112'
  }

  // this.resetCredentialsService.getOtp(userIdMap).subscribe(res => {

  // })

  this.miscService.setTimer()

  console.log("Opening")

  this.timerSubscription = this.miscService.timeValues.subscribe((timeData) => {

    this.minutes = timeData.minutes;

    this.seconds = timeData.seconds;

    this.timer = timeData.timer;

  })

 this.dialog.open(ConfirmOtpComponent)

}


}

