import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss']
})
export class AuditTrailComponent implements OnInit {
  auditList: any[]=[];

  constructor() { }

  ngOnInit(): void {
    this.auditList = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  }

}
