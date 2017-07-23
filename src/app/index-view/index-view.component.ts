import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { AnnouncementsService } from '../_services/announcements.service';
import { TagsService } from '../_services/tags.service';
import { Announcement } from '../_models/announcement';
import { Tag } from '../_models/tag';

@Component({
    selector: 'app-index-view',
    templateUrl: './index-view.component.html',
    styleUrls: ['./index-view.component.scss']
})
export class IndexViewComponent implements OnInit {

    announcements: Announcement[] = [];             // All announcements
    announcementsSliced: Announcement[] = [];       // The header's first eight announcements
    announcementHighlight: Announcement = null;     // The first announcement
    categories: Tag[] = [];                         // All categories
    categoryFilter = 0;                             // The current category selected.
    sortedAnnouncements = {};                       // An assoc object.

    constructor(public snackBar: MdSnackBar, private announcementsService: AnnouncementsService, private tagsService: TagsService) { }

    switchCategoryFilter(id: number) {
        this.categoryFilter = id;
    }

    ngOnInit() {
        const announcementPromise = this.announcementsService.getCurrentAnnouncements().then((data) => {
            this.announcements = data;
            this.announcementsSliced = this.announcements.slice(0, 8);
            this.announcementHighlight = this.announcements[0];
        });
        const tagsPromise = this.tagsService.getCategories().then((data) => {
            this.categories = data;
            this.categories.map((category) => {
                this.sortedAnnouncements[category.slug] = [];
            });
        });

        Promise.all([announcementPromise, tagsPromise]).then(() => {
            this.announcements.map((announcement) => {
                announcement.tags.map((tag) => {
                    if (tag.parentId !== null) { return false; };
                    if (!Array.isArray(this.sortedAnnouncements[tag.slug])) { this.sortedAnnouncements[tag.slug] = []; }
                    this.sortedAnnouncements[tag.slug].push(announcement);
                    return true;
                });
            });
        });
    }

}
