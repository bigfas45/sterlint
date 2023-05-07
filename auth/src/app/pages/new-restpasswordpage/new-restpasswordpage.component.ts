import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetpasswordsuccessmodalComponent } from '../../shared/resetpasswordsuccessmodal/resetpasswordsuccessmodal.component';
import { MatDialog } from '@angular/material/dialog';
import { SuccessboxComponent } from '../../shared/successbox/successbox.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  NgForm,
} from '@angular/forms';
import Validation from '../../core/validation';
import { FormsModule } from '@angular/forms';
import { ResetCredentialsService } from 'src/app/core/services/reset-credentials.service';
import { MatSnackBar } from '@angular/material/snack-bar';

//import{Validation} from'src/app/core/validation';

@Component({
  selector: 'app-new-restpasswordpage',
  templateUrl: './new-restpasswordpage.component.html',
  styleUrls: ['./new-restpasswordpage.component.scss'],
})
export class NewRestpasswordpageComponent implements OnInit {
  hidePass = true;
  hideConfirmPass = true;
  hideDefaultPass = true;
  passwordcheck: FormGroup;
  submitted = false;
  @Input() userId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authservice: ResetCredentialsService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.passwordcheck = this.formBuilder.group({
      Defaultpassword: ['', Validators.required],
      Newpassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      Confirmpassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
    });
    this.userId = sessionStorage.getItem('userId');
    // console.log(this.userId, 'loacal');
  }

  onSubmit(): void {
    // this.submitted = true;
    // console.log('here');
    // console.warn(this.passwordcheck.value);

    // this.dialog.open(SuccessboxComponent);
    // /// this.passwordResetService.postDebitcard().subscribe(res => {
    // //  console.log(res)
    // // })
    let data = {
      userId: this.userId,
      ipAddress: '10.234.135.42',
      hashedPassword: this.passwordcheck.value.Defaultpassword,
      newhashedPassword: this.passwordcheck.value.Newpassword,
    };

    // this.authservice.changePassword(data).subscribe((res: any) => {
    //   console.log(res);
    // });

    console.log("data", data);
    try {
      this.authservice.changePassword(data).subscribe((res: any) => {
        console.log(res);
        if(res?.status === '000'){
          this.dialog.open(SuccessboxComponent);
        }else{
          this._snackbar.open(res.errorMessage, 'Error', { duration: 10000 })
        }

        console.log(data)
      });
    } catch (error) {
      console.log(error);
    }
  }
  onGoBack() {
    this.router.navigate(['/auth/resetpassword']);
  }

  onReset(): void {
    this.submitted = false;
    this.passwordcheck.reset();
  }
}
