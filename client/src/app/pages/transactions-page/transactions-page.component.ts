import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss']
})
export class TransactionsPageComponent implements OnInit {
  transactionList: any[]=[]
  constructor() { }

  ngOnInit(): void {
    this.transactionList = [1,2,3,1,1,1,1,1,1,1,1,1,1];
  }

}
