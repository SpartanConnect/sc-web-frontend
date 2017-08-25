import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TdDialogService } from '@covalent/core';
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

    @Output() idChange = new EventEmitter<number[]>();
    @Output() refresh = new EventEmitter<boolean>();

    pages = AdminPanelPage;
    actions = AdminPanelActions;

    announcementReason = '';

    constructor(private announcementsService: AnnouncementsService, private snackbar: MdSnackBar,
                private adminPanelService: AdminPanelService, private dialogService: TdDialogService) { }

    toggleAll() {
        if (this.selectedIds.length === this.data.length) {
            this.selectedIds = [];
        } else {
            this.selectedIds = [];
            this.data.map((d) => {
                this.selectedIds.push(d.id);
            });
        }
        this.idChange.emit(this.selectedIds);
    }

    doAction(action, affectedIds = []) {
        if (!affectedIds.length) {
            affectedIds = this.selectedIds;
        }
        if (affectedIds.length) {
            this.dialogService.openConfirm({
                message: `Are you sure you want to affect ${affectedIds.length} rows?`,
                disableClose: true,
                title: 'Confirm Action?',
                cancelButton: 'NO',
                acceptButton: 'YES'
            }).afterClosed().subscribe((accept) => {
                if (accept) {
                    this.adminPanelService.doAction(action, affectedIds, () => {
                        this.refresh.emit(true);
                    });
                }
            });
        }
    }

    ngOnInit() {
    }

}
