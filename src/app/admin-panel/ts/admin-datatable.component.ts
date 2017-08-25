import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';

import { AdminPanelService } from '../admin-panel.service';
import { AdminPanelPage, AdminPanelActions } from '../ap-datatypes';

import * as moment from 'moment';

@Component({
    selector: 'app-admin-datatable',
    templateUrl: '../html/admin-datatable.component.html',
    styleUrls: ['../scss/admin-datatable.component.scss']
})

export class AdminDatatableComponent implements OnInit {
    @Input() page;
    @Input() data;
    @Input() selectedIds = [];
    @Output() idChange = new EventEmitter<number[]>();
    @Output() refresh = new EventEmitter<boolean>();

    pages = AdminPanelPage;
    actions = AdminPanelActions;

    selectedData = null;

    announcementPages = [
        AdminPanelPage.PAGE_ANNOUNCEMENTS_CURRENT,
        AdminPanelPage.PAGE_ANNOUNCEMENTS_PENDING,
        AdminPanelPage.PAGE_ANNOUNCEMENTS_TOTAL
    ];
    tagPages = [
        AdminPanelPage.PAGE_TAGS_ALL,
        AdminPanelPage.PAGE_TAGS_CATEGORIES,
    ];
    userPages = [
        AdminPanelPage.PAGE_USERS_ALL,
        AdminPanelPage.PAGE_USERS_TEACHERS,
        AdminPanelPage.PAGE_USERS_UNAPPROVED
    ];

    // Announcements
    openedAnnouncements = [];

    // Tags
    tagColumns = [
        { name: 'id', label: 'ID', numeric: true },
        { name: 'name', label: 'Name' },
        { name: 'slug', label: 'Slug', format: f => '#' + f },
        { name: 'color', label: 'Color', format: c => '#' + c },
        { name: 'visibility', label: 'Visible', format: b => (b ? 'Y' : 'N') }
    ];

    // Users
    userColumns = [
        { name: 'id', label: 'ID', numeric: true },
        { name: 'name', label: 'Name' },
        { name: 'handle', label: 'Handle', format: f => '@' + f },
        { name: 'email', label: 'Email' },
        { name: 'rank', label: 'Rank', numeric: true },
        { name: 'lastLogin', label: 'Last Login', format: d => moment(d).format('MM/DD/YY h:mmA') }
    ];

    // toggles opening the announcement
    openAnnouncement(announcementId) {
        if (this.openedAnnouncements.indexOf(announcementId) !== -1) {
            this.openedAnnouncements.splice(this.openedAnnouncements.indexOf(announcementId), 1);
        } else {
            this.openedAnnouncements.push(announcementId);
        }
    }

    selectElement(id) {
        if (this.selectedIds.indexOf(id) !== -1) {
            this.selectedIds.splice(this.selectedIds.indexOf(id), 1);
        } else {
            this.selectedIds.push(id);
        }
        this.idChange.emit(this.selectedIds);
    }

    doAction(action, announcementId) {
        this.adminPanelService.doAction(action, [announcementId], () => {
            this.refresh.emit(true);
        })
    }

    returnStringStatus(status) {
        switch (status) {
            case 0:
                return 'PENDING APPROVAL';
            case 1:
                return 'APPROVED';
            case 2:
                return 'DENIED';
            case 3:
                return 'REMOVED BY USER';
            default:
                return 'NOT FOUND';
        }
    }

    returnAnnouncementRating(announcement) {
        if (moment(announcement.endDate).diff(moment(announcement.startDate), 'days') >= 14) {
            return {
                code: 'red',
                icon: 'error_outline',
                status: 'Review Dates Carefully'
            }
        } else if (moment(announcement.startDate).isBefore(moment().add(1, 'days'), 'day')) {
            return {
                code: 'yellow',
                icon: 'warning',
                status: 'Review Start Date'
            }
        } else {
            return {
                code: 'green',
                icon: 'check',
                status: 'Good'
            }
        }

    }

    constructor(private adminPanelService: AdminPanelService) { }

    ngOnInit() {}
}
