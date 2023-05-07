import { Component } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  name = 'Get Current Url Route Demo';
  currentRoute!: string;
  
  title = 'OnlineBankingFrontendControlApplication';
  path: any;
  constructor(public router: Router){

    this.path = window.location.href.split('/').splice(-1); 
    console.log(window.location.href.split('/').splice(-1));
    
  }

    ngOnInit() {
      this.path = window.location.href.split('/').splice(-1);  
    }

    
}
