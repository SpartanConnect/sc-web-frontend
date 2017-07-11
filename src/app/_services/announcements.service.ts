import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Announcement } from '../models/announcement';
import { API_BASE } from '../models/api';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AnnouncementsService implements OnInit {

    // Exposed getters for other components to use
    getAnnouncements(): Promise<Announcement[]> {
        let apiLink = `${API_BASE}/announcements`;
        return this.http.get(apiLink)
            .toPromise()
            .then((data) => data.json() as Announcement[])
            .catch((err) => {
                console.log(err);
            });
    }

    getCurrentAnnouncements(): Promise<Announcement[]> {
        let apiLink = `${API_BASE}/announcements/current`;
        return this.http.get(apiLink)
            .toPromise()
            .then((data) => data.json() as Announcement[])
            .catch((err) => {
                console.log(err);
            });
    }

    getApprovedAnnouncements(approved = 1): Promise<Announcement[]> {
        let apiLink = `${API_BASE}/announcements?status={approved}`;
        return this.http.get(apiLink)
            .toPromise()
            .then((data) => data.json() as Announcement[])
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
