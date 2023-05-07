import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Injectable } from '@angular/core';
import {catchError, map, retry} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptor implements HttpInterceptor {

  
  
  userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : null 
  otpToken = localStorage.getItem('otpToken') ? localStorage.getItem('otpToken') : null
  authData = localStorage.getItem('authData') ? JSON.parse(localStorage.getItem('authData') || '{}') : null 

  constructor(
    private router: Router
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let changedReq: any
    if (this.userId) {
      changedReq = req.clone({
        headers: req.headers
          .set('Content-Type', 'application/json')
          .set('X-STC-AGENT-CACHE', this.userId )
          .set('X-RTC-AGENT-CACHE', this.otpToken ? this.otpToken : this.userId)
          .set('X-TTC-AGENT-CACHE', "200")
          .set('X-STM1UC-AGENT-REDUX', this.authData?.YPSFlixDescription ? this.authData?.YPSFlixDescription : '')
          .set('Authorization', this.getAuthToken() || 'Bearer')
      });
    }

    return next.handle( this.userId ? req :  changedReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body.Token) {
            localStorage.setItem('authToken', event.body.Token)
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.clear();
          sessionStorage.clear()
          this.router.navigate(['/auth/login'], {queryParams: {loggedOut: 'true'}}).then()
        }
        return throwError(error.message);
      })
    );
  }

  getAuthToken(): string {
    const authToken = localStorage.getItem('authToken')
    if (authToken) {
      return `Bearer ${authToken}`;
    } else {
      return null || '{}'
    }

  }
}
