import { Component, OnInit } from '@angular/core';
import { PopupModalService, PopupModalTypes } from '../popup-modal/popup-modal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    constructor(private popup: PopupModalService) { }

    openCredits() {
        this.popup.openPopup(PopupModalTypes.CREDITS);
    }

    openSetup() {
        this.popup.openPopup(PopupModalTypes.FIRST_SETUP);
    }

    ngOnInit() {
    }

}
