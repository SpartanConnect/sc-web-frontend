import { Component, OnInit, Input } from '@angular/core';
import { AdminPanelPage } from '../ap-datatypes';

@Component({
    selector: 'app-admin-datatable',
    templateUrl: '../html/admin-datatable.component.html',
    styleUrls: ['../scss/admin-datatable.component.scss']
})

export class AdminDatatableComponent implements OnInit {
    @Input() page;
    @Input() data;

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

    constructor() { }

    ngOnInit() { }
}
