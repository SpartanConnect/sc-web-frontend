import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminPanelPage, AdminPanelActions } from '../ap-datatypes';

@Component({
    selector: 'app-admin-toolbar',
    templateUrl: '../html/admin-toolbar.component.html',
    styleUrls: ['../scss/admin-toolbar.component.scss']
})

export class AdminToolbarComponent implements OnInit {

    @Input() page;
    @Input() data;
    @Input() selectedIds;

    @Output() change = new EventEmitter<number[]>();

    pages = AdminPanelPage;
    actions = AdminPanelActions;

    constructor() { }

    toggleAll() {
        if (this.selectedIds.length === this.data.length) {
            this.selectedIds = [];
        } else {
            this.selectedIds = [];
            this.data.map((d) => {
                this.selectedIds.push(d.id);
            });
        }
        this.change.emit(this.selectedIds);
    }

    ngOnInit() {
    }

}
