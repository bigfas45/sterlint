import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { LogoutDialogComponent } from '../dialog/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  windowLocation: any;
  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.windowLocation = this.router.url;
  }

  logout(){
    let dialogRef = this.dialog.open(
        LogoutDialogComponent
    );

    dialogRef.afterClosed().subscribe(result=>{
      if (result == 'continue') {
        this.router.navigate(['/'])
      }
    })

  }

 
  navigateTo(path: any, event: any){

    // event.target.Class = 'button_current';

    // if (event.tar) {
      
    // }
    
    // event.target.style.backgroundColor='lime';

    // document.getElementById("nav-2")!.style.backgroundColor = 'black';

    // var elements = document.getElementsByClassName("sidebar-btn");
    // for (var i = 0; i < elements.length; i++) {
    //   console.log(elements[i]);
    //   elements[i]
    // }

      this.router.navigate([path]);

      // if (condition) {
        
      // }
      

  }

}
