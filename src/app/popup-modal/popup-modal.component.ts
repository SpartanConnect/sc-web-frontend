import { Component, OnInit } from '@angular/core';
import { PopupModalService, PopupModalTypes } from './popup-modal.service';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.scss']
})
export class PopupModalComponent implements OnInit {

    types = PopupModalTypes;

    // Variables for Setup
    setupHasConsent = false;
    setupUserHandle = '';
    setupUserName = '';

    constructor(public popup: PopupModalService) { }

    ngOnInit() {
    }

}
