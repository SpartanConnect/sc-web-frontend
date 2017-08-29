import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { AnnouncementsService } from '../_services/announcements.service';
import { NotificationsService } from '../_services/notifications.service';
import { PopupModalService, PopupModalTypes } from '../popup-modal/popup-modal.service';
import { API_BASE } from '../_models/api';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

    brandName = 'Spartan Connect';
    userDropActivated = false;
    notifsDropActivated = false;

    constructor(
        public authService: AuthService, private router: Router,
        public notificationsService: NotificationsService,
        private popup: PopupModalService
    ) {}

    redirectToHome() {
        window.scrollTo(0, 0);
        this.router.navigate(['/home']);
    }

    logout() {
        this.authService.logout().then(() => {
            window.location.href = `${API_BASE}/users/logout`;
        });
    }

    login() {
        // Set marker first before leaving.
        localStorage.setItem('authenticated', '1');
        window.location.href = `${API_BASE}/users/login`;
    }

    handleUserClick() {
        if (this.authService.currentUser.isAuthenticated) {
            // Toggle show header
            if (this.userDropActivated) {
                this.userDropActivated = false;
            } else {
                this.userDropActivated = true;
            }
            this.hideNotifDrop();
        } else {
            this.login();
        }
    }

    handleMenuClick() {
        this.popup.openPopup(PopupModalTypes.MOBILE_MENU);
    }

    handleNotifClick() {
        if (this.notifsDropActivated) {
            this.notifsDropActivated = false;
        } else {
            this.notifsDropActivated = true;
        }
        this.hideUserDrop();
    }

    hideUserDrop() {
        this.userDropActivated = false;
    }

    hideNotifDrop() {
        this.notifsDropActivated = false;
    }

    ngOnInit() {
        this.notificationsService.fetchNotifications();
    }

}
