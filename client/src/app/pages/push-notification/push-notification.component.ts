import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss']
})
export class PushNotificationComponent implements OnInit {
  promotionsList: any[]=[];
  constructor() { }

  ngOnInit(): void {
    this.promotionsList = [1,2,3,4]
  }

}
