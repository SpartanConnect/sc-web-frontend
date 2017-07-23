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
import { ANNOUNCEMENT_COLUMNS, TAG_COLUMNS, USER_COLUMNS } from '../_models/datatable';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

    announcementColumns: ITdDataTableColumn[] = ANNOUNCEMENT_COLUMNS;
    tagColumns: ITdDataTableColumn[] = TAG_COLUMNS;
    userColumns: ITdDataTableColumn[] = USER_COLUMNS;

    // The arrays used by this component for displaying and caching.
    approvedAnnouncements = [];
    unapprovedAnnouncements = [];
    totalTags = [];
    totalUsers = [];

    selectedData: Array<any> = [];            // All of the rows in an entire table (unfiltered). Can be filtered and selected.
    selectedColumns: Array<any> = ANNOUNCEMENT_COLUMNS;

    fromRow: number = 1;
    currentPage: number = 1;
    pageSize: number = 10;
    searchTerm: string = "";
    filteredData: any[] = this.selectedData;
    filteredTotal: number = this.selectedData.length;
    selectedRows: any[] = [];

    sortBy: string = 'title';
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;

    setTableData(rows, columns = this.selectedColumns) {
        this.selectedRows = [];
        this.selectedData = rows;
        this.selectedColumns = columns;
        this.sortBy = columns[0].name;
        this.currentPage = 1;
        this.fromRow = 1;
        this.filteredData = this.selectedData;
        this.filteredTotal = this.selectedData.length;
        this.filter();
    }

    constructor(
        private dataTableService: TdDataTableService,
        private dialogService: TdDialogService,
        private viewContainerRef: ViewContainerRef,
        private loadingService: TdLoadingService,
        private announcementsService: AnnouncementsService,
        private tagsService: TagsService,
        private usersService: UsersService
    ) { }

    ngOnInit() {
        this.setTableData([], this.announcementColumns);
        this.loadingService.register();
        // Load all of our data from our services.
        Promise.all([
            this.announcementsService.getApprovedAnnouncements(0),
            this.announcementsService.getApprovedAnnouncements(1),
            this.tagsService.getVisibleTags(),
            this.usersService.getUsers()
        ]).then((data) => {
            this.unapprovedAnnouncements = data[0];
            this.approvedAnnouncements = data[1];
            this.totalTags = data[2];
            this.totalUsers = data[3];
            this.setTableData(this.unapprovedAnnouncements, this.announcementColumns);
            this.loadingService.resolve();
        });
    }

    // BEGIN SEARCH/FILTER + DIALOG CODE

    search(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.filter();
    }

    openInfoDialog(clickEvent: ITdDataTableRowClickEvent): void {
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

    openConfirmDialog(): void {
        this.dialogService.openConfirm({
            message: "Are you sure you want to continue with this action? (Heads up: I don't actually know what you want to do.)",
            disableClose: true,
            viewContainerRef: this.viewContainerRef,
            title: 'Confirm Action'
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
