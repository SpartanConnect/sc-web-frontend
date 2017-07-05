import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn, IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent } from '@covalent/core';

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

    selectedData: Array<any> = this.unapprovedAnnouncements;
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
        this.selectedData = rows;
        this.selectedColumns = columns;
        this.sortBy = columns[0].name;
        this.filteredData = this.selectedData;
        this.filteredTotal = this.selectedData.length;
        this.filter();
    }

    constructor(private dataTableService: TdDataTableService) { }

    ngOnInit() {
        this.setTableData(this.unapprovedAnnouncements, this.announcementColumns);
    }

    search(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.filter();
    }

    openInfoDialog($event): void {
        console.log($event);
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
