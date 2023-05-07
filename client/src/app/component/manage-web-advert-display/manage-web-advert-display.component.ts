import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-web-advert-display',
  templateUrl: './manage-web-advert-display.component.html',
  styleUrls: ['./manage-web-advert-display.component.scss']
})
export class ManageWebAdvertDisplayComponent implements OnInit {
  advertInfo: any;

  
  @Input()
  title!: String;

  @Input()
  description: any;

  @Input()
  callToAction: any

  @Input()
  displayAudience: any

  @Input()
  eligibility: any

  @Input()
  status: any

  @Input()
  advertUri: any

  createAdvertForm!: FormGroup



  constructor(private router: Router,) {
   }

  ngOnInit(): void {


    this.createAdvertForm = new FormGroup({
      title: new FormControl(this.title, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100),
      ]),
      description: new FormControl(this.description, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100),
      ]),
      callToAction: new FormControl(this.callToAction, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100),
      ]),
      advertUri: new FormControl(this.advertUri, []),
    })

  }

  file: any;
  getFile(event: any){
    this.file = event.target.files[0];

    console.log(this.file);
    
  }

  updateAdvert(){
    
  }

  uploadphoto(){
    
    document.getElementById('upload-file')?.click;
  }
}
