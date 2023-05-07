import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MiscService } from '../../core/services/mics.service';
import { ResetCredentialsService } from '../../core/services/reset-credentials.service';
import { ResetpasswordsuccessmodalComponent } from '../resetpasswordsuccessmodal/resetpasswordsuccessmodal.component';

@Component({
  selector: 'app-confirm-otp',
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.scss'],
})
export class ConfirmOtpComponent implements OnInit {
  newForm: any;

  timer: number = 0;
  minutes: number = 0;
  timerSubscription: Subscription;
  seconds: number = 0;
  // router: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    ///private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public miscService: MiscService,
    private resetCredentialsService: ResetCredentialsService
  ) {}

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      otp: ['', Validators.required],
    });
    console.log('hey');


    this.miscService.clearTimer();
    this.miscService.setTimer()
    this.timerSubscription = this.miscService.timeValues.subscribe((timeData) => {

      console.log(timeData)

      this.minutes = timeData.minutes;

      this.seconds = timeData.seconds;

      this.timer = timeData.timer;

    })
  }

  // onSubmit() {
  //   // this.miscService.clearTimer();
  //   this.stopTimer();

  //   if (this.newForm.invalid) {
  //     return;
  //   } else {
  //     console.log(this.newForm.value);
  //     //this.profileService.sendData.next(this.newForm.value)
  //   }
  // }

  initiateRequestOtp() {}




  onSubmit() {
    this.stopTimer();
    this.dialogRef.close(ConfirmOtpComponent);


      this.router.navigate(['auth/newrestpasswordpage']);
    // this.router.navigate(['auth/newrestpasswordpage']);

  //  this.dialog.open(ResetpasswordsuccessmodalComponent);

    var data = {
      "userId": "0013523469",
      "cif": "101124711",
      "purposeCode": "100",
      "oneTimePassword": "00000",
      "pin" : "1234",
      "secretWord": "test@123"
    };

    if (this.data.origin == 'secretword') {

      // this.resetCredentialsService.postMySecretword(data).subscribe((response) => {
      //   console.log(response);
      // });
    }
    // }else if (this.data.origin == 'pin') {

    //   this.resetCredentialsService.postMypin(data).subscribe((response) => {
    //     console.log(response);
    //   });

    // }else if (this.data.origin == 'debitcard') {

    //   this.resetCredentialsService.postDebitcard(data).subscribe((response) => {
    //     console.log(response);
    //   });

    // }else{}

    // this.resetCredentialsService.postDebitcard(data).subscribe((response) => {
    //   console.log(response);
    // });
  }




  onCancel(): void {
    this.dialogRef.close();
  }
  onClose() {
     this.stopTimer();
    this.dialogRef.close();
  }

  stopTimer() {
    this.timer = 0;
    this.miscService.clearTimer();
    this.minutes = 0;
    this.seconds = 0;
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
     if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;

    }

    return true;
  }
}
