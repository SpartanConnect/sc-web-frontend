import { Component, OnInit, Input } from '@angular/core';

import { TagsService } from '../_services/tags.service';
import { Announcement } from '../_models/announcement';

@Component({
    selector: 'app-announcement',
    templateUrl: 'html/announcement.component.html',
    styleUrls: ['scss/announcement.component.scss']
})

// default - default expanded view
// compact - when listing a large list announcements, use a compact version
// userpanel - shown in the user panel
// createpreview - a preview of the announcement.

export class AnnouncementComponent implements OnInit {

    @Input() announcement: Announcement | any;
    @Input() strict = true;
    @Input() mode = 'default';          // default | compact | userpanel | adminpanel | createpreview

    placeHolderImage = 'http://via.placeholder.com/40/b71c1c/ffffff';
    recentActionWord = 'POSTED';
    recentActionDate: Date;
    highlightTags = [];

    isEditing = false;
    isHidden = false;

    categories = [];

    editedAnnouncement = {
        title: '',
        description: '',
        category: 0
    }

    constructor(private tagsService: TagsService) { }

    // Gets the latest action and sets it in the announcement footer
    getLatestAction() {
        // Goes down the chain and sets the action until a condition fails
        if (this.announcement.timeSubmitted) {
            this.recentActionWord = 'SUBMITTED';
            this.recentActionDate = this.announcement.timeSubmitted;
        }
        if (this.announcement.timeApproved) {
            // If approved later or at the same time it was edited, use approved
            if (new Date(this.announcement.timeApproved).getTime() >= new Date(this.announcement.timeEdited).getTime()) {
                this.recentActionWord = ((this.mode === 'userpanel' || this.mode === 'adminpanel') ? 'APPROVED' : 'POSTED');
                this.recentActionDate = this.announcement.timeSubmitted;
            } else {
                this.recentActionWord = 'EDITED';
                this.recentActionDate = this.announcement.timeSubmitted;
            }
        } else if (this.announcement.timeEdited) {
            this.recentActionWord = 'EDITED';
            this.recentActionDate = this.announcement.timeEdited;
        }
    }

    clickHandler() {}

    toggleEditing() {
        this.isEditing = !this.isEditing;
        if (this.isEditing) {
            this.editedAnnouncement.title = this.announcement.title;
            this.editedAnnouncement.description = this.announcement.description;
            this.editedAnnouncement.category = this.highlightTags[0].id;
            this.tagsService.getCategories().then((d) => {
                this.categories = d;
            });
        }
    }

    submitForEditing() {
        // send post request
    }

    archiveAnnouncement() {
        this.isHidden = true;
    }

    ngOnInit() {
        this.highlightTags =
            this.announcement.tags.filter(t => (t.slug !== 'urgent') && (t.visibility) && (t.parentId === null));
        this.getLatestAction();
    }
}
