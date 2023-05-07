import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtual-card',
  templateUrl: './virtual-card.component.html',
  styleUrls: ['./virtual-card.component.scss']
})
export class VirtualCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  virtualCardNavs = [
    { route: '/card-management/virtual-card', description: 'Virtual Card Management' },
    { route: '/card-management/virtual-card/request', description: 'Create Virtual Card' },

   

  ];


}
