import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { TagsService } from './tags.service';
import { Announcement } from '../_models/announcement';
import { API_BASE, postHandler } from '../_models/api';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AnnouncementsService implements OnInit {

    // Exposed getters for other components to use
    getAnnouncements(userId: number = null): Promise<Announcement[]> {
        let apiLink = `${API_BASE}/announcements`;
        if (userId !== null) { apiLink += `?creatorId=${userId}`; }
        return this.http.get(apiLink)
            .toPromise()
            .then((data) => {
                return data.json() as Announcement[];
            })
            .catch((err) => {
                console.log(err);
                return [];
            });
    }

    getAnnouncementById(id: number): Promise<Announcement> {
        let apiLink = `${API_BASE}/announcements/${id}`;
        return this.http.get(apiLink)
            .toPromise()
            .then((data) => {
                return data.json()[0] as Announcement;
            })
            .catch((err) => {
                console.log(err);
                return null;
            });
    }

    getCurrentAnnouncements(userId: number = null): Promise<Announcement[]> {
        let apiLink = `${API_BASE}/announcements/current`;
        if (userId !== null) { apiLink += `?creatorId=${userId}`; }
        return this.http.get(apiLink)
            .toPromise()
            .then((data) => {
                return data.json() as Announcement[];
            })
            .catch((err) => {
                console.log(err);
                return [];
            });
    }

    getApprovedAnnouncements(approved = 1, userId: number = null): Promise<Announcement[]> {
        let apiLink = `${API_BASE}/announcements?status=${approved}`;
        if (userId !== null) { apiLink += `&creatorId=${userId}`; }
        return this.http.get(apiLink)
            .toPromise()
            .then((data) => {
                if (!data.json()) { return [] };
                return data.json() as Announcement[];
            })
            .catch((err) => {
                console.log(err);
                return [];
            });
    }

    setAnnouncementStatus(announcementId, status = 1, reason = null) {
        const apiLink = `${API_BASE}/announcements/${announcementId}`;
        return postHandler(this.http, apiLink, {
            status: status,
            reason: reason
        });
    }

    setAnnouncementUrgency(announcementId, isUrgent = true) {
        const apiLink = `${API_BASE}/announcements/${announcementId}`;
        return new Promise ((resolve) => {
            Promise.all([
                this.getAnnouncementById(parseInt(announcementId, undefined)),
                this.tagsService.getTags()
            ]).then((data) => {
                let updatedTags = data[0].tags;
                if (isUrgent) {
                    updatedTags.filter(t => t.slug !== 'urgent').push(data[1].filter(t => t.slug === 'urgent')[0]);
                } else {
                    updatedTags = updatedTags.filter(t => t.slug !== 'urgent');
                }
                postHandler(this.http, apiLink, {
                    tags: updatedTags
                }).then((d) => {
                    resolve(d);
                    return d;
                });
            });
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

    constructor(private http: Http, private tagsService: TagsService) { }

    ngOnInit() {
        // this.retrieveAnnouncements();
    }

}
