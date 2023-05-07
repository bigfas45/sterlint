import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VirtualCardService } from '../../../core/services/virtual-card.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Brand {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.scss'],
})
export class ManageCardsComponent implements OnInit {
  selectedItem: string = 'Change Pin';
  loaderIsActive: Boolean = false;

  brands: Brand[] = [
    { value: 'Louis Vuitton', viewValue: 'Louis Vuitton' },
    { value: 'Gucci', viewValue: 'Gucci' },
    { value: 'Prada', viewValue: 'Prada' },
    { value: 'Chanel', viewValue: 'Chanel' },
  ];

  componentId: number | any;
  componentDetails: any;
  cardType: string | any;
  listItems: string[] = ['Change Pin', 'Hotlist Card'];

  cardManageOptions: string = 'Change Pin';

  managementOption: FormControl | any;
  cardDetailsSub: Subscription | any;
  currentCardDetails: any;

  cardDetails: any;
  cardActive: Boolean = false;
  success: Boolean = false;

  changePinForm: FormGroup | any;
  visibilityStatus = 'password';

  visibilityStatusConfirm = 'password';

  today = new Date().toLocaleString('default', { month: 'long' });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private virtualCardService: VirtualCardService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.cardDetailsSub = this.virtualCardService.cardDetails.subscribe(
      (response) => {
        this.cardDetails = response.card;

        if (this.cardDetails.carD_PROGRAM !== undefined) {
          // this.loaderIsActive = true
          this.cardActive = true;
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx', this.cardDetails);

          let cardsObj: any = {
            cardReference: this.cardDetails.carD_REF,
            accountNumber: this.cardDetails.accounT_NUM,
            clientReference: this.cardDetails.clienT_REF,
          };

          this.virtualCardService.fetchCards(cardsObj).subscribe(
            (response) => {
              this.loaderIsActive = false;
              if (response.responseCode === '000') {
                this.loaderIsActive = false;
                this.currentCardDetails = response.data.cards[0];
                console.log(this.currentCardDetails);
              } else {
                this.loaderIsActive = false;
                console.log('else statement');
                console.log(response.responseDescription);
                this._snackBar.open(response.responseDescription, 'Error', {
                  verticalPosition: 'bottom',
                  horizontalPosition: 'right',
                  duration: 2000,
                });
              }
            },
            (error) => {
              this.loaderIsActive = false;
              console.log('an error');
              console.log(error);
              this._snackBar.open(error.error.responseDescription, 'Error', {
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
                duration: 2000,
              });
            }
          );
        }
      }
    );
  }

  checkPasswordMatch() {
    if (
      this.changePinForm.value.newPassword ===
      this.changePinForm.value.confirmPassword
    ) {
      return true;
    } else {
      return false;
    }
  }

  resetPin() {
    // this.loaderIsActive = true;
    // let formObj: any = {
    //   // "cardReference": this.currentCardDetails.cardReference,
    //   // "oldPin": this.currentCardDetails.pinInfo,
    //   newPin: this.changePinForm.value.newPassword,
    // };

    if (this.checkPasswordMatch()) {
      this._snackBar.open('Pin Reset Succesful', '', {
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        duration: 3000,
      });
    } else {
      this._snackBar.open('Password do not match', 'error', {
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        duration: 3000,
      });
    }

    this.changePinForm.reset();

    // this.virtualCardService.changePin(formObj).subscribe(
    //         (response) => {
    //           if (response.responseCode === "000") {
    //             this.loaderIsActive = false;
    //             console.log(response)
    //             this._snackBar.open("Pin Reset Succesful",
    //               '', { verticalPosition: 'bottom', horizontalPosition: 'right', duration: 3000 });
    //               this.changePinForm.reset();
    //               this.router.navigate(['../../'], {relativeTo: this.route})

    //           } else {
    //             this.loaderIsActive = false;
    //             console.log("else statement")
    //             console.log(response.responseDescription)
    //             this._snackBar.open(response.responseDescription,
    //               'Error', { verticalPosition: 'bottom', horizontalPosition: 'right', duration: 2000 });
    //           }

    //         },
    //         (error) => {
    //           this.loaderIsActive = false
    //           console.log("an error")
    //           console.log(error)
    //           this._snackBar.open("Something wrong happened",
    //             'Error', { verticalPosition: 'bottom', horizontalPosition: 'right', duration: 2000 });
    //         }
    //       );
  }

  hotlist() {
    this.loaderIsActive = true;

    let hotlistObj: any = {
      cardReference: this.cardDetails.carD_REF,
      accountNumber: this.cardDetails.accounT_NUM,
    };

    this.virtualCardService.hotlistCard(hotlistObj, 'b').subscribe(
      (response) => {
        if (response.responseCode === '000') {
          this.loaderIsActive = false;
          console.log(response);
          this._snackBar.open('Card Hotlisted Succesfully', '', {
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            duration: 3000,
          });
          this.success = true;
        } else {
          this.loaderIsActive = false;
          console.log('else statement');
          console.log(response.responseDescription);
          this._snackBar.open(response.responseDescription, 'Error', {
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            duration: 2000,
          });
        }
      },
      (error) => {
        this.loaderIsActive = false;
        console.log('an error');
        console.log(error);
        this._snackBar.open('Card is already blocked!', 'Error', {
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          duration: 2000,
        });
      }
    );

    // console.log(this.data.card)
  }

  initForm() {
    this.changePinForm = new FormGroup({
      newPassword: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    });

    this.managementOption = new FormControl('', Validators.required);
  }

  onVisibilityChange(event: string) {
    if (event === 'newPassword') {
      console.log('hh');
      this.visibilityStatus == 'password'
        ? (this.visibilityStatus = 'text')
        : (this.visibilityStatus = 'password');
    } else {
      console.log('ll');

      this.visibilityStatusConfirm == 'password'
        ? (this.visibilityStatusConfirm = 'text')
        : (this.visibilityStatusConfirm = 'password');
    }
  }

  cardFormSubmit(event: any) {
    this.resetPin();
  }

  changeCase(cardType: any) {
    cardType = cardType.toLowerCase().split(' ');
    for (var i = 0; i < cardType.length; i++) {
      cardType[i] = cardType[i].charAt(0).toUpperCase() + cardType[i].slice(1);
    }
    return cardType.join(' ');
  }

  onChangeCardManageOpt(formOption: string) {
    this.cardManageOptions = formOption;
    this.selectedItem = formOption;
  }
}
