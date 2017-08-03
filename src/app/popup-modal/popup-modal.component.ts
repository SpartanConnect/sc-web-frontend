import { Component, OnInit } from '@angular/core';
import { PopupModalService } from './popup-modal.service';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.scss']
})
export class PopupModalComponent implements OnInit {

  constructor(private popup: PopupModalService) { }

  ngOnInit() {
  }

}
