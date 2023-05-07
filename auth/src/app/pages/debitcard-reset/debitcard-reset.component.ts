import { Component, OnInit } from '@angular/core';
import { ResetpasswordsuccessmodalComponent } from '../../shared/resetpasswordsuccessmodal/resetpasswordsuccessmodal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmOtpComponent } from '../../shared/confirm-otp/confirm-otp.component';
import { ResetCredentialsService } from '../../core/services/reset-credentials.service';
import { MiscService } from '../../core/services/mics.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-debitcard-reset',
  templateUrl: './debitcard-reset.component.html',
  styleUrls: ['./debitcard-reset.component.scss']
})
export class DebitcardResetComponent implements OnInit {
  Debitcard:FormGroup;
  router:any;
  formslide:any;

  timer: number = 0;
  minutes: number = 0;
  timerSubscription: Subscription;
  seconds: number = 0;

  constructor(public dialog: MatDialog, private resetCredentialsService: ResetCredentialsService,
       public miscService: MiscService,private formbuilder: FormBuilder)
    { }


    ngOnInit(): void {
      this.Debitcard=  this.formbuilder.group({
        BankingID: ['',[Validators.required]],
        AccountDebitcard: ['',[Validators.required]]
      })


    }


  onGoBack(){

    this.router.navigate(['/auth/resetpassword']);

  };
  onCancel(){

    this.router.navigate(['/auth/resetpassword']);

  }

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

    console.log('');

    console.warn(this.Debitcard.value)

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

