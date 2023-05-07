import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() navLinks: {link:string, name: string}[] | any ;


  @Input() modules: { name: string, subModules: {link:string, name: string} []}[] | any

  selectedLink:string | any;

  urlRouteParentLink: string | any;

  selectedGroupLink: string | any;
  constructor(
    private router: Router
  ) { }



  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // this.selectedLink = event.url.slice(1, event.url.length).match(/([\w+-]*\/)([\w+-]*\/)([\w+-]*)/)[0];
        const urlSplit = event.url.split('/');

        const urlLength =  urlSplit.length;
        this.urlRouteParentLink = urlSplit[0];
        this.selectedGroupLink = urlSplit[urlLength-2] + '/' + urlSplit[urlLength-1]

      }

    })
  }

  changeLink() {
    console.log(this.urlRouteParentLink)

    this.router.navigate(['transfer'  + '/' + this.selectedGroupLink])
  }

}
