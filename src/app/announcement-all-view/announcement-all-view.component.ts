import { Component, OnInit } from '@angular/core';

import { AnnouncementsService } from '../_services/announcements.service';
import { Announcement } from '../_models/announcement';

@Component({
    selector: 'app-announcement-archive',
    templateUrl: './announcement-all-view.component.html',
    styleUrls: ['./announcement-all-view.component.scss']
})
export class AnnouncementAllViewComponent implements OnInit {

    announcements: Announcement[];
    loading: boolean;

    constructor(private announcementService: AnnouncementsService) { }

    ngOnInit() {
        window.scrollTo(0, 0);

        this.loading = true;

        // tslint:disable-next-line:radix
        this.announcementService.getAnnouncements().then((data) => {
            this.announcements = data.sort((a, b) => {
                return new Date(b.timeSubmitted).getTime() - new Date(a.timeSubmitted).getTime();
            }).filter((a) => a.status === 1).filter((a) => (new Date().getTime() - new Date(a.startDate).getTime()) >= 0);
            this.loading = false;
        });
    }

}
