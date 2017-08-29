import { Component, OnInit } from '@angular/core';
import { PopupModalService, PopupModalTypes } from './popup-modal.service';
import { NotificationsService } from '../_services/notifications.service';
import { AuthService } from '../_services/auth.service';
import { API_BASE } from '../_models/api';

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

    login() {
        localStorage.setItem('authenticated', '1');
        window.location.href = `${API_BASE}/users/login`;
    }

    logout() {
        this.authService.logout().then(() => {
            window.location.href = `${API_BASE}/users/logout`;
        });
    }

    closePopup() {
        this.popup.closePopup();
    }

    constructor(
        public popup: PopupModalService, public authService: AuthService,
        public notificationsService: NotificationsService
    ) { }

    ngOnInit() {
    }

}
