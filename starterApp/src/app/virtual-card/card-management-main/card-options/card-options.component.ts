import { Component, OnInit, Input } from '@angular/core';
import {VirtualCardService} from '../../../core/services/virtual-card.service'

@Component({
  selector: 'app-card-options',
  templateUrl: './card-options.component.html',
  styleUrls: ['./card-options.component.scss']
})
export class CardOptionsComponent implements OnInit {
  data: any
  cards: any
  @Input() show:  Boolean = false
  @Input() showId:  Number = 0
 loaderIsActive: Boolean = true
  constructor(private virtualCardService: VirtualCardService,) { }

  ngOnInit(): void {
  }




}
