import { Injectable, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { AnnouncementsService } from '../_services/announcements.service';

@Injectable()
export class NotificationsService implements OnInit {

    private _notifications = [];

    get hasNotifications(): boolean {
        return this._notifications.length !== 0;
    }

    get notifications() {
        return this._notifications;
    }

    constructor (
        private authService: AuthService, private announcementsService: AnnouncementsService
    ) { }

    fetchNotifications(): void {
        this._notifications = [];
        Promise.all([
            this.announcementsService.getApprovedAnnouncements(0),
            this.authService.getUser()
        ]).then((d) => {
            if (d[1].rank <= 2 && d[0].length) {    // Has pending announcements!
                this._notifications.push({
                    title: 'Admin Panel: New Pending Announcements',
                    content: 'There are new announcements awaiting approval.',
                    timeCreated: new Date()
                });
            }
        });
    }

    ngOnInit() {
        this.fetchNotifications();
    }
}
