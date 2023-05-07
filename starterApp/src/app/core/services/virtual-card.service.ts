import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface TimeData {
  minutes: number;
  seconds: number;
  timer: number;
}

@Injectable({
  providedIn: 'root',
})
export class VirtualCardService {
  cardDetails = new BehaviorSubject<any>({
    card: {},
  });

  constructor(private _httpClient: HttpClient) {}

  getAccounts() {
    return JSON.parse(localStorage.getItem('userAccount') || '{}');
  }

  timeValues = new Subject<TimeData>();
  timerInterval: ReturnType<typeof setInterval> | any;

  fetchCardByCif(CifId: string): Observable<any> {
    const _url = `https://stanbic.nibse.com/mybank/VirtualCardAPI/api/v1/virtualcard/fetchCardByCif?CIFID=${CifId}`;
    return this._httpClient.post<any>(`${_url}`, { cif: CifId });
  }

  changePin(payload: any): Observable<any> {
    return this._httpClient.post<any>(
      `https://stanbic.nibse.com/mybank/VirtualCardAPI/api/v1/virtualcard/ChangePin`,
      payload
    );
  }

  fetchCards(payload: any): Observable<any> {
    return this._httpClient.post<any>(
      `https://stanbic.nibse.com/mybank/VirtualCardAPI/api/v1/virtualcard/fetchCards`,
      payload
    );
  }

  hotlistCard(payload: any, type: string): Observable<any> {
    return this._httpClient.post<any>(
      `https://stanbic.nibse.com/mybank/VirtualCardAPI/api/v1/virtualcard/blockCard?type=${type}`,
      payload
    );
  }

  cardtypeCheckCheck(payload: any): Observable<any> {
    console.log(payload);
    return this._httpClient.post<any>(
      `https://stanbic.nibse.com/mybank/VirtualCardAPI/api/v1/DebitCard/CardType`,
      payload
    );
  }

  sendOpt(customerId: string): Observable<any> {
    const _url = `https://stanbic.nibse.com/mybank/VirtualCardAPI/api/v1/virtualcard/send-otp?customerId=${customerId}`;
    return this._httpClient.post<any>(`${_url}`, { customerId: customerId });
  }

  validateOpt(payload: any): Observable<any> {
    const _url = `https://stanbic.nibse.com/mybank/VirtualCardAPI/api/v1/virtualcard/validate-otp`;
    return this._httpClient.post<any>(`${_url}`, payload);
  }

  accountBalanceCheck(payload: any): Observable<any> {
    return this._httpClient.post<any>(
      `https://stanbic.nibse.com/mybank/VirtualCardAPI/api/v1/customer-account/account-balance`,
      payload
    );
  }

  requestVirtualCard(payload: any): Observable<any> {
    console.log(payload, 'payload');
    return this._httpClient.post<any>(
      `https://stanbic.nibse.com/mybank/VirtualCardAPI/api/v1/virtualcard/create`,
      payload
    );
  }

  setTimer() {
    const startTime: number = 4;
    let timer = startTime * 60;
    this.timerInterval = setInterval(() => {
      if (timer == 0) {
        this.clearTimer();
        return;
      }
      timer--;
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      this.timeValues.next({
        minutes: minutes,
        seconds: seconds,
        timer: timer,
      });
    }, 1000);
  }
  clearTimer() {
    clearInterval(this.timerInterval);
  }
}
