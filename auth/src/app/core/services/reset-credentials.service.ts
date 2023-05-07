import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { posts } from 'src/posts';
import { User } from 'src/app/core/interface/user';

@Injectable({
  providedIn: 'root',
})
export class ResetCredentialsService {
  // url = 'http://localhost:44321'
  baseUrl = 'https://devtest.stanbicibtc.com:7443/ocelotgateway/api';

  url = 'https://app.stanbicibtc.com/OnlineBanking/api';
  'https://app.stanbicibtc.com/OnlineBanking/api/v1/ProfileManagement/SME/ValidateUserIdAndSecretWord';
  // this.url+'api/v1/ProfileManagement/SME/ValidateUserIdAndSecretWord'
  // data={
  //   "userId": "AYODELEAYETIGBO-INIT",
  //   "accountNo": "0006897146",
  //   "secretWord": "string",
  //   "channel": 0
  // }

  constructor(private http: HttpClient) {}

  post(opost: any): Observable<any> {
    return this.http.post(
      'https://app.stanbicibtc.com/OnlineBanking/api/v1/ProfileManagement/SME/ValidateUserIdAndSecretWord',
      opost
    );
  }
  postSubmit(payload: any) {
    return this.http.post<any>(
      'https://app.stanbicibtc.com/OnlineBanking/api/v1/ProfileManagement/SME/ResetPassword',
      payload
    );
  }

  // createMine(user: any):Observable<User>{
  //   return this.http.post<User>("https://app.stanbicibtc.com/OnlineBanking/api/v1/ProfileManagement/SME/ResetPassword",user)
  // }

  createMine(payload: any): Observable<any> {
    console.log(payload);

    return this.http.post<any>(
      `https://app.stanbicibtc.com/OnlineBanking/api/v1/ProfileManagement/SME/ResetPassword`,
      payload
    );
  }

  changePassword(payload: any){    return this.http.post("https://app.stanbicibtc.com/OnlineBanking/api/v1/ProfileManagement/ChangePassword", payload)  }

  //  postSubmit(){
  //   return this.http.post(this.url+'api/v1/ProfileManagement/SME/ValidateUserIdAndSecretWord', data)

  //  }

  //  postDebitcard(data){
  //  return this.http.post(this.baseUrl+'/api/PasswordReset/requestOtp',data)
  //  }

  //  postCard(data){
  //     let url="https://app.stanbicibtc.com/OnlineBanking/api/v1/ProfileManagement/ValidateRetailUserIdAndAccountNo";
  //    return this.http.post(url, data)
  //  }

  // postMypin(data: any){
  //   return this.http. post(this.baseUrl,Response)
  // }

  // postMySecretword(data): Observable<any>{
  //   return this.http. post(this.baseUrl+'/v1/ProfileManagement/ResetPasswordBySecretWord', data)

  // }
}
