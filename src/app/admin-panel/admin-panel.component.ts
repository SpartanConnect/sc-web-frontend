import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

    announcementColumns = [
        {prop: 'title', width: 180},
        {name: 'Description', width: 330},
        {name: 'Author', width: 150},
        {name: 'Tags', width: 300}
    ];

    userColumns = [
        {prop: 'name', width: 250},
        {name: 'Email', width: 300},
        {name: 'Last Login', width: 260},
        {name: 'Post Count', width: 150}
    ];

    selectedData: Array<any>;
    selectedColumns: Array<any>;

    approvedAnnouncements = [
        { title: 'Korean Honor Society', description: 'Some Description of Korean Honor Society Here', author: 'Hedoku Taichi', tags: 'Grade 1, Grade 2, Grade Nonexistent' },
        { title: 'Korean Honor Society', description: 'Some Description of Korean Honor Society Here', author: 'Hedoku Taichi', tags: 'Grade 1, Grade 2, Grade Nonexistent' },
        { title: 'Korean Honor Society', description: 'Some Description of Korean Honor Society Here', author: 'Hedoku Taichi', tags: 'Grade 1, Grade 2, Grade Nonexistent' }
    ];

    unapprovedAnnouncements = [
        { title: 'Korean Honor Society', description: 'Some Description of Korean Honor Society Here', author: 'Hedoku Taichi', tags: 'Grade 1, Grade 2, Grade Nonexistent' },
        { title: 'Korean Honor Society', description: 'Some Description of Korean Honor Society Here', author: 'Hedoku Taichi', tags: 'Grade 1, Grade 2, Grade Nonexistent' },
        { title: 'Korean Honor Society', description: 'Some Description of Korean Honor Society Here', author: 'Hedoku Taichi', tags: 'Grade 1, Grade 2, Grade Nonexistent' },
        { title: 'Korean Honor Society', description: 'Some Description of Korean Honor Society Here', author: 'Hedoku Taichi', tags: 'Grade 1, Grade 2, Grade Nonexistent' },
        { title: 'Korean Honor Society', description: 'Some Description of Korean Honor Society Here', author: 'Hedoku Taichi', tags: 'Grade 1, Grade 2, Grade Nonexistent' }
    ];

    totalUsers = [
        { name: 'Yankie Dory', email: 'ydory@notlcusd.net', lastLogin: '1 day ago', postCount: 1240 },
        { name: 'Hedoku Taichi', email: 'htaichi@notlcusd.net', lastLogin: '5 hours ago', postCount: 1240 },
        { name: 'Horizon Berlot', email: 'hberlot@notlcusd.net', lastLogin: '3 years ago', postCount: 1240 },
        { name: 'Cardigal Nartovich', email: 'cnartovich@notlcusd.net', lastLogin: '2 months ago', postCount: 1240 },
        { name: 'Zhang Caoli', email: 'zcaoli@notlcusd.net', lastLogin: '41 decades ago', postCount: 1240 }
    ];

    setTableData(rows, columns = this.announcementColumns) {
        this.selectedData = rows;
        this.selectedColumns = columns;
    }

    constructor() { }

    ngOnInit() {
        this.selectedData = this.unapprovedAnnouncements;
        this.selectedColumns = this.announcementColumns;
    }

}
