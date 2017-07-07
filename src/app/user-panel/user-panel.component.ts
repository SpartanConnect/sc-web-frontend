import { Component, OnInit } from '@angular/core';

import { AnnouncementsService } from '../_services/announcements.service';
import { USER_PANEL_VIEW } from '../models/userview';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

    public loading = true;
    selectedAnnouncements = [];
    selectedView = USER_PANEL_VIEW.VIEW_RECENT_FEED;
    userPanelViews = USER_PANEL_VIEW;

    constructor(private announcementsService: AnnouncementsService) { }

    changeView(view: USER_PANEL_VIEW) {
        this.loading = true;
        let promise = null;
        switch (view) {
            case USER_PANEL_VIEW.VIEW_RECENT_FEED:
                promise = this.announcementsService.getAnnouncements();
                break;
            case USER_PANEL_VIEW.VIEW_APPROVED:
                promise = this.announcementsService.getApprovedAnnouncements(1);
                break;
            case USER_PANEL_VIEW.VIEW_PENDING:
                promise = this.announcementsService.getApprovedAnnouncements(0);
                break;
            case USER_PANEL_VIEW.VIEW_DENIED:
                promise = this.announcementsService.getApprovedAnnouncements(2);
                break;
            case USER_PANEL_VIEW.VIEW_ARCHIVED:
                promise = this.announcementsService.getApprovedAnnouncements(3);
                break;
            default:
                promise = this.announcementsService.getAnnouncements();
                alert("Invalid view change attempted. This is most likely a problem with the website's code.");
        }

        this.selectedView = view;

        promise.then((data) => {
            this.selectedAnnouncements = data;
            this.loading = false;
        });
    }

    ngOnInit() {
        this.changeView(this.selectedView);
    }

}
