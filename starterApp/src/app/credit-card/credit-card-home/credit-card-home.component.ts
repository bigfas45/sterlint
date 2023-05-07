import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreditCardService } from '../../core/services/credit-card.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { DecimalPipe, Location } from '@angular/common';
import { Router } from '@angular/router';
import { AllBranches } from '../../core/mock/accounts';

function _window(): any {
  return window;
}

@Component({
  selector: 'app-credit-card-home',
  templateUrl: './credit-card-home.component.html',
  styleUrls: ['./credit-card-home.component.scss'],
})
export class CreditCardHomeComponent implements OnInit {
  page: string | any;

  loaderIsActive: boolean = false;
  requestForm: FormGroup | any;
  selectedSourceAccount: any;
  accountList: Array<any> = [];

  debitableAccounts: Array<any> = [];

  ownLoaderMsg: string | any;
  branchList: Array<any> = [];
  placholder: any;

  selectedBranch: any;
  totalAmount: number | any;
  creditcardEligibityResp: [] | any;
  showSuccessfulPane = false;
  showCreditCheckPane = false;
  agreeToTerms: boolean | any;
  amountGreaterThanLimit: boolean = false;
  requestCardSuccess: boolean = false;
  showSuccessfullMessage: boolean = false;
  rquestCreditCard: boolean = true;
  todayDate: any;
  issuanceFeeEvent: boolean | any;
  isAllowedToProceedBalanceCheck: boolean = false;

  firstName: string | any;
  lastName: string | any;
  cardDetails: any;
  cardDetailsSub: Subscription | any;
  data: any;

  @ViewChild('termsModalTemplate') termsModalTemplate: TemplateRef<any> | any;
  public termsModalTemplateRef: MatDialogRef<any> | any;

  @ViewChild('keyFact') keyFact: TemplateRef<any> | any;
  public keyFactRef: MatDialogRef<any> | any;

  @ViewChild('OfferLetter') OfferLetter: TemplateRef<any> | any;
  public OfferLetterRef: MatDialogRef<any> | any;

  currentModalRef: Array<MatDialogRef<any>> = [];

  constructor(
    private _snackBar: MatSnackBar,
    private creditCardService: CreditCardService,
    private formBuilder: FormBuilder,
    private decimalPipe: DecimalPipe,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      branchCtrl: ['', Validators.required],
      sourceAcctCtrl: [''],
      amount: ['', Validators.required],
      nameCtrl: ['', Validators.required],
    });

    this.page = 'form';

    // this.loadBranchList();

    this.branchList = AllBranches;

    // this.fetchVirtualCardByCIFID('000129073');
  }

  onCancel() {}

  sendOtp(event: any, status: any) {}

  loadBranchList() {
    this.loaderIsActive = true;
    this.creditCardService.loadBranchList().subscribe(
      (response) => {
        this.loaderIsActive = false;

        if (response.ResponseCode === '000') {
          this.branchList = response.Data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  crediCheck() {
    this.showSuccessfulPane = true;
    this.showCreditCheckPane = true;
    this.rquestCreditCard = false;
  }

  showOptions(event: any): void {
    this.issuanceFeeEvent = event;

    if (event) {
      this.isAllowedToProceedBalanceCheck = true;
    } else {
      this.isAllowedToProceedBalanceCheck = false;
    }

    // if (this.issuanceFeeEvent) {
    //   this.loaderIsActive = true;
    //   this.creditCardService
    //     .accountBalanceCheck({ AccountNumber: this.cardDetails.AccountNumber })
    //     .subscribe(
    //       (response) => {
    //         this.loaderIsActive = false;

    //         if (response.ResponseCode === '999') {
    //           this._snackBar.open(response.ResponseDescription, 'Error', {
    //             duration: 30000,
    //           });
    //         }

    //         if (response.ResponseCode === '000') {
    //           // change back >
    //           if (response.Data.availableBalance > 5000) {
    //             this._snackBar.open(response.ResponseDescription, 'Ok', {
    //               duration: 30000,
    //             });
    //             this.isAllowedToProceedBalanceCheck = true;
    //           } else {
    //             this._snackBar.open(
    //               'You cannot proceed because of Insufficient funds',
    //               'Ok',
    //               { duration: 30000 }
    //             );
    //           }
    //         }
    //       },
    //       (error) => {
    //         this.loaderIsActive = false;

    //         this._snackBar.open('Something went wrong', 'Error', {
    //           duration: 30000,
    //         });
    //       }
    //     );
    // } else {
    //   this._snackBar.open(
    //     'Issuance Fee check is required to proceed.',
    //     'Error',
    //     { duration: 30000 }
    //   );
    //   this.isAllowedToProceedBalanceCheck = false;
    // }
  }

  fetchVirtualCardByCIFID(cif: any) {
    this.loaderIsActive = true;
    this.data = this.creditCardService.GetCardEligibilityByCif(cif).subscribe(
      (response) => {
        this.loaderIsActive = false;

        if (response.ResponseCode === '000') {
          console.log(response.Data['0']);

          this.cardDetails = response.Data['0'];
          this.placholder = `Enter amount to load card* (Max of N${this.cardDetails.CreditLimit}) `;
        }

        if (response.ResponseCode === '999') {
          this._snackBar.open(response.ResponseDescription, 'Error', {
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            duration: 1500,
          });
          // this.router.navigate([RouterConstants.FullDashboardURL]);
        } else {
          this.loaderIsActive = false;
          this._snackBar.open('Something went wrong', 'Error', {
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            duration: 1500,
          });
        }
      },
      (error) => {
        this.loaderIsActive = false;
        this._snackBar.open('Something went wrong', 'Error', {
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          duration: 1500,
        });
      }
    );
  }

  getSanitizedAmount(amountEntered: string) {
    let validAmountXter = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '.',
    ];

    if (!amountEntered) {
      return amountEntered;
    }

    let amountArray = amountEntered.toString().split('');
    let finalAmount = '';

    for (let cursor = 0; cursor < amountArray.length; cursor++) {
      if (validAmountXter.indexOf(amountArray[cursor]) != -1) {
        if (finalAmount.indexOf('.') != -1) {
          let finalAmountArray = finalAmount.split('.');
          if (finalAmountArray.length == 2 && finalAmountArray[1].length < 2) {
            finalAmount += amountArray[cursor];
          } else if (finalAmountArray.length == 1) {
            finalAmount += amountArray[cursor];
          }
        } else {
          finalAmount += amountArray[cursor];
        }
      }
    }

    return finalAmount;
  }

  amountInputFocus() {
    if (this.requestForm.controls['amount']) {
      let amountEntered = this.requestForm.controls['amount'].value;

      if (amountEntered) {
        //remove .00 if exist
        if (amountEntered.toString().indexOf('.00') != -1) {
          amountEntered = amountEntered.toString().replace('.00', '');
        }

        amountEntered = amountEntered.replace(/,/g, '');
      }

      this.requestForm.controls['amount'].setValue(amountEntered);
    }
  }
  amountInputKeyup() {
    let amount = 0.0;

    // Only allow digits on amount alone.
    if (this.requestForm.controls['amount']) {
      let amountEntered = this.requestForm.controls['amount'].value;
      amountEntered = this.getSanitizedAmount(amountEntered);
      this.requestForm.controls['amount'].setValue(amountEntered);
      amount = parseFloat(amountEntered);
    }

    this.totalAmount = amount;
    this.checkIfAmountEnteredAgainstLimit(amount);
  }

  checkIfAmountEnteredAgainstLimit(amount: number) {
    if (amount < 50000) {
      this.amountGreaterThanLimit = true;
      this._snackBar.open(
        `You can not request an amount less than N50,000 `,
        'Sorry',
        { duration: 3000 }
      );
      return;
    } else {
      this.amountGreaterThanLimit = false;
    }

    if (amount > this.cardDetails.CreditLimit) {
      this.amountGreaterThanLimit = true;
      this._snackBar.open(
        `You can not request an amount greater than your limit , ${this.cardDetails.CreditLimit}`,
        'Sorry',
        { duration: 3000 }
      );
      return;
    } else {
      this.amountGreaterThanLimit = false;
    }
  }

  amountInputBlur() {
    let amount = 0;
    if (this.requestForm.controls['amount']) {
      amount = this.requestForm.controls['amount'].value as number;
    }
    if (amount > 0) {
      this.requestForm.controls['amount'].setValue(
        this.decimalPipe.transform(amount, '1.2-2')
      );
    }
    this.totalAmount = amount;
  }

  onSelectedBranchChanged(evtData: any) {
    this.selectedBranch = evtData.value as any;
  }

  cancelAgreement() {
    // this.router.navigate(['card-management/credit-card']);
    this.rquestCreditCard = true;
    this.showCreditCheckPane = false;
    this._snackBar.open('You cannot proceed without a credit check', 'Ok', {
      duration: 9000,
    });
    this.termsModalTemplateRef.close();
    this.OfferLetterRef.close();
    this.keyFactRef.close();
  }

  creditCheck() {
    // this.loaderIsActive = true
    // this.creditCardService.creditCheckRequest({ "BVN":this.cardDetails.Bvn,  "AccountNumber": this.cardDetails.AccountNumber}).subscribe( response => {
    //   if(response.ResponseCode === '000'){
    //     this.loaderIsActive = false
    //     if(response.Data.IsCreditScoreCheckPositive){
    //       this.agreeToTerms = true
    //       this.showTermsAndCondition()
    //       // this._snackBar.open(response.ResponseDescription, 'Ok', { duration: 9000 });
    //     }else{
    //       // this._snackBar.open(response.ResponseDescription, 'Ok', { duration: 9000 });
    //     }
    //   }else{
    //     // this._snackBar.open(response.ResponseDescription, 'Ok', { duration: 9000 });
    //     this.loaderIsActive = false
    //   }
    //   // this.showCreditCheckPane = false

    // },

    //   (error) =>{
    //     this._snackBar.open("Something went wrong", 'Ok', { duration: 9000 });
    //     this.loaderIsActive = false
    //   }
    //   )

    this.agreeToTerms = true;
    this.showCreditCheckPane = false;
    this.showTermsAndCondition();
  }

  showTermsAndCondition() {
    this.agreeToTerms = true;
    this.showCreditCheckPane = true;
    this.termsModalTemplateRef = this.dialog.open(this.termsModalTemplate, {
      height: '700px',
      width: '700px',
    });

    this.termsModalTemplateRef.afterClosed().subscribe((res: any) => {});
  }

  showKeyFactStatement() {
    this.termsModalTemplateRef.close();
    this.rquestCreditCard = true;
    this.showCreditCheckPane = false;

    this.keyFactRef = this.dialog.open(this.keyFact, {
      height: '700px',
      width: '700px',
    });

    this.keyFactRef.afterClosed().subscribe((res: any) => {});
  }

  closeTermsModal($event: any) {}

  showOfferLetterStatement() {
    this.keyFactRef.close();
    this.OfferLetterRef = this.dialog.open(this.OfferLetter, {
      height: '700px',
      width: '700px',
    });

    this.OfferLetterRef.afterClosed().subscribe((res: any) => {});
  }

  calNextPayDate() {
    var dateNow = new Date();
    var lastDate = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0);
    var newDate = lastDate.setDate(lastDate.getDate() + 25);
    var date = new Date(lastDate);
    return date.toDateString();
  }
  cancelAgreementFact() {
    // this.router.navigate(['credit-cards']);
    this._snackBar.open(
      'You cannot proceed without KEY FACTS STATEMENT   ',
      'Ok',
      { duration: 9000 }
    );
    this.keyFactRef.close();
  }

  requestCard() {
    this.OfferLetterRef.close();
    this.keyFactRef.close();
    this.termsModalTemplateRef.close();
    this.rquestCreditCard = false;

    // this.loaderIsActive = true;
    const payload = this.buildPayload();

    this.showSuccessfullMessage = true;
    this.showCreditCheckPane = false;

    // this.creditCardService.requestCreditCard(payload).subscribe(
    //   response => {
    //     this.loaderIsActive = false;
    //     this.ownLoaderMsg = '';
    //     if (response.ResponseCode === '00') {
    //       console.log("hello")
    //       this._snackBar.open(response.ResponseDescription, 'Ok', { duration: 2000 });
    //       this.showSuccessfullMessage = true
    //       this.showCreditCheckPane = false
    //       return;
    //     }
    //     this.showSuccessfulPane = false;
    //     this._snackBar.open(response.ResponseDescription, 'Ok', { duration: 2000 });
    //   },
    //   (error) => {
    //     this.ownLoaderMsg = '';
    //     this.showSuccessfulPane = false;
    //     this.loaderIsActive = false;
    //     this._snackBar.open('Error occured', 'Ok', { duration: 2000 });
    //   }
    // );
  }

  buildPayload(): any {
    return {
      acceptedAmount: Number(this.totalAmount),
      cardName: this.requestForm.controls['nameCtrl'].value,
      cifId: '000129073',
      //  cifId:  AuthService.FullyAuthenticatedUser.CifId,
      collectingBranchSol: this.selectedBranch.branchCode,
      requestId: '',
      // requestId: this.creditcardEligibityResp.RequestId
      // sourceAccountNo: this.selectedSourceAccount.accountNumber
    };
  }

  gotoHome() {
    this.router.navigate(['home']);
  }
}
