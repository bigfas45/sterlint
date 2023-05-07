import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import {catchError, map} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  // rootUrl ='https://vbox.com.ng/apv'
  // rootUrl ='https://vbox.com.ng/api'
  rootUrl ='https://sterling.dev/api'
  // rootUrl = 'https://ibanking.stanbicibtcbank.com/gateway/PilotOnlineBanking'
  // rootUrl = 'https://app.stanbicibtc.com/Ocelot_Admin'
  
  constructor(private http: HttpClient) { }


  control() {
    return this.http.get(`${this.rootUrl}/control/app`,).pipe(
      tap((response) => {
      })
    )
  }


  controlSearch( search: any) {
    return this.http.get(`${this.rootUrl}/control/search?appMenuName=${search}`).pipe(
      tap((response) => {
      })
    )
  }

  controlAddNew(credentials: any) {
    return this.http.post(`${this.rootUrl}/control`, credentials).pipe(
      tap((response) => {
      })
    )
  }

  fetchAllSubFeatureByControlId(id: any){
    return this.http.get(`${this.rootUrl}/features/${id}`).pipe(
      tap((response) => {
      })
    )
  }

  controlUpdate(credentials: any, id: any) {
    return this.http.put(`${this.rootUrl}/control/${id}`, credentials).pipe(
      tap((response) => {
      })
    )
  }


  deleteControlById(id: any){
    return this.http.delete(`${this.rootUrl}/control/${id}`).pipe(
      tap((response) => {
        console.log(response)
      })
    )
  }


 







  controlOrderUpdate(order1: any,  order2: any) {
    return this.http.put(`${this.rootUrl}/control/${order1}/${order2}`, {}).pipe(
      tap((response) => {
      })
    )
  }


 









  controlFeaturesAdd(data: any, id: any){
    return this.http.post(`${this.rootUrl}/api/v1/Feature/AddFeature?appControlId=${id}`, data).pipe(
      tap((response) => {
      })
    )
  }


  controlSubFeaturesUpdate(credentials: any, id: any) {
    return this.http.post(`${this.rootUrl}/api/v1/Feature/UpdateFeature`, credentials).pipe(
      tap((response) => {
      })
    )
  }

  deleteSubFeatures(id: any){
    return this.http.delete(`${this.rootUrl}/api/v1/Feature/RemoveFeature?featureId=${id}`).pipe(
      tap((response) => {

      })
    )
  }


  controlUpdateStatus(credentials: any, id: any) {
    return this.http.patch(`${this.rootUrl}/api/v1/AppControl/UpdateAppControlStatus?appControlId=${id}`, credentials).pipe(
      tap((response) => {
      })
    )
  }

  
  authserviceFunc(body: any)
  { 
   
      return this.http.post('https://10.234.18.167:9444/authentication/api/authenticate/login',
      body,
        {headers: 
          {
            "x-api-key":'apikey',
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
          }
        })
      .pipe(
        catchError(err => {
          return throwError(() => err);
        },  
        ),
      );
  }


  // ADVERT API
  getAdvertsList(){
    return this.http.get(`${this.rootUrl}/api/v1/WebAdvert/GetWebAdverts`).pipe(
      tap((response) => {
      })
    )
  }
  
  createAdvert(data: any){
    return this.http.post(`${this.rootUrl}/api/v1/WebAdvert/CreateWebAdvert`,data).pipe(
      tap((response) => {
      })
    )
  }


  updateAdvert(advertId: any,data: any){
    return this.http.put(`${this.rootUrl}/adverts/${advertId}`,data).pipe(
      tap((response) => {
      })
    )
  }


  transferToChild(){
    
  }




}
