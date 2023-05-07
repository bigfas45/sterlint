import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'OnlineBankingCardManagement';

  transferRoutes = [
    { link: '/card-management/credit-card', name: 'Credit Card' },
    {
      link: '/card-management/virtual-card',
      name: 'Virtual Card',
    },
    { link: '/card-management/debit-card', name: 'Debit Card' },
  ];

  mobileRoutes = [
    {
      name: 'Transfers',
      subModules: [
        {
          link: 'transfers/transfer-otherbanks',
          name: 'Transfer to Other Banks',
        },
        { link: 'transfers/transfer-self', name: 'Transfer to Self' },
        {
          link: 'transfers/transfer-beneficiairies',
          name: 'Transfer to Beneficiaries',
        },
        { link: 'transfers/transfer-ease', name: 'Transfer to @ease accounts' },
      ],
    },
    {
      name: 'International Transfers',
      subModules: [
        {
          link: 'international-transfers/western-union',
          name: 'Western Union Redemption',
        },
        {
          link: 'international-transfers/mastercard-payment',
          name: 'MasterCard Payment',
        },
      ],
    },
    {
      name: 'Beneficiaries',
      subModules: [
        { link: 'beneficiaries/beneficiary-list', name: 'Beneficiaries' },
        { link: 'beneficiaries/add-beneficiary', name: 'Add Beneficiary' },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
