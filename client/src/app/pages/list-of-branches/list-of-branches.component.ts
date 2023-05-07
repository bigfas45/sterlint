import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-of-branches',
  templateUrl: './list-of-branches.component.html',
  styleUrls: ['./list-of-branches.component.scss']
})
export class ListOfBranchesComponent implements OnInit {

  isloading = false;
  statesList: any[]=[];

  constructor() { }

  ngOnInit(): void {
  }



  search(event: any){
   
  }
}
