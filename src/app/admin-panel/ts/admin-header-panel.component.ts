import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminPanelPage } from '../ap-datatypes';

@Component({
    selector: 'app-admin-header-panel',
    templateUrl: '../html/admin-header-panel.component.html',
    styleUrls: ['../scss/admin-header-panel.component.scss']
})

export class AdminHeaderPanelComponent implements OnInit {

    pages = AdminPanelPage;
    @Output() navigate = new EventEmitter<AdminPanelPage>();

    navigateToPage(page) {
        this.navigate.emit(page);
    }

    goBack() {
        this.navigate.emit(AdminPanelPage.PAGE_OVERVIEW)
    }

    constructor() { }

    ngOnInit() { }
}
