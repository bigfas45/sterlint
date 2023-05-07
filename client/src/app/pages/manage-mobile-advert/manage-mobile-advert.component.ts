import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-mobile-advert',
  templateUrl: './manage-mobile-advert.component.html',
  styleUrls: ['./manage-mobile-advert.component.scss']
})
export class ManageMobileAdvertComponent implements OnInit {

  adSummaryList: any[]=[];
  adSummaryListImages: any[]=[];

  constructor() { }

  ngOnInit(): void {
    this.adSummaryList=[1,2,3];
    this.adSummaryListImages=[1,2];
  }

}
