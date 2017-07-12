import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Announcement } from '../models/announcement';
import { API_BASE } from '../models/api';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AnnouncementsService implements OnInit {

    // Exposed getters for other components to use
    getAnnouncements(userId: number = null): Promise<Announcement[]> {
        let apiLink = `${API_BASE}/announcements`;
        if (userId !== null) apiLink += `?creatorId=${userId}`;
        return this.http.get(apiLink)
            .toPromise()
            .then((data) => {
                return data.json() as Announcement[]
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getCurrentAnnouncements(userId: number = null): Promise<Announcement[]> {
        let apiLink = `${API_BASE}/announcements/current`;
        if (userId !== null) apiLink += `?creatorId=${userId}`;
        return this.http.get(apiLink)
            .toPromise()
            .then((data) => {
                return data.json() as Announcement[]
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getApprovedAnnouncements(approved = 1, userId: number = null): Promise<Announcement[]> {
        let apiLink = `${API_BASE}/announcements?status=${approved}`;
        if (userId !== null) apiLink += `&creatorId=${userId}`;
        return this.http.get(apiLink)
            .toPromise()
            .then((data) => {
                if (!data.json()) return [];
                return data.json() as Announcement[]
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /*
    // Refreshing the service itself with new announcements
    // TODO: Remove this and the announcements array.
    retrieveAnnouncements(): Promise<Announcement[]> {
        return new Promise((resolve) => {
            this.announcements = [];                    // Replace with HTTP GET
            setTimeout(() => {resolve(this.announcements)}, 1500);      // Artificial delay
        });
    }*/

    constructor(private http: Http) { }

    ngOnInit() {
        //this.retrieveAnnouncements();
    }

}
