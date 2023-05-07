import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openAccountCreation() {
    window.open('https://80.248.0.83:8091/AccountOpening/')
  }

  openAgentLocator() {
    window.open('https://sbagentlocator.web.app/')
  }

  openAgentQuickServices() {
    window.open('https://ibanking.stanbicibtcbank.com/quickservices/#/')
  }
}
