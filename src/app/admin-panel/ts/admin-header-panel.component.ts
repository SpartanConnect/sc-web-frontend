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
    @Output() change = new EventEmitter<AdminPanelPage>();

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
