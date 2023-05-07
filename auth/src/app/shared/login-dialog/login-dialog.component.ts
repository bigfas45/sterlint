import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var $: any;
declare var runFingerPrint: any;
declare var fingerPrintOptions: any;

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  authData = JSON.parse(sessionStorage.getItem('authData'));
  userId = sessionStorage.getItem('userId');
  cifid = sessionStorage.getItem('cifId');
  loadingAccountInformation = false;

  minutes: number;
  seconds: number;
  timer: number;
  timerSubscription: Subscription;
  otpFormGroup: FormGroup;
  requestOngoing: boolean = false;
  sendSessionResetOTPSub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (this.data.isSME === true) {
      this.loadingAccountInformation = true;
    }
    this.timerSubscription = this.authenticationService.timeValues.subscribe(
      (timeData) => {
        this.minutes = timeData.minutes;
        this.seconds = timeData.seconds;
        this.timer = timeData.timer;
      }
    );

    this.otpFormGroup = this.formBuilder.group({
      otp: ['', Validators.required],
    });
  }

  onSendOTP(isResend: boolean = false) {
    this.authenticationService.setTimer();
    this.sendResetSessionOTP(isResend);
  }

  onSubmit() {
    this.requestOngoing = true;
    this.authenticationService.clearTimer();
    if (!this.otpFormGroup.valid) {
      this._snackbar.open(`Please enter a valid 6 digits OTP`, 'Ok', {
        duration: 25000,
      });
    } else {
      if (this.otpFormGroup.controls['otp'].value.length != 6) {
        this._snackbar.open('Invalid Otp Code. Please retry again ', null, {
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          duration: 2000,
        });
        return;
      }
    }
    this.authenticateUserToken();
  }

  authenticateUserToken() {
    const payload = {
      UserId: this.userId,
      purposeCode: 'Login',
      oneTimePassword: this.otpFormGroup.controls['otp'].value,
    };
    console.log(payload)
    this.authenticationService.validateLoginOTP(payload).subscribe(
      (response) => {
        if (response.isSuccess) {
          if (response.content.retailUserDetails.userId) {
            let authData = JSON.stringify(response.content.retailUserDetails);
            let userType = response.content.retailUserDetails.userType;
            console.log('QQQQQQQQQQ', userType);

            if (userType === '1') {
              sessionStorage.setItem('userType', 'RETAIL');

              this.getAccountsByCIFID();

            }

            sessionStorage.setItem('authData', authData);
          } else if (response.content.smeUserDetails.userId) {
            let authData = JSON.stringify(response.content.smeUserDetails);
            let userType = response.content.smeUserDetails.userType;
            let profile = response.content.smeUserDetails.menuProfileId;
            console.log('QQQQQQQQQQ', profile);
            if (userType === '2') {
              if (profile === 'S_DSPGM') {
                sessionStorage.setItem('userType', 'EOL');
              } else {
                sessionStorage.setItem('userType', 'EOLAPPROVAL');
              }
            }
            sessionStorage.setItem('authData', authData);
            this.getAccountsSME()
          }

          // this.getUserProfile();

          const authData = '';
        }

        if (response.hasError) {
          this._snackbar.open(response.errorMessage, null, {
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            duration: 2000,
          });
        }
      },
      (error) => {
        // console.log(error);
        this._snackbar.open(error, null, {
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          duration: 2000,
        });
      }
    );
  }

  getUserProfile() {
    this.requestOngoing = true;
    const payload = {
      cif: this.cifid,
      userId: this.userId,
      channel: 0,
    };
    this.authenticationService.getCustomerProfile(payload).subscribe(
      (response) => {
        this.requestOngoing = false;

        if (response.isSuccess) {
          var userProfile = JSON.stringify(response.content);

          sessionStorage.setItem('userProfile', userProfile);

          this.router.navigate(['/home']).then();
        } else {
          this.requestOngoing = false;
          this._snackbar.open(response.errorMessage, null, {
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            duration: 2000,
          });
        }
      },
      (error) => {
        this.requestOngoing = false;
        this._snackbar.open(error, null, {
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          duration: 2000,
        });
      }
    );
  }


  resetSessionViewIndex: number;
  resetSessionSub: Subscription;
  resetSessionNotificationType: string;
  maskedResetSessionOtpAddress: string;
  resetSessionOtpReference: string;

  sendResetSessionOTP(isResend: boolean = false) {
    let self = this;
    if (this.sendSessionResetOTPSub) {
      this.sendSessionResetOTPSub.unsubscribe();
    }

    self.requestOngoing = true;

    const payload = {
      UserId: this.userId,
      ReasonCode: '20',
      ReasonDescription: 'Reset session',
      CifId: this.cifid,
    };
    this.sendSessionResetOTPSub = this.authenticationService
      .initiateOtpRequest(payload)
      .subscribe(
        (response) => {
          this.requestOngoing = false;
          if (response.ResponseCode == '00') {
            this.resetSessionNotificationType = response.NotificationType;
            this.maskedResetSessionOtpAddress = response.NotificationAddress;
            this.resetSessionOtpReference = response.ResponseDescription;

            if (isResend === true) {
              this._snackbar.open('OTP sent successfully.', null, {
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
                duration: 1500,
              });
            } else {
              this.resetSessionViewIndex = 1;
            }

            return;
          }

          this._snackbar.open(
            'OTP could not be sent at the moment. Please try again later.',
            null,
            {
              verticalPosition: 'top',
              horizontalPosition: 'right',
              duration: 2500,
            }
          );
        },
        (error: any) => {
          self.requestOngoing = false;
          this._snackbar.open(
            'Your request cannot be completed at the moment due to a technical error, please try again later.',
            null,
            {
              verticalPosition: 'top',
              horizontalPosition: 'right',
              duration: 2500,
            }
          );
        }
      );
  }

  getAccountsByCIFID(): void {
    this.requestOngoing = true;
    this.authenticationService.getAccountsByCIFID(this.userId).subscribe(
      (res) => {

        if (res.isSuccess) {
          this.requestOngoing = false;
          sessionStorage.setItem('userAccount', JSON.stringify(res.content));
          this.getUserProfile();
        } else {
          this.requestOngoing = false;
          this._snackbar.open(res.errorMessage, null, {
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            duration: 2000,
          });
        }
      },

      (error) => {
        console.log(error);
        this.requestOngoing = false;
        this._snackbar.open(error, null, {
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          duration: 2000,
        });
      }
    );
  }



  getAccountsSME(): void {
    this.requestOngoing = true;
    this.authenticationService.getAccountsSME(this.userId).subscribe(
      (res) => {
        if (res.isSuccess) {
          this.requestOngoing = false;
          sessionStorage.setItem('userAccount', JSON.stringify(res.content));
          this.router.navigate(['/home']).then();
        } else {
          this.requestOngoing = false;
          this._snackbar.open(res.errorMessage, null, {
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            duration: 2000,
          });
        }
      },

      (error) => {
        this.requestOngoing = false;
        this._snackbar.open(error, null, {
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          duration: 2000,
        });
      }
    );
  }

  onCancel() {
    this.authenticationService.clearTimer();
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }
}
