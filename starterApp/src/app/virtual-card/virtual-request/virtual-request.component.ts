import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  Input,
  TemplateRef,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { VirtualCardService } from '../../core/services/virtual-card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mockAccounts } from '../../core/mock/accounts';
@Component({
  selector: 'app-virtual-request',
  templateUrl: './virtual-request.component.html',
  styleUrls: ['./virtual-request.component.scss'],
})
export class VirtualRequestComponent implements OnInit {
  @ViewChild('otpModal') otpModal: TemplateRef<any> | any;
  public otpModalRef: MatDialogRef<any> | any;

  loaderIsActive: boolean = false;

  @Input() stepper: number = 1;
  setTransLimit: number[] = [100000, 300000, 500000];
  virtualCard: FormGroup | any;
  otpFormGroup: FormGroup | any;

  activeSelection: number | any;

  otherBanksTransferForm: FormGroup | any;
  variant: string = '';
  currency: string = '';
  cardType: string = '';
  minutes: number | any;
  seconds: number | any;
  timer: number | any;
  timerSubscription: Subscription | any;

  otpReference: string | any;
  cardProgramNames: any | any;
  cardPin: any;

  accountOptions: any;

  authData: any;
  // accountFilters: any[];

  accountFilters: Array<any> = [];

  accountDollarFilters: Array<any> = [];

  isDomiciliary: boolean = false;

  isDollarSelect: boolean = false;
  userId: any;



  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private virtualCardService: VirtualCardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.authData = localStorage.getItem('authData')
    //   ? JSON.parse(localStorage.getItem('authData') || '{}')
    //   : null;

    // this.userId = localStorage.getItem('userId')
    //   ? localStorage.getItem('userId') || '{}'
    //   : null;

    // console.log(this.userId.toString());
    this.accountFilter();

    this.virtualCard = this._formBuilder.group({
      cardProgram: ['', Validators.required],
      currencyCode: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      accountId: ['', Validators.required],
      AccountNumberToDebitForUSD: [''],
      cardBrand: ['', Validators.required],
      transactionLimit: ['', Validators.required],
      lastName: ['', Validators.required],
      city: [null, Validators.required],
      accountType: [null, Validators.required],
      postalCode: [null, Validators.required],
      streetAddressLine2: [null, Validators.required],
      userId: ['', Validators.required],
      mobileNr: [null, Validators.required],
      firstName: ['', Validators.required],
      emailAddress: [null, Validators.required],
      streetAddress: [null, Validators.required],
      countryCode: [null, Validators.required],
      issuerNr: [null, Validators.required],
      state: [null, Validators.required],
      alias: ['', Validators.required],
      clientReference: ['', Validators.required],
    });

    this.otpFormGroup = this._formBuilder.group({
      otp: ['', Validators.required],
    });

    this.accountFilters = mockAccounts;

    // console.log("QQQQ", this.accountFilters)
  }

  accountFilter() {
    // @ts-ignore
    // this.accountOptions = JSON.parse(localStorage.getItem('userAccount'));

     this.accountFilters = mockAccounts;
    // console.log(this.accountOptions);
    // this.accountOptions.forEach((item: any) => {
    //   if (item.currency === 'USD') {
    //     this.isDomiciliary = true;

    //     // console.log(item);

    //     this.accountDollarFilters.push({
    //       accountCategory: item.accountCategory,
    //       accountName: item.accountName,
    //       accountNumber: item.accountNumber,
    //       accountType: item.accountType,
    //       availableBalance: item.availableBalance,
    //       creditAllowed: item.creditAllowed,
    //       currency: item.currency,
    //       debitAllowed: item.debitAllowed,
    //       effectiveBalance: item.effectiveBalance,
    //     });
    //   }

    //   if (
    //     item.accountType != 'Loan' &&
    //     item.accountType != 'UNSECURED PERSONAL LOAN' &&
    //     item.accountType != 'HOME LOAN' &&
    //     item.currency === 'NGN'
    //   ) {
    //     console.log(item.currency);
    //     this.accountFilters.push({
    //       accountCategory: item.accountCategory,
    //       accountName: item.accountName,
    //       accountNumber: item.accountNumber,
    //       accountType: item.accountType,
    //       availableBalance: item.availableBalance,
    //       creditAllowed: item.creditAllowed,
    //       currency: item.currency,
    //       debitAllowed: item.debitAllowed,
    //       effectiveBalance: item.effectiveBalance,
    //     });
    //   }
    // });
  }

  goBack() {
    // this.page = 'form';
  }


  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  setVariant(value: string) {
    this.variant = value;
    this.virtualCard.get('cardProgram').setValue(this.variant);
  }

  setCurrency(value: string) {
    this.currency = value;
    this.virtualCard.get('currencyCode').setValue(this.currency);
    console.log('curren', this.virtualCard.get('currencyCode').value);
  }

  onNext() {
    if (this.stepper === 2) {
      this.stepper += 1;
      // this.accountBalance();
    } else if (this.stepper === 3) {
      this.showOtpDialog();
      // this.initiateOpt();
    } else {
      this.stepper += 1;
    }

    // this.onSendOtp()
  }

  onBack() {
    if (this.stepper > 1) {
      this.stepper -= 1;
    }
  }

  showOtpDialog() {

    this.virtualCardService.setTimer();

    this.timerSubscription = this.virtualCardService.timeValues.subscribe(
      (timeData) => {
        console.log(timeData);
        this.minutes = timeData.minutes;
        this.seconds = timeData.seconds;
        this.timer = timeData.timer;
      }
    );
    
    this.otpModalRef = this.dialog.open(this.otpModal, {});

    this.otpModalRef.afterClosed().subscribe((res: any) => {});
  }

  accountBalance() {
    this.loaderIsActive = true;
    this.virtualCardService
      .accountBalanceCheck({
        AccountNumber: this.virtualCard.get('accountId').value,
      })
      .subscribe(
        (response: any) => {
          this.loaderIsActive = false;

          if (response.responseCode === '999') {
            this._snackBar.open(response.responseDescription, 'Error', {
              duration: 30000,
            });
          }

          if (response.responseCode === '000') {
            if (response.data.availableBalance > 537.5) {
              this._snackBar.open(response.responseDescription, 'Ok', {
                duration: 30000,
              });
              this.stepper += 1;
            } else {
              this._snackBar.open(
                'You cannot proceed because of Insufficient funds',
                'Ok',
                { duration: 30000 }
              );
            }
          }
        },
        (error: any) => {
          this.loaderIsActive = false;

          this._snackBar.open('Something went wrong', 'Error', {
            duration: 30000,
          });
        }
      );
  }

  setCardType(value: string) {
    this.cardType = value;
    this.virtualCard.get('cardBrand').setValue(value);
  }

  seFormLimit(limit: number, index: number) {
    this.virtualCard.get('transactionLimit').setValue(limit);
    this.activeSelection = index;
  }

  initiateOpt() {
    this.loaderIsActive = true;

    this.virtualCardService.sendOpt(this.userId.toString()).subscribe(
      (response) => {
        if (response.responseCode === '000') {
          this.loaderIsActive = false;
          this.otpReference = response.data;
          this.showOtpDialog();
        } else {
          this.loaderIsActive = false;
          this._snackBar.open(response.responseDescription, 'Error', {
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            duration: 1500,
          });
        }
      },
      (error) => {
        this.loaderIsActive = false;
        this._snackBar.open(error, 'Error', {
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          duration: 1500,
        });
      }
    );

    // this.virtualCardService
    //   .cardtypeCheckCheck({
    //     // AccountNumber: "0026214860",
    //     AccountNumber: this.virtualCard.get('accountId').value.toString() ,
    //   })
    //   .subscribe((response) => {
    //     this.loaderIsActive = false;

    //     if (response.responseCode === "000" ) {
    //       this.cardProgramNames = response.data;

    //       if (
    //         this.cardProgramNames.some((item: any) =>
    //           item.cardProgramName.startsWith("MASTER")
    //         ) &&
    //          this.virtualCard.get('cardBrand').value === "MASTERCARD_VIRTUAL"
    //       ) {
    //         this._snackBar.open(
    //           "You already have a master card pls select another card type.",
    //           "Error",
    //           {
    //             verticalPosition: "bottom",
    //             horizontalPosition: "right",
    //             duration: 2500,
    //           }
    //         );
    //       } else {
    //         this.loaderIsActive = true;
    //         this.virtualCardService
    //          // @ts-ignore
    //           .sendOpt(this.userId.toString() )
    //           .subscribe(
    //             (response) => {
    //               if (response.responseCode === "000") {
    //                 this.loaderIsActive = false;
    //                 this.otpReference = response.data;
    //                 this.showOtpDialog()

    //               } else {
    //                 this.loaderIsActive = false;
    //                 this._snackBar.open(response.responseDescription, "Error", {
    //                   verticalPosition: "bottom",
    //                   horizontalPosition: "right",
    //                   duration: 1500,
    //                 });
    //               }
    //             },
    //             (error) => {
    //               this.loaderIsActive = false;
    //               this._snackBar.open(error, "Error", {
    //                 verticalPosition: "bottom",
    //                 horizontalPosition: "right",
    //                 duration: 1500,
    //               });
    //             }
    //           );
    //       }
    //     } else {
    //       this._snackBar.open(response.responseDescription, "Error", {
    //         verticalPosition: "bottom",
    //         horizontalPosition: "right",
    //         duration: 1500,
    //       });
    //     }
    //   });
  }

  ResendOtp() {
    // this.loaderIsActive = true;

    this.virtualCardService.clearTimer();

    this.virtualCardService.setTimer();

    this.timerSubscription = this.virtualCardService.timeValues.subscribe(
      (timeData) => {
        console.log(timeData);
        this.minutes = timeData.minutes;
        this.seconds = timeData.seconds;
        this.timer = timeData.timer;
      }
    );
    // this.virtualCardService.sendOpt(this.userId).subscribe(
    //   (response) => {
    //     if (response.responseCode === '000') {
    //       this.loaderIsActive = false;
    //       this.otpReference = response.data;
    //     } else {
    //       this.loaderIsActive = false;
    //       this._snackBar.open(response.responseDescription, 'Error', {
    //         verticalPosition: 'bottom',
    //         horizontalPosition: 'right',
    //         duration: 1500,
    //       });
    //     }
    //   },
    //   (error) => {
    //     this.loaderIsActive = false;
    //     this._snackBar.open(error, 'Error', {
    //       verticalPosition: 'bottom',
    //       horizontalPosition: 'right',
    //       duration: 1500,
    //     });
    //   }
    // );
  }

  onValidateOTP() {
    // this.loaderIsActive = true;
    let formObj = {} as any;
    // formObj = {
    //   otpReference: this.otpReference,
    //   // @ts-ignore
    //   accountNumber: this.userId,
    //   ...this.otpFormGroup.value,
    // };
    this.onSubmit();

    // this.virtualCardService.validateOpt(formObj).subscribe(
    //   (response) => {
    //     if (response.responseCode === '000') {
    //       this.loaderIsActive = false;
    //       this.onSubmit();
    //       // console.log(this.virtualCardPayload())
    //     } else {
    //       this.loaderIsActive = false;
    //       this._snackBar.open(response.responseDescription, 'Error', {
    //         verticalPosition: 'bottom',
    //         horizontalPosition: 'right',
    //         duration: 1500,
    //       });
    //     }
    //   },
    //   (error) => {
    //     this.loaderIsActive = false;
    //     this._snackBar.open(error, 'Error', {
    //       verticalPosition: 'bottom',
    //       horizontalPosition: 'right',
    //       duration: 1500,
    //     });
    //   }
    // );
  }

  onSubmit() {
    // this.loaderIsActive = true;
    // const payload = this.virtualCardPayload();
    this.otpModalRef.close();

    this.stepper += 1;
    // this.virtualCardService.requestVirtualCard(payload).subscribe(
    //   (response) => {
    //     if (response.responseCode === '000') {
    //       console.log('ssssss', response.data.card.pinInfo);
    //       this.cardPin = response.data.card.pinInfo;
    //       this.loaderIsActive = false;
    //       this._snackBar.open(response.responseDescription, 'Ok', {
    //         verticalPosition: 'bottom',
    //         horizontalPosition: 'right',
    //         duration: 15000,
    //       });
    //       this.stepper += 1;
    //     } else {
    //       this.loaderIsActive = false;
    //       this._snackBar.open(response.responseDescription, 'Error', {
    //         verticalPosition: 'bottom',
    //         horizontalPosition: 'right',
    //         duration: 15000,
    //       });
    //     }
    //   },
    //   (error) => {
    //     this.loaderIsActive = false;
    //     this._snackBar.open(error.error.responseDescription, 'Error', {
    //       verticalPosition: 'bottom',
    //       horizontalPosition: 'right',
    //       duration: 15000,
    //     });
    //   }
    // );
  }

  private virtualCardPayload() {
    return {
      CardDetails: {
        lastName: this.authData.LastName,
        city: null,
        accountType: '20',
        postalCode: null,
        streetAddressLine2: null,
        userId: this.userId,
        mobileNr: '',
        cardProgram:
          this.virtualCard.get('currencyCode').value === '840'
            ? 'MC_USD_Virtual'
            : this.virtualCard.get('cardBrand').value,
        firstName: this.authData.FirstName,
        accountId: this.virtualCard.get('AccountNumberToDebitForUSD').value
          ? this.virtualCard.get('AccountNumberToDebitForUSD').value
          : this.virtualCard.get('accountId').value,
        emailAddress: null,
        nameOnCard: this.virtualCard.get('nameOnCard').value,
        streetAddress: null,
        countryCode: 'NG',
        issuerNr:
          this.virtualCard.get('currencyCode').value === '566' ? '1' : '3',
        state: null,
        currencyCode: this.virtualCard.get('currencyCode').value,
        alias: '1231',
        clientReference: Date.now().toString(),
      },
      Limit: this.virtualCard.get('transactionLimit').value.toString(),
      CIFID: this.authData.CifId,
      cardVariant: this.virtualCard.get('cardProgram').value,
      AccountNumberToDebitForUSD: this.virtualCard.get('accountId').value,
    };
  }

  disableButton() {
    if (
      this.stepper === 1 &&
      this.virtualCard.get('cardProgram').valid &&
      this.virtualCard.get('currencyCode').valid
    ) {
      console.log('tttttt', true);
      return false;
    }

    if (
      this.stepper === 2 &&
      this.virtualCard.get('cardBrand').valid &&
      this.virtualCard.get('nameOnCard').valid &&
      this.virtualCard.get('accountId').valid
    ) {
      console.log('222222222', true);
      return false;
    }

    if (this.stepper === 3 && this.virtualCard.get('transactionLimit').valid) {
      return false;
    }

    return true;
  }

  done() {
    // this.router.navigate(['card-management'], {relativeTo: this.route})

    this.router.navigate(['/card-management/virtual-card']).then();
  }
}
