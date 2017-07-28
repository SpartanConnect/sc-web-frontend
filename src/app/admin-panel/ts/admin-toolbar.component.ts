import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { AdminPanelPage, AdminPanelActions } from '../ap-datatypes';
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

    pages = AdminPanelPage;
    actions = AdminPanelActions;

    announcementReason = '';

    constructor(private announcementsService: AnnouncementsService, private snackbar: MdSnackBar) { }

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
        let promise: any = Promise.resolve({
            success: false,
            reason: 'No correct action specified.'
        });
        let promises = [];
        switch (action) {
            case AdminPanelActions.ACTION_ANNOUNCEMENT_APPROVE:
                if (announcementIds.length === 0) {
                    promise = Promise.resolve({
                        success: false,
                        reason: 'No announcement selected.'
                    });
                } else {
                    promises = announcementIds.map((id) => {
                        return this.announcementsService.setAnnouncementStatus(id, 1);
                    });
                    promise = Promise.all(promises).then(this.promiseAllHandler);
                }
                break;
            case AdminPanelActions.ACTION_ANNOUNCEMENT_DENY:
                if (announcementIds.length >= 2) {
                    promise = Promise.resolve({
                        success: false,
                        reason: 'You cannot deny multiple announcements.'
                    });
                } else if (announcementIds.length === 0) {
                    promise = Promise.resolve({
                        success: false,
                        reason: 'No announcement selected.'
                    });
                } else {
                    // ! Prompt for a reason here...
                    promise = this.announcementsService.setAnnouncementStatus(this.selectedIds[0], 2);
                }
                break;
            case AdminPanelActions.ACTION_ANNOUNCEMENT_SET_URGENT:
                if (announcementIds.length === 0) {
                    promise = Promise.resolve({
                        success: false,
                        reason: 'No announcement selected.'
                    });
                } else {
                    promises = announcementIds.map((id) => {
                        return this.announcementsService.setAnnouncementUrgency(id, true);
                    });
                    promise = Promise.all(promises).then(this.promiseAllHandler);
                }
                break;
            case AdminPanelActions.ACTION_USER_INVITE:
                promise = Promise.resolve({
                    success: false,
                    reason: 'Not implemented.'
                });
                break;
            case AdminPanelActions.ACTION_USER_EDIT:
                promise = Promise.resolve({
                    success: false,
                    reason: 'Not implemented.'
                });
                break;
            default:
                // Incorrect action specified..
                promise = Promise.resolve({
                    success: false,
                    reason: 'No action specified.'
                });
        }
        this.handleAction(promise);
    }

    private promiseAllHandler(r) {
        let success = true;
        const messages = [];
        r.forEach((v, i) => {
            if (!v.success && success) {
                success = false;
                messages.push('The action resulted in an error');
            }
            messages.push('#' + i + ': ' + (v.reason || v.description));
        });
        return {
            success: success,
            reason: messages.join(';\n')
        }
    }

    handleAction(promise) {
        return promise.then((d) => {
            // handle success or not
            if (d.success) {
                this.snackbar.open('Action was successful.', 'DISMISS', {
                    duration: 5000
                });
            } else {
                this.snackbar.open('Error: ' + (d.reason || d.description), 'DISMISS', {
                    duration: 5000
                });
            }
        }).catch((e) => {
            // handle error
            this.snackbar.open('Error: ' + (e.reason || e.description), 'DISMISS', {
                duration: 5000
            });
        });
    }

    ngOnInit() {
    }

}
