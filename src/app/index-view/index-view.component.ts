import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { AnnouncementsService } from '../_services/announcements.service';
import { Announcement } from '../models/announcement';

@Component({
  selector: 'app-index-view',
  templateUrl: './index-view.component.html',
  styleUrls: ['./index-view.component.scss']
})
export class IndexViewComponent implements OnInit {

  constructor(public snackBar: MdSnackBar, private announcementsService: AnnouncementsService) { }

  announcements: Announcement[] = [];
  announcementsSliced: Announcement[] = [];
  announcementHighlight: Announcement = null;

  ngOnInit() {
      this.announcementsService.getCurrentAnnouncements().then((data) => {
          this.announcements = data;
          this.announcementsSliced = this.announcements.slice(0, 8);
          this.announcementHighlight = this.announcements[0];
      });
  }

}
