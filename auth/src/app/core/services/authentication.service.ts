import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface TimeData {
  minutes: number;
  seconds: number;
  timer: number;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  baseUrl = environment.baseUrl;
  timeValues = new Subject<TimeData>();
  timerInterval: ReturnType<typeof setInterval>;

  constructor(private httpClient: HttpClient) {}

  authenticateUser(userData: any): Observable<any> {
    const payload = {
      hashedPassword: userData.password,
      userId: userData.userID,
      channel: 0,
    };

    payload.hashedPassword = window.btoa(payload.hashedPassword);
    return this.httpClient.post(`${this.baseUrl}Authentication/Login`, payload);
  }

  validateLoginOTP(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.baseUrl}OneTimePassword/ValidateOtp`,
      payload
    );
  }

  getCustomerProfile(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.baseUrl}ProfileManagement/GetCustomerProfile`,
      payload
    );
  }

  initiateOtpRequest(
    payload: any
  ): Observable<any> {
    return this.httpClient.post<any>(
      `${this.baseUrl}UserProfileManagement/InitiateOTPRequest`,
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


  getAccountsByCIFID(payload: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}AccountDetails/getAccountDetailsByCifId`,
      {
        cifId: payload,
      }
    );
  }

  getAccountsSME(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.baseUrl}AccountDetails/getSMEAccountDetails`,
      {
        userId: payload,
      }
    );
  }

  getAccountsByUserID(userId: string): Observable<any> {
    return this.httpClient.post<any>(
      `https://80.248.0.83:7443/api/TransactionManagement/GetAccountByUserId`,
      { UserId: userId }
    );
  }

  getAppMenus(): Promise<any> {
    // return this.httpClient.get(`https://app.stanbicibtc.com/Ocelot_Admin/api/v1/AppControl/GetAppControlsforInternetBanking`)
    return fetch(`https://app.stanbicibtc.com/Ocelot_Admin/api/v1/AppControl/GetAppControlsforInternetBanking`)
  }
}
