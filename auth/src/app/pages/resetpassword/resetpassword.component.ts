import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResetpasswordsuccessmodalComponent } from '../../shared/resetpasswordsuccessmodal/resetpasswordsuccessmodal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmOtpComponent } from '../../shared/confirm-otp/confirm-otp.component';
import { ResetCredentialsService } from '../../core/services/reset-credentials.service';
import { MiscService } from '../../core/services/mics.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { posts } from 'src/posts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessboxComponent } from '../../shared/successbox/successbox.component';
import { User } from '../../core/interface/user';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  private user: User = {
    userId: 'AYODELEAYETIGBO-INIT',
    otp: '9146',
  };
  public showPassword: boolean = false;
  // router: any;
  timer: number = 0;
  minutes: number = 0;
  timerSubscription: Subscription;
  seconds: number = 0;
  isLoading: Boolean = false;

  page: string = 'validatForm';
  newpasswordVariable: any;
  confirmpasswordVariable: any;
  newForm: any;
  validatForm: any;
  lastestForm: any;
  isResend = false;
  objposts: posts;
  passwordcheck: FormGroup;
  submitted = false;

  @ViewChild('OtpModal') OtpModal: TemplateRef<any> | any;
  public TemplateRef: MatDialogRef<any> | any;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private resetcredentialsservice: ResetCredentialsService,
    private router: Router,
    private dialogRef: MatDialog,
    public miscService: MiscService,
    private formbuilder: FormBuilder,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      otp: ['', Validators.required],
    });

    this.validatForm = this.formBuilder.group({
      BankingID: ['', Validators.required],
      CorporateAccountNumber: ['', Validators.required],
      EnterSecretword: ['', Validators.required],
    });

    this.lastestForm = this.formBuilder.group({
      firstSecretword: [
        '',
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
      ],
      ConfirmSecretword: [
        '',
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
      ],
    });
  }

  callTimerService() {
    this.miscService.clearTimer();
    this.miscService.setTimer();
    this.timerSubscription = this.miscService.timeValues.subscribe(
      (timeData) => {
        console.log(timeData);

        this.minutes = timeData.minutes;

        this.seconds = timeData.seconds;

        this.timer = timeData.timer;

        if (this.minutes == 0 && this.seconds == 0) {
          this.isResend = true;
        }
      }
    );
  }

  onsubmitLatest() {
    const payload = {
      firstSecretword: this.validatForm.value.BankingID,
      ConfirmSecretword: this.validatForm.value.CorporateAccountNumber,
      otp: this.newForm.value.otp,
    };

    this.resetcredentialsservice.postSubmit(payload).subscribe((payload) => {});

    if (this.newpasswordVariable == this.confirmpasswordVariable) {
      this.dialog.open(SuccessboxComponent);

      // this._snackbar.open('Password Changed Successfully', 'close', {
      //   horizontalPosition: 'center',
      //   duration: 20000
      // });
    } else {
      this._snackbar.open('Confirm and new password not match', 'close', {
        horizontalPosition: 'center',
        duration: 20000,
      });
    }
  }

  onBack() {
    // this.router.navigate(['auth/login']);
  }
  // my practical
  onSubmitOTP() {
    this.stopTimer();
    this.dialogRef.closeAll();

    const payload = {
      userId: this.validatForm.value.BankingID,
      otp: this.newForm.value.otp,
    };

    console.log("here")

    this.resetcredentialsservice.postSubmit(payload ).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.dialog.open(SuccessboxComponent, { disableClose: true });
        } else {
          this._snackbar.open(res.errorMessage, 'close', {
            horizontalPosition: 'center',
            duration: 20000,
          });
        }
      },

      error: (error) => {
        this._snackbar.open(error, 'close', {
          horizontalPosition: 'center',
          duration: 20000,
        });
      },
    });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.isLoading = true;

    console.log(this.validatForm.value);

    var opost = new posts();

    const payload = {
      userId: this.validatForm.value.BankingID,
      accountNo: this.validatForm.value.CorporateAccountNumber,
      secretWord: this.validatForm.value.EnterSecretword,
      channel: 1,
    };

    this.resetcredentialsservice.post(payload).subscribe({
      next: (res) => {
        this.isLoading = false;

        if (res.isSuccess) {
          this.callTimerService();
          this.dialog.open(this.OtpModal, { disableClose: true });
        } else {
          this._snackbar.open(res.errorMessage, 'close', {
            horizontalPosition: 'center',
            duration: 20000,
          });
        }

        console.log('QQQQQQQ', res);
      },

      error: (error) => {
        this.isLoading = false;

        console.log(error);
        this._snackbar.open(error, 'close', {
          horizontalPosition: 'center',
          duration: 20000,
        });
      },
    });
  }

  resendOTP() {
    this.isResend = false;
    this.callTimerService();
  }

  onCancel() {
    // this.router.navigate(['auth/login']);

    this.dialogRef.closeAll();
  }

  // onSubmitOTP() {
  //   this.stopTimer();
  //   this.dialogRef.closeAll();

  //   const payload ={
  //     userId: this.validatForm.value.BankingID,
  //     otp: this.newForm.value.otp

  //   }

  //   console.log("payload",  payload);

  //   this.resetcredentialsservice.postSubmit(payload).subscribe(payload=>{

  //     if(res.){

  //     }

  //      const isSuccess=true;
  //     if(isSuccess){
  //       this.dialog.open(SuccessboxComponent, {disableClose:true})
  //     }
  //     else{
  //       this._snackbar.open("error", 'close', {
  //         horizontalPosition: 'center',
  //         duration: 20000
  //       });
  //     }

  //   })
  //   console.log(this.newForm.value.otp);
  //   // 1.this.router.navigate(['auth/newrestpasswordpage']);
  //   // 2 this.page = 'resestPasswordPage'
  //   // this.resetcredentialsservice.createMine(this.user).subscribe(
  //   //   (response) => console.log(response),
  //   //   (error:any)=> console.log(error),
  //   //   ()=>console.log('Done getting user')
  //   // )
  // }

  // practical starts

  onReset(): void {
    this.submitted = false;
    this.passwordcheck.reset();
  }

  onCancelOtp() {
    this.dialogRef.closeAll();
    this.router.navigate(['auth/login']);

    // this.dialogRef.close();
  }

  onClose() {
    this.stopTimer();
    // this.dialogRef.close();
  }

  stopTimer() {
    this.timer = 0;
    this.miscService.clearTimer();
    this.minutes = 0;
    this.seconds = 0;
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }

    return true;
  }
}
