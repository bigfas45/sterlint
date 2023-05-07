import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-of-banks',
  templateUrl: './list-of-banks.component.html',
  styleUrls: ['./list-of-banks.component.scss']
})
export class ListOfBanksComponent implements OnInit {
  
  isloading = false;
  statesList: any[]=[];

  constructor() { }

  ngOnInit(): void {
  }



  search(event: any){
   
  }

}
