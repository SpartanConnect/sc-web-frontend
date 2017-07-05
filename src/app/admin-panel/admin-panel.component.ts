import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

    announcementColumns: ITdDataTableColumn[] = [
        {name: 'title', label: "Title"},
        {name: 'description', label: 'Description'},
        {name: 'author', label: 'Author'},
        {name: 'tags', label: 'Tags'}
    ];

    userColumns: ITdDataTableColumn[] = [
        {name: 'name', label: "Name"},
        {name: 'email', label: 'Email'},
        {name: 'lastLogin', label: 'Last Login'},
        {name: 'postCount', label: 'Post Count', numeric: true}
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

    setTableData(rows, columns = this.selectedColumns) {
        this.selectedData = rows;
        this.selectedColumns = columns;
    }

    constructor() { }

    ngOnInit() {
        this.setTableData(this.unapprovedAnnouncements, this.announcementColumns);
    }

}
