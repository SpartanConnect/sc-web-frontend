import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminPanelPage } from '../ap-datatypes';

@Component({
    selector: 'app-admin-overview-panel',
    templateUrl: '../html/admin-overview-panel.component.html',
    styleUrls: ['../scss/admin-overview-panel.component.scss']
})

export class AdminOverviewPanelComponent implements OnInit {
    pages = AdminPanelPage;

    @Input() adminData = {
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

    @Output() navigate = new EventEmitter<AdminPanelPage>();

    navigateToPage(page) {
        this.navigate.emit(page);
    }

    constructor() { }

    ngOnInit() { }
}
