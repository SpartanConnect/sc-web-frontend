import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { AnnouncementsService } from '../_services/announcements.service';
import { NotificationsService } from '../_services/notifications.service';
import { API_BASE } from '../_models/api';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

    brandName = 'Spartan Connect';
    userDropActivated = false;

    constructor(
        public authService: AuthService, private router: Router,
        public notificationsService: NotificationsService
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
        } else {
            this.login();
        }
    }

    hideDrop() {
        this.userDropActivated = false;
    }

    ngOnInit() {
        this.notificationsService.fetchNotifications();
    }

}
