import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {    ITdDataTableColumn,
            IPageChangeEvent,
            TdDataTableService,
            TdDataTableSortingOrder,
            ITdDataTableSortChangeEvent,
            TdDialogService,
            ITdDataTableRowClickEvent,
            TdLoadingService
    } from '@covalent/core';

import { AnnouncementsService } from '../_services/announcements.service';
import { TagsService } from '../_services/tags.service';
import { UsersService } from '../_services/users.service';
import { ANNOUNCEMENT_COLUMNS, TAG_COLUMNS, USER_COLUMNS } from '../models/datatable';

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

    selectedData: Array<any> = this.unapprovedAnnouncements;            // All of the rows. Can be filtered and selected.
    selectedColumns: Array<any> = this.announcementColumns;

    fromRow: number = 1;
    currentPage: number = 1;
    pageSize: number = 5;
    searchTerm: string = "";
    filteredData: any[] = this.selectedData;
    filteredTotal: number = this.selectedData.length;
    selectedRows: any[] = [];

    sortBy: string = 'title';
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

    setTableData(rows, columns = this.selectedColumns) {
        this.selectedRows = [];
        this.selectedData = rows;
        this.selectedColumns = columns;
        this.sortBy = columns[0].name;
        this.filteredData = this.selectedData;
        this.filteredTotal = this.selectedData.length;
        this.filter();
    }

    constructor(
        private dataTableService: TdDataTableService,
        private dialogService: TdDialogService,
        private viewContainerRef: ViewContainerRef,
        private loadingService: TdLoadingService
    ) { }

    ngOnInit() {
        this.setTableData([], this.announcementColumns);
        this.loadingService.register();
        setTimeout(() => {
            this.loadingService.resolve();
            this.setTableData(this.unapprovedAnnouncements, this.announcementColumns);
        }, 1500);
    }

    search(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.filter();
    }

    openInfoDialog(clickEvent: ITdDataTableRowClickEvent): void {
        console.log(clickEvent);
        let message = "Viewing Information\n";
        if (clickEvent.row.name) {          // User object
            message += "Name: "+clickEvent.row.name+"\n";
            message += "Email: "+clickEvent.row.email+"\n";
            message += "Last Logged In: "+clickEvent.row.lastLogin+"\n";
            message += "Post Count: "+clickEvent.row.postCount;
        } else {
            message += "Name: "+clickEvent.row.title+"\n";
            message += "Author: "+clickEvent.row.author+"\n";
            message += "Description: "+clickEvent.row.description+"\n";
            message += "Tags: "+clickEvent.row.tags+"\n";
        }
        this.dialogService.openAlert({
          message: message,
          disableClose: true,
          viewContainerRef: this.viewContainerRef,
          title: 'Information',
          closeButton: 'Close',
        });
    }

    openApproveDialog(): void {
        this.dialogService.openConfirm({
            message: "Are you sure you want to approve these announcements?",
            disableClose: true,
            viewContainerRef: this.viewContainerRef,
            title: 'Confirm Approval'
        });
    }

    openSetUrgentDialog(): void {
        this.dialogService.openConfirm({
            message: "Are you sure you want to set these announcements to urgent?",
            disableClose: true,
            viewContainerRef: this.viewContainerRef,
            title: 'Confirm Urgency'
        });
    }

    openDenyDialog(): void {
        this.dialogService.openConfirm({
            message: "Are you sure you want to deny these announcements?",
            disableClose: true,
            viewContainerRef: this.viewContainerRef,
            title: 'Confirm Denial'
        });
    }

    sort(sortEvent: ITdDataTableSortChangeEvent): void {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter();
    }

    page(pagingEvent: IPageChangeEvent): void {
        this.fromRow = pagingEvent.fromRow;
        this.currentPage = pagingEvent.page;
        this.pageSize = pagingEvent.pageSize;
        this.filter();
    }

    // Filtering code from Teradata: Thank you!
    // TODO: configure code to our needs
    filter(): void {
        let newData: any[] = this.selectedData;
        let excludedColumns: string[] = this.selectedColumns
        .filter((column: ITdDataTableColumn) => {
          return ((column.filter === undefined && column.hidden === true) ||
                  (column.filter !== undefined && column.filter === false));
        }).map((column: ITdDataTableColumn) => {
          return column.name;
        });
        newData = this.dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
        this.filteredTotal = newData.length;
        newData = this.dataTableService.sortData(newData, this.sortBy, this.sortOrder);
        newData = this.dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
        this.filteredData = newData;
    }

}
