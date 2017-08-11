import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnnouncementsService } from '../_services/announcements.service';
import { AuthService } from '../_services/auth.service';
import { Announcement } from '../_models/announcement';
import { USER_PANEL_VIEW } from '../_models/userview';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

    public loading = true;
    forbidden: boolean = false;
    justLoggedIn: boolean = false;
    selectedAnnouncements = [];
    selectedView = USER_PANEL_VIEW.VIEW_RECENT_FEED;
    userPanelViews = USER_PANEL_VIEW;

    constructor(private announcementsService: AnnouncementsService, private route: ActivatedRoute, private authService: AuthService) { }

    changeView(view: USER_PANEL_VIEW) {
        this.loading = true;
        this.forbidden = false;                         // Stop showing the forbidden warning when changing views
        this.justLoggedIn = false;
        let promise = null;
        switch (view) {
            case USER_PANEL_VIEW.VIEW_RECENT_FEED:
                promise = this.announcementsService.getAnnouncements(this.authService.currentUser.id);
                break;
            case USER_PANEL_VIEW.VIEW_APPROVED:
                promise = this.announcementsService.getApprovedAnnouncements(1, this.authService.currentUser.id);
                break;
            case USER_PANEL_VIEW.VIEW_PENDING:
                promise = this.announcementsService.getApprovedAnnouncements(0, this.authService.currentUser.id);
                break;
            case USER_PANEL_VIEW.VIEW_DENIED:
                promise = this.announcementsService.getApprovedAnnouncements(2, this.authService.currentUser.id);
                break;
            case USER_PANEL_VIEW.VIEW_ARCHIVED:
                promise = this.announcementsService.getApprovedAnnouncements(3, this.authService.currentUser.id);
                break;
            default:
                promise = this.announcementsService.getAnnouncements(this.authService.getUser().userId);
                alert('Invalid view change attempted. This is most likely a problem with the website\'s code.');
        }

        this.selectedView = view;                       // Update side bar

        promise.then((data) => {
            this.selectedAnnouncements = data;
            this.selectedAnnouncements.sort((a, b) => {
                return (new Date(b.timeSubmitted).getTime() - new Date(a.timeSubmitted).getTime());
            });
            this.loading = false;
        });
    }

    ngOnInit() {
        this.changeView(this.selectedView);
        this.forbidden = (this.route.snapshot.queryParamMap.has('forbidden'));
        this.justLoggedIn = (this.route.snapshot.queryParamMap.has('loggedin'));

        // To fix the issue of people refreshing their browser
        // and getting the login message again
        if (localStorage.getItem('hasloggedin') === 'true') {
            this.justLoggedIn = false;
        } else if (this.justLoggedIn) {
            localStorage.setItem('hasloggedin', 'true');
        }
    }

}
