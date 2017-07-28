import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';

import { AdminPanelPage } from '../ap-datatypes';

import * as moment from 'moment';

@Component({
    selector: 'app-admin-datatable',
    templateUrl: '../html/admin-datatable.component.html',
    styleUrls: ['../scss/admin-datatable.component.scss']
})

export class AdminDatatableComponent implements OnInit {
    @Input() page;
    @Input() data;
    @Input() selectedIds;
    @Output() change = new EventEmitter<number[]>();

    pages = AdminPanelPage;

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
        this.change.emit(this.selectedIds);
    }

    constructor() { }

    ngOnInit() { }
}
