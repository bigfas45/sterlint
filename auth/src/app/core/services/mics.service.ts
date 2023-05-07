import { Injectable } from "@angular/core";
import { Subject,Observable } from "rxjs";




export interface TimeData {
  minutes: number;
  seconds: number;
  timer: number
}



@Injectable({ providedIn: 'root' })
export class MiscService {
    timeValues = new Subject<any>();
    timerInterval: ReturnType<typeof setInterval> ;

    
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