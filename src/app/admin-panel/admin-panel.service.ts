import { Injectable, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { NotificationsService } from '../_services/notifications.service';
import { AdminPanelPage, AdminPanelActions } from './ap-datatypes';
import { AnnouncementsService } from '../_services/announcements.service';

@Injectable()
export class AdminPanelService implements OnInit {

    constructor (
        private announcementsService: AnnouncementsService, private snackbar: MdSnackBar,
        private dialogService: TdDialogService, private notificationsService: NotificationsService
    ) {}

    ngOnInit() {
        this.notificationsService.fetchNotifications();
    }

    doAction(action, announcementIds, cb) {
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
                    promise = new Promise((resolve) => {
                        this.dialogService.openPrompt({
                            message:
                                `Are you sure you want to deny this announcement?
                                You may enter in a reason below for your denial.
                                The original poster will be notified of this denial and your reason.`,
                            disableClose: true,
                            title: 'Deny Announcement',
                            cancelButton: 'CANCEL',
                            acceptButton: 'CONTINUE',
                            value: '(no reason provided)'
                        }).afterClosed().subscribe((reason: string) => {
                            if (reason) {
                                this.announcementsService.setAnnouncementStatus(announcementIds[0], 2, reason).then((d) => {
                                    resolve(d);
                                    return d;
                                });
                            } else {
                                resolve({
                                    success: false,
                                    reason: 'Canceled out of deny dialog.'
                                });
                            }
                        });
                    });
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
            case AdminPanelActions.ACTION_ANNOUNCEMENT_REMOVE_URGENT:
                if (announcementIds.length === 0) {
                    promise = Promise.resolve({
                        success: false,
                        reason: 'No announcement selected.'
                    });
                } else {
                    promises = announcementIds.map((id) => {
                        return this.announcementsService.setAnnouncementUrgency(id, false);
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
        this.handleAction(promise, cb);
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

    handleAction(promise, cb) {
        return promise.then((d) => {
            // handle success or not
            this.notificationsService.fetchNotifications();
            if (d.success) {
                this.snackbar.open('Action was successful.', 'DISMISS', {
                    duration: 5000
                });
                cb();
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
}
