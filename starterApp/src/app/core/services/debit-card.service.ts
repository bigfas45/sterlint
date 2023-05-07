import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DebitCardService {

  cardDetails = new BehaviorSubject<any>({
    card: {}
});

  constructor(private _httpClient: HttpClient, ) { }

 
cardtypeCheckCheck(payload: any): Observable<any> {
  console.log(payload)
  return this._httpClient.post<any>(`https://stanbic.nibse.com/mybank/VirtualCardAPI/api/v1/DebitCard/CardType`,
      payload
  );
}


getActiveDebitCard(cifid:  any): Observable<any> {
  return this._httpClient.post<any>(`https://stanbic.nibse.com/mybank/DebitCardAutoRenewalAPI/api/DebitCardAutoRenewal/GetActiveCards`, cifid)
  
  
}



}
