import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup}from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlService } from 'src/app/control/control.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'OnlineBankingFrontendControlApplication';

  constructor(
    private formBuilder: FormBuilder,              
    private router: Router,
    private controlService: ControlService,
    private _snackBar: MatSnackBar,
    ) { }
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      sapid:         [null, [Validators.required, Validators.maxLength(30)]],
      password:     [null, [Validators.required, Validators.maxLength(30)]],
    });
  }

  Authenticate(){
    
    this.router.navigate(['/dashboard']);


    // var body = {
    //   staffId: this.loginForm.value.sapid,
    //   password: this.loginForm.value.password,
    // }
    // this.controlService.authserviceFunc(body).subscribe({
    //   next: (v) => {
    //     var response = JSON.parse(JSON.stringify(v));
    //     console.log(v);
        
    //   },
    //   error: (e) => {
    //     this.openSnackBar(e.message,'close')
    //     // this.isLoading = false;
    //   },
    //   complete: () => {console.info('complete'); }
    // })
    // console.log(body);

  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }

}
