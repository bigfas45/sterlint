import {isDevMode, Pipe, PipeTransform} from '@angular/core';



@Pipe({ name: 'cardFormart' })

export class CardFormartPipe implements PipeTransform {
  transform(value: string, targetUnits: string): any {
    let pinPan : any
    if(value && targetUnits === 'cf'){
    pinPan = (('' + value).slice(0, 12).replace(/./g, '*')+ ('' + value).slice(12, -1) + ('' + value).slice(-1));
    return pinPan.replace(/\./gi, '').replace(/(.{4})/g, '$1 ')
    }else{
    }

    if(value && targetUnits === 'cfs'){
      return value.replace(/\W/gi, ' ').replace(/(.{4})/g, '$1  ')
      }else{
      }


    if(value && targetUnits === 'df'){
       console.log("Date format")
       return value.replace(/(\w{2})(\w{2})/, '$1/$2')
        }else{
        }
  }

}


