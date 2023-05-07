import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {VirtualCardService} from '../../core/services/virtual-card.service'
import SwiperCore, {Pagination, Navigation, SwiperOptions} from 'swiper';
import {cardVirtuals} from '../../core/mock/accounts'


SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-card-management-main',
  templateUrl: './card-management-main.component.html',
  styleUrls: ['./card-management-main.component.scss']
})
export class CardManagementMainComponent implements OnInit {


  data: any
  cardVirtuals: any
  @Input() show:  Boolean = false
  @Input() showId:  Number = 0
 loaderIsActive: Boolean = false
 @Input() active: Boolean = false

  hiddenNumber:string | any;
  pins = [];
  cards: {
    cardType: string,
    cardPin: string,
    expiryDate:Date,
    cardBackgrnd: string,
    pinDisplayStatus: string}[] = [];
    authData: any
  visibility: string = 'visibility_off';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private virtualCardService: VirtualCardService
  ) {}

  ngOnInit(): void {
    this.authData = localStorage.getItem('authData') ? JSON.parse(localStorage.getItem('authData') || '{}') : null 


    // this.fetchVirtualCardByCIFID(this.authData.CifId,)

    this.cardVirtuals  = cardVirtuals
    console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP", cardVirtuals)


  }


  config: SwiperOptions = {
    spaceBetween: 40,
    centeredSlides: true,
    
    navigation: true,
    breakpoints: {
      '0': {
        slidesPerView: 1
      },
      '770': {
        slidesPerView: 2
      },
      '800': {
        slidesPerView: 1
      },
      '960': {
        slidesPerView: 2
      },
      '1100': {
        slidesPerView: 1
      }
    }
  }


  hidePin(pin:string) {

    return ('' + pin).slice(0, 4) + ('' + pin).slice(4, 11).
    replace(/./g, '*') + ('' + pin).
    slice(11);



  }

  showCardDetails(id: any){
    this.show= !this.show
    this.showId = id
  }


  onCardManage(card: any ,index: number) {
    this.virtualCardService.cardDetails.next({card, index});
    this.router.navigate(['edit',index], {relativeTo: this.route})
    this.active = !this.active

    console.log(this.active)

  }


  fetchVirtualCardByCIFID(cif: any) {
    this.loaderIsActive = true;
    this.data =  this.virtualCardService.fetchCardByCif(cif).subscribe(
      (response) => {
        if (response.responseCode === "000") {
          this.cardVirtuals = response.data.list
          console.log("QQQQ",this.cardVirtuals);

          if(this.cardVirtuals.length < 0){
            this.router.navigate(["/card-management/virtual-card/request"]).then();

          }

          this.loaderIsActive = false;

        } else {
          this.loaderIsActive = false;
          // this._snackBar.open(response.responseDescription,
          //   'Error', { verticalPosition: 'bottom', horizontalPosition: 'right', duration: 1500 });
        }
      },
      (error) => {
        this.loaderIsActive = false
        console.log(error)
        // this._snackBar.open(error,
        //   'Error', { verticalPosition: 'bottom', horizontalPosition: 'right', duration: 1500 });
      }
    );

  }


}
