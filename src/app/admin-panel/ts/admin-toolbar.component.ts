import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { AdminPanelPage, AdminPanelActions } from '../ap-datatypes';
import { AdminPanelService } from '../admin-panel.service';
import { AnnouncementsService } from '../../_services/announcements.service';

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
    @Output() refresh = new EventEmitter<boolean>();

    pages = AdminPanelPage;
    actions = AdminPanelActions;

    announcementReason = '';

    constructor(private announcementsService: AnnouncementsService, private snackbar: MdSnackBar,
                private adminPanelService: AdminPanelService) { }

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

    doAction(action, announcementIds = []) {
        if (!announcementIds.length) {
            announcementIds = this.selectedIds;
        }
        this.adminPanelService.doAction(action, announcementIds, () => {
            this.refresh.emit(true);
        })
    }

    ngOnInit() {
    }

}
