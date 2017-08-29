import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminPanelPage } from '../ap-datatypes';

@Component({
    selector: 'app-admin-header-panel',
    templateUrl: '../html/admin-header-panel.component.html',
    styleUrls: ['../scss/admin-header-panel.component.scss']
})

export class AdminHeaderPanelComponent implements OnInit {

    pages = AdminPanelPage;
    @Input() page;
    @Input() data;
    @Output() change = new EventEmitter<AdminPanelPage>();
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

    navigateToPage(page) {
        this.page = page;
        this.change.emit(page);
    }

    goBack() {
        this.change.emit(AdminPanelPage.PAGE_OVERVIEW);
    }

    constructor() { }

    ngOnInit() { }
}
