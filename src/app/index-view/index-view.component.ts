import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AnnouncementsService } from '../_services/announcements.service';
import { TagsService } from '../_services/tags.service';
import { AuthService } from '../_services/auth.service';
import { Announcement } from '../_models/announcement';
import { Tag } from '../_models/tag';

@Component({
    selector: 'app-index-view',
    templateUrl: './index-view.component.html',
    styleUrls: ['./index-view.component.scss']
})
export class IndexViewComponent implements OnInit {

    announcements: Announcement[] = [];             // All announcements
    categories: Tag[] = [];                         // All categories
    categoryFilter = 0;                             // The current category selected.
    sortedAnnouncements = {};                       // An assoc object.
    currentUser = this.authService.currentUser;
    loggedOut = false;                              // If the user has recently logged out.
    loading = true;

    constructor(public snackBar: MdSnackBar, private announcementsService: AnnouncementsService,
                private tagsService: TagsService, private authService: AuthService,
                private route: ActivatedRoute) { }

    switchCategoryFilter(id: number) {
        this.categoryFilter = id;
    }

    ngOnInit() {
        this.loading = true;
        this.loggedOut = this.route.snapshot.queryParamMap.has('loggedout');
        const announcementPromise = this.announcementsService.getCurrentAnnouncements().then((data) => {
            this.announcements = data;
        });
        const tagsPromise = this.tagsService.getCategories().then((data) => {
            this.categories = data;
            this.categories.map((category) => {
                this.sortedAnnouncements[category.slug] = [];
            });
        });

        // Sort announcements by category for viewing
        Promise.all([announcementPromise, tagsPromise]).then(() => {
            this.announcements.map((announcement) => {
                announcement.tags.map((tag) => {
                    if (tag.parentId !== null) { return false; };
                    if (!Array.isArray(this.sortedAnnouncements[tag.slug])) { this.sortedAnnouncements[tag.slug] = []; }
                    this.sortedAnnouncements[tag.slug].push(announcement);
                    return true;
                });
            });
            this.loading = false;
        });

        this.currentUser = this.authService.currentUser;
    }

}
