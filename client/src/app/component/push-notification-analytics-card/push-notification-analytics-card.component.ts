import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-push-notification-analytics-card',
  templateUrl: './push-notification-analytics-card.component.html',
  styleUrls: ['./push-notification-analytics-card.component.scss']
})
export class PushNotificationAnalyticsCardComponent implements OnInit {
  @Input()
  name!: String;
  @Input()
  value!: any;
  constructor() { }

  ngOnInit(): void {
  }

}
