import {isDevMode, Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'assetUrl' })
export class AssetUrlPipe implements PipeTransform {
  transform(value: string): string {
    const baseURL = isDevMode() ?  'http://localhost:9026/assets/' : 'https://devtest.stanbicibtc.com:9000/OnlineBankingCardManagement/en-us/assets/'
    return baseURL + value;
  }
}
