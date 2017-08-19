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
        const apiLink = `${API_BASE}/announcements/${id}`;
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
        }).then((data) => {
            return data;
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
                    updatedTags = updatedTags.filter(t => t.slug !== 'urgent');
                    updatedTags.push(data[1].filter(t => t.slug === 'urgent')[0]);
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

    setAnnouncementBasic(announcementId, title, description) {
        const apiLink = `${API_BASE}/announcements/${announcementId}`;
        return postHandler(this.http, apiLink, {
            title: title,
            description: description
        });
    }

    // Warning! this will override the current tags!
    addAnnouncementTag(announcementId, tagId) {
        const apiLink = `${API_BASE}/announcements/${announcementId}`;
        return new Promise((resolve) => {
            this.getAnnouncementById(announcementId).then((a) => {
                const updatedTags: any = a.tags;
                updatedTags.push({id: tagId});
                postHandler(this.http, apiLink, {
                    tags: updatedTags
                }).then((d) => {
                    resolve(d);
                    return d;
                });
            });
        });
    }

    removeAnnouncementTag(announcementId, tagId) {
        const apiLink = `${API_BASE}/announcements/${announcementId}`;
        return new Promise((resolve) => {
            this.getAnnouncementById(announcementId).then((a) => {
                postHandler(this.http, apiLink, {
                    tags: a.tags.filter(t => t.id !== tagId)
                }).then((d) => {
                    resolve(d);
                    return d;
                });
            });
        });
    }

    constructor(
        private http: Http, private tagsService: TagsService
    ) { }

    ngOnInit() {}

}
