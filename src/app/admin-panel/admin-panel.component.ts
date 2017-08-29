import { Component, OnInit } from '@angular/core';

import { AnnouncementsService } from '../_services/announcements.service';
import { NotificationsService } from '../_services/notifications.service';
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
            all: [],
            unapproved: [],
            teachers: []
        },
        tags: {
            all: [],
            categories: []
        },
        announcements: {
            all: [],
            unapproved: [],
            current: []
        }
    };
    datatableData = [];
    selectedIds = [];

    constructor(
        private authService: AuthService, private announcementsService: AnnouncementsService,
        private tagsService: TagsService, private usersService: UsersService,
        private notificationsService: NotificationsService
    ) { }

    ngOnInit() {
        this.notificationsService.fetchNotifications();
        Promise.all([
            this.announcementsService.getAnnouncements(),
            this.announcementsService.getCurrentAnnouncements(),
            this.tagsService.getTags(),
            this.tagsService.getCategories(),
            this.usersService.getUsers()
        ]).then((data) => {
            this.collectedData.announcements.all = data[0];
            this.collectedData.announcements.current = data[1];
            this.collectedData.tags.all = data[2];
            this.collectedData.tags.categories = data[3];
            this.collectedData.users.all = data[4];
            this.collectedData.users.teachers = data[4].filter((u) => {
                return u.rank === 3;
            });
            this.collectedData.users.unapproved = data[4].filter((u) => {
                return u.rank === 4 || u.rank === 99;
            });
            this.collectedData.announcements.unapproved = data[0].filter((a) => {
                return a.status === 0;
            });
            this.loading = false;
        });
    }

    selectionChange(selection) {
        this.selectedIds = selection;
    }

    successfulChange(success) {
        this.navigateChange(this.currentPage);
    }

    navigateChange(page) {
        let promise;
        this.loading = true;
        this.selectedIds = [];
        switch (page) {
            case AdminPanelPage.PAGE_ANNOUNCEMENTS_CURRENT:
                promise = this.announcementsService.getCurrentAnnouncements().then((data) => {
                    this.collectedData.announcements.current = data.sort((a, b) => {
                        return (new Date(b.timeEdited).getTime() - new Date(a.timeEdited).getTime());
                    });
                    return this.collectedData.announcements.current;
                });
                break;
            case AdminPanelPage.PAGE_ANNOUNCEMENTS_PENDING:
                promise = this.announcementsService.getAnnouncements().then((data) => {
                    this.collectedData.announcements.all = data.sort((a, b) => {
                        return (new Date(b.timeEdited).getTime() - new Date(a.timeEdited).getTime());
                    });

                    this.collectedData.announcements.unapproved = data.filter((a) => {
                        return a.status === 0;
                    }).sort((a, b) => {
                        return (new Date(b.timeEdited).getTime() - new Date(a.timeEdited).getTime());
                    });

                    return this.collectedData.announcements.unapproved;
                });
                break;
            case AdminPanelPage.PAGE_ANNOUNCEMENTS_TOTAL:
                promise = this.announcementsService.getAnnouncements().then((data) => {
                    this.collectedData.announcements.all = data.sort((a, b) => {
                        return (new Date(b.timeEdited).getTime() - new Date(a.timeEdited).getTime());
                    });

                    this.collectedData.announcements.unapproved = data.filter((a) => {
                        return a.status === 0;
                    }).sort((a, b) => {
                        return (new Date(b.timeEdited).getTime() - new Date(a.timeEdited).getTime());
                    });

                    return this.collectedData.announcements.all;
                });
                break;
            case AdminPanelPage.PAGE_TAGS_ALL:
                promise = this.tagsService.getTags().then((data) => {
                    this.collectedData.tags.all = data;
                    return data;
                });
                break;
            case AdminPanelPage.PAGE_TAGS_CATEGORIES:
                promise = this.tagsService.getCategories().then((data) => {
                    this.collectedData.tags.categories = data;
                    return data;
                });
                break;
            case AdminPanelPage.PAGE_USERS_ALL:
                promise = this.usersService.getUsers().then((data) => {
                    this.collectedData.users.all = data;
                    this.collectedData.users.teachers = data.filter((u) => {
                        return u.rank === 3;
                    });
                    this.collectedData.users.unapproved = data.filter((u) => {
                        return u.rank === 4;
                    });
                    return data;
                });
                break;
            case AdminPanelPage.PAGE_USERS_TEACHERS:
                promise = this.usersService.getUsers().then((data) => {
                    this.collectedData.users.all = data;
                    this.collectedData.users.teachers = data.filter((u) => {
                        return u.rank === 3;
                    });
                    this.collectedData.users.unapproved = data.filter((u) => {
                        return u.rank === 4;
                    });
                    return data.filter((u) => {
                        return u.rank === 3;
                    });
                });
                break;
            case AdminPanelPage.PAGE_USERS_UNAPPROVED:
                promise = this.usersService.getUsers().then((data) => {
                    this.collectedData.users.all = data;
                    this.collectedData.users.teachers = data.filter((u) => {
                        return u.rank === 3;
                    });
                    this.collectedData.users.unapproved = data.filter((u) => {
                        return u.rank === 4;
                    });
                    return data.filter((u) => {
                        return u.rank === 4;
                    });
                });
                break;
            default:
                promise = new Promise((resolve) => {
                    resolve([]);
                });
        }
        promise.then((data) => {
            this.currentPage = page;
            this.datatableData = data;
            window.scrollTo(0, 0);
            this.loading = false;
        });
    }

}
