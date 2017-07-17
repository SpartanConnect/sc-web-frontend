import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { AnnouncementsService } from '../_services/announcements.service';
import { Announcement } from '../models/announcement';

@Component({
  selector: 'app-announcement-view',
  templateUrl: './announcement-view.component.html',
  styleUrls: ['./announcement-view.component.scss']
})
export class AnnouncementViewComponent implements OnInit {

  announcement: Announcement;
  loading: boolean;
  isArchived: boolean;

  constructor(private announcementService: AnnouncementsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
      window.scrollTo(0, 0);

      this.loading = true;
      // tslint:disable-next-line:radix
      this.announcementService.getAnnouncementById(parseInt(this.route.snapshot.paramMap.get('id'))).then((data) => {
          this.announcement = data;
          this.loading = false;
      })
  }

}
