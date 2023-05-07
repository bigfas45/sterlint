import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-of-states',
  templateUrl: './list-of-states.component.html',
  styleUrls: ['./list-of-states.component.scss']
})
export class ListOfStatesComponent implements OnInit {

  isloading = false;
  statesList: any[]=[];

  constructor() { }

  ngOnInit(): void {
  }



  search(event: any){
   
  }

}
