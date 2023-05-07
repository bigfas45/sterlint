import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  baseUrl = environment.production;

  _apiBaseUrl = 'https://stanbic.nibse.com/mybank/CreditCardManagement';

  cardDetails = new BehaviorSubject<any>({
    card: {},
  });

  constructor(private _httpClient: HttpClient) {}

  loadBranchList(): Observable<any> {
    return this._httpClient.post<any>(
      `https://stanbic.nibse.com/mybank/CreditCardManagement/api/Branch`,
      {}
    );
  }

  GetCardEligibilityByCif(CifId: string): Observable<any> {
    // console.log(this._apiBaseUrl, this._apiBaseUrl2)
    return this._httpClient.post<any>(
      `${this._apiBaseUrl}/credit-card-transactions/GetCardEligibilityByCif?cifId=${CifId}`,
      { cifId: CifId }
    );
  }


  accountBalanceCheck(payload: any): Observable<any> {
    return this._httpClient.post<any>(`${this._apiBaseUrl}/customer-account/account-balance`,
        payload
    );
}


creditCheckRequest(payload: any): Observable<any> {
  return this._httpClient.post<any>(`${this._apiBaseUrl}/customer-account/credit-score`,
      payload
  );
}


requestCreditCard(payload: any): Observable<any> {
  return this._httpClient.post<any>(`${this._apiBaseUrl}/credit-card-transactions/request-card`,
      payload
  );
}
}
