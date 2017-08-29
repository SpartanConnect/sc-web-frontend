import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { AnnouncementsService } from '../_services/announcements.service';
import { AuthService } from '../_services/auth.service';
import { Announcement } from '../_models/announcement';

@Component({
    selector: 'app-announcement-view',
    templateUrl: './announcement-view.component.html',
    styleUrls: ['./announcement-view.component.scss']
})
export class AnnouncementViewComponent implements OnInit {

    announcement: Announcement;
    loading: boolean;
    isArchived: boolean;
    isHidden: boolean;

    constructor(private announcementService: AnnouncementsService, private route: ActivatedRoute,
        private router: Router, private authService: AuthService) { }

    ngOnInit() {
        window.scrollTo(0, 0);

        this.loading = true;
        this.isArchived = false;
        this.isHidden = false;
        // tslint:disable-next-line:radix
        this.announcementService.getAnnouncementById(parseInt(this.route.snapshot.paramMap.get('id'))).then((data) => {
            if (!data) {
                // No announcement data returned.
                this.announcement = null;
                this.loading = false;
            } else if (data.status === 1) {
                // If the announcement is generally approved
                this.announcement = data;
                this.loading = false;
            } else if (data.creator.id === this.authService.currentUser.id) {
                // If the announcement belongs to the currently logged in user.
                this.announcement = data;
                this.loading = false;
                this.isHidden = true;
            } else {
                // Can't catch error.
                this.announcement = null;
                this.loading = false;
            }
        });
    }

}
