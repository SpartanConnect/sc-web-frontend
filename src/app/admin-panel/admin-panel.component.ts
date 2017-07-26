import { Component, OnInit } from '@angular/core';

import { AnnouncementsService } from '../_services/announcements.service';
import { TagsService } from '../_services/tags.service';
import { UsersService } from '../_services/users.service';
import { AuthService } from '../_services/auth.service';
import { AdminPanelPage } from './ap-datatypes';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

    loading = true;
    currentPage = AdminPanelPage.PAGE_OVERVIEW;
    pages = AdminPanelPage;

    collectedData = {
        users: {
            all: []
        },
        tags: {
            all: []
        },
        announcements: {
            all: [],
            pending: [],
            current: []
        }
    };

    constructor(
        private authService: AuthService, private announcementsService: AnnouncementsService,
        private tagsService: TagsService, private usersService: UsersService
    ) { }

    ngOnInit() {
        Promise.all([
            this.announcementsService.getAnnouncements(),
            this.announcementsService.getCurrentAnnouncements(),
            this.tagsService.getTags(),
            this.usersService.getUsers()
        ]).then((data) => {
            this.collectedData.announcements.all = data[0];
            this.collectedData.announcements.current = data[1];
            this.collectedData.tags.all = data[2];
            this.collectedData.users.all = data[3];

            this.collectedData.announcements.pending = data[0].filter((a) => {
                return a.status === 0;
            });
            this.loading = false;
        });
    }

    navigateChange(page) {
        this.currentPage = page;
    }

}
