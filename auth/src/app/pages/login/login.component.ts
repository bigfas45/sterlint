import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDialogComponent } from 'src/app/shared/login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  requestOngoing: boolean;
  isLoading: boolean;
  visibilityStatus = 'password';
  userId: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    window.clearInterval();
    this.getAppMenus();
    document.removeAllListeners('mousemove');
    document.removeAllListeners('mousedown');
    document.removeAllListeners('keypress');
    document.removeAllListeners('touchmove');
    document.removeAllListeners();
    this.initForm();
  }

  initForm() {
    this.userForm = new FormGroup({
      userID: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  getAppMenus(): void {
    this.authenticationService
      .getAppMenus()
      .then((response) => response.json())
      .then((r) => {
        localStorage.setItem('ApplicationList', JSON.stringify(r.content));
      });
  }

  authenticateUser(): void {
    this.isLoading = true;
    this.userId = this.userForm.controls.userID.value;
    if (this.userForm.valid) {
      const payload = {
        userID: this.userForm.controls.userID.value,
        password: this.userForm.controls.password.value,
      };

      sessionStorage.setItem('userId', payload.userID);

      this.authenticationService.authenticateUser(payload).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.isLoading = false;

            const loginRes = JSON.stringify(res);

            sessionStorage.setItem('userId', payload.userID);

            sessionStorage.setItem('authData', loginRes);
            sessionStorage.setItem('otpToken', res.accessToken);
            sessionStorage.setItem('cifid', res.cifId);

            if (res.content.userType === '2') {
              let authData = JSON.stringify(res.content);
              let userType = res.content.userType;
              let profile = res.content.menuProfileId;
              if (userType === '2') {
                if (profile === 'S_DSPGM') {
                  sessionStorage.setItem('userType', 'EOL');
                } else {
                  sessionStorage.setItem('userType', 'EOLAPPROVAL');
                }
              }
              sessionStorage.setItem('authData', authData);

              this.getAccountsSME(payload.userID);
            } else {
              this.dialog.open(LoginDialogComponent, {
                disableClose: true,
                data: {
                  ...res,
                  UserId: payload.userID,
                },
              });
            }
          }
          if (
            res.hasError &&
            res.errorMessage ===
              'Kindly change your password, default password was used'
          ) {
            this.router.navigate(['/auth/changePassword']).then();
            // localStorage.setItem('userId', payload.userID);
          }
          if (res.hasError) {
            this.isLoading = false;
            this._snackbar.open(res.errorMessage, 'Error', { duration: 10000 });
          }
        },

        (error) => {
          this.isLoading = false;
          this._snackbar.open('Something went wrong', null, {
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            duration: 2000,
          });
        }
      );
    }
  }

  onVisibilityChange() {
    this.visibilityStatus == 'password'
      ? (this.visibilityStatus = 'text')
      : (this.visibilityStatus = 'password');
  }

  getAccountsSME(userId: any): void {
    this.requestOngoing = true;
    this.authenticationService.getAccountsSME(userId).subscribe(
      (res) => {
        if (res.isSuccess) {
          this.requestOngoing = false;
          sessionStorage.setItem('userAccount', JSON.stringify(res.content));
          this.router.navigate(['/pension-remittance']).then();
          // this.getUserProfile();

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
}
