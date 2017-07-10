import { Injectable, OnInit } from '@angular/core';

import { Announcement, MOCK_ANNOUNCEMENTS } from '../models/announcement';

@Injectable()
export class AnnouncementsService implements OnInit {

    announcements: Announcement[];

    // Exposed getters for other components to use
    getAnnouncements(): Promise<Announcement[]> {
        return new Promise((resolve) => {
            this.retrieveAnnouncements().then(() => {
                resolve(this.announcements);
            });
        });
    }

    getCurrentAnnouncements(): Promise<Announcement[]> {
        return new Promise((resolve) => {
            this.retrieveAnnouncements().then(() => {
                let today = new Date();
                resolve(this.announcements.filter((announcement) => {
                    return (announcement.startDate < today && announcement.endDate > today);
                }));
            });
        });
    }

    getApprovedAnnouncements(approved = 1): Promise<Announcement[]> {
        return new Promise((resolve) => {
            this.retrieveAnnouncements().then(() => {
                resolve(this.announcements.filter((announcement) => {
                    return announcement.approved === approved;
                }));
            });
        });
    }

    // Refreshing the service itself with new announcements
    // TODO: Remove this and the announcements array.
    retrieveAnnouncements(): Promise<Announcement[]> {
        return new Promise((resolve) => {
            this.announcements = MOCK_ANNOUNCEMENTS;                    // Replace with HTTP GET
            setTimeout(() => {resolve(this.announcements)}, 1500);      // Artificial delay
        });
    }

    constructor() { }

    ngOnInit() {
        this.retrieveAnnouncements();
    }

}
