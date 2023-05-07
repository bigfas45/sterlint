import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  title = 'OnlineBankingFrontendControlApplication';

  constructor() { }
  isSessionActive: boolean = true;
  ngOnInit(): void {
  }

}
