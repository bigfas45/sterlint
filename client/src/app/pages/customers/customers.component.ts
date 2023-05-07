import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customerList: any[]=[]
  constructor() { }

  ngOnInit(): void {
    this.customerList = [1,2,3,4,5,6,7,8,9,10];
  }

}
