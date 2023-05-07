import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DebitCardService } from '../../core/services/debit-card.service';
import { debitCard, mockAccounts } from '../../core/mock/accounts';
import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';

SwiperCore.use([Pagination, Navigation]);

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cif: any;
  loaderIsActive: boolean | any;
  showDebitCard: boolean | any;
  Payload: any;
  accountForm: FormGroup | any;
  selectAccount = false;

  accountNumbers: any;
  buttondisabler: boolean | any;
  waiter: boolean | any;
  otpForm: FormGroup | any;
  activated: boolean | any;
  unactivated: boolean | any;
  ownLoaderMsg: string | any;
  activecardDatas: any;
  accountPan: any;
  selectedCard: any;
  giveConsentDatas: any;
  giveConsent: string | any;
  progressColor: string | any;
  successPop: boolean | any;
  otpshow: boolean | any;
  revokeConsentDatas: any;
  revokeConsent: string | any;
  proceed = false;
  cardBlocked = false;
  showCard: any;
  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    center: true,
    dots: true,
    navSpeed: 700,
    navText: [
      '<div>' +
        "<div class='nav-btn prev-slide cursor' style='position:relative;left:10%;top:40%;'> " +
        "<a class='btn btn-success' (click)='owlCar.prev()'><img src='assets/img/previous-btn.png'> </a> " +
        '</div>',
      "<div class='nav-btn next-slide cursor' style='position:relative;left:100px;top:40%;'> " +
        "<a class='btn btn-success' (click)='owlCar.next()'><img src='assets/img/next-btn.png'> </a> " +
        '</div>' +
        '</div>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };

  activeSlides: any;
  activeIndex: number | any;
  // selectedCard: CreditCardRecords;
  selectedCardAmount: string = '';
  AutorenewalStatus: string | any;
  creditCards: any;
  creditCardsSlice: number | any;
  firstCreditCardArr: any;
  secondCreditCardArr: any;
  activeCreditCard: any;
  notificationType: any;
  otpReference: any;
  initiateOTPSub: any;
  exceptionMessage: string | any;
  accountNumber: string | any;
  selected: boolean | any;
  selectedAccount: any;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private debitCardService: DebitCardService
  ) {}

  config: SwiperOptions = {
    spaceBetween: 0,
    centeredSlides: false,

    navigation: true,
  };

  ngOnInit(): void {
    this.waiter = true;
    this.successPop = false;
    this.selected = false;
    this.activated = true;
    this.unactivated = false;
    this.otpshow = false;
    this.getActiveDebitCards({ cifid: '101187661' });
    //this.accountNumber = "0020382172";//VariablesService.CustomerAccounts[0].accountNumber;
    // this.creditCards = VariablesService.DebitCardRecords;

    if (this.creditCards.length > 1) {
      const indexToSplit = Math.round(this.creditCards.length / 2);
      const creditCardsArr = this.creditCards;
      this.firstCreditCardArr = creditCardsArr.slice(0, indexToSplit);

      this.secondCreditCardArr = creditCardsArr.slice(indexToSplit + 1);
    } else {
      this.firstCreditCardArr = this.creditCards;
    }
    this.buttondisabler = true;
    this.formInit();
    this.accountFormInit();
  }

  formInit() {
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required],
    });
  }
  close() {}

  ResendOtp() {}



  otpValidation() {
    this.Payload = {
      serialNumber: this.selectedCard.serialNumber,
      accountNumber: this.accountNumber,
      otp: this.otpForm.controls['otp'].value,
      otpReference: this.otpReference,
    };

    // this.activated = false;

    // if (this.activated) {
    if (this.selectedCard.consentStatus != 'n') {
      this.AutorenewalStatus = 'Revoke Autorenewal Consent Saved';
      console.log("y")
      this.successDone();
      // this.RevokeRenewalConsent(this.Payload);
    } else {
      // this.giveRenewalConsent(this.Payload);
      this.successDone();
      console.log("n")
      this.AutorenewalStatus = 'Give Autorenewal Consent Saved';
    }
    //this.makeUnschedulePayment(this.paymentPayload);
  }

  proceedtoOtp() {
    this.proceed = false;
    this.buttondisabler = true;
    this.sendOtp();
  }

  successDone() {
    this.otpshow = false;
    this.successPop = true;
    this.selectAccount = false;
  }

  onSelectedBranchChanged(event: any) {}

  selectToggle(index: number) {
    console.log(index)
    this.selectAccount = true;
    this.selected = !this.selected;
    this.accountForm.reset();
    this.buttondisabler = true;
    this.showDebitCard = false;

     this.selectedCard = debitCard[index];

     console.log(this.selectedCard);

     this.selectedAccount = debitCard[index].accountNumbers
     
    this.accountNumbers = mockAccounts;

    // this.selectedCard.expiryDate = ('' +this.selectedCard.expiryDate).slice(0,2) + ('/') + ('' + this.selectedCard.expiryDate).slice(3,-1)
    // console.log(this.selectedCard.expiryDate.slice(0,1))
  }

  getActiveDebitCards(cifid: any) {
    // this.loaderIsActive = true;
    this.creditCards = debitCard;

    this.activecardDatas = debitCard;

    this.showDebitCard = true;

    console.log(this.creditCards);

    // this.debitCardService.getActiveDebitCard(cifid).subscribe(
    //   (response: any) => {
    //     this.ownLoaderMsg = "";
    //     this.loaderIsActive = false;
    //     this.waiter = false;
    //     // if (response.ResponseCode === ResponseCodes.SUCCESS) {
    //     if (response.ResponseDescription === "Success" && response.Data != null) {
    //       this._snackBar.open(response.ResponseDescription, "Ok", {
    //         duration: 2000,
    //       });

    //       this.activecardDatas = response.Data.accountPanResponseList;
    //       console.log(this.activecardDatas)
    //       this.activecardDatas.map((activeCard: { expiryDate: string; }) => {
    //         const year = ('' +activeCard.expiryDate ).slice(0,2);
    //         const month = ('' +activeCard.expiryDate ).slice(2,4)
    //         activeCard.expiryDate = month + ('/') + year;
    //         console.log(activeCard)
    //       })
    //       // response.Data.accountPanResponseList.map(x=>
    //       //   {
    //       //     let deter =x.expiryDate.split('');
    //       //     deter.splice(2,0,'/');
    //       //     x.expiryDate = deter.join('');
    //       //   });
    //       //console.log(val);
    //       this.creditCards = response.Data.accountPanResponseList;
    //       // this.activated = this.creditCards[0].consentStatus.toLowerCase() == "yes";
    //       // console.log(this.activated);
    //       // this.unactivated =  !this.activated
    //       this.showDebitCard = true;
    //       return;
    //     } else {
    //       this.activecardDatas = "no cards found";
    //     }
    //     this._snackBar.open(response.ResponseDescription, "Ok", {
    //       duration: 2000,
    //     });

    //   },
    //   (error) => {
    //     this.ownLoaderMsg = "";
    //     this.loaderIsActive = false;
    //     this.waiter = false;
    //     this.showDebitCard = true;
    //     this._snackBar.open("Error occured", "Ok", { duration: 2000 });
    //   }
    // );
  }

  goBack2() {
    this.selectAccount = false;
    this.otpshow = false;
    this.showDebitCard = true;
  }

  accountFormInit() {
    this.accountForm = this.formBuilder.group({
      account: ['', Validators.required],
    });
  }

  sendOtp() {
    this.selectAccount = false;
    this.otpFormShow();
  }

  otpFormShow() {
    // this.showDebitCard = false;
    this.otpshow = true;

    // @ts-ignore
    // this.selectedCard = debitCard['0'];

x  }
}
