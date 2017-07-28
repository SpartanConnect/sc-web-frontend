import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-admin-toolbar',
    templateUrl: '../html/admin-toolbar.component.html',
    styleUrls: ['../scss/admin-toolbar.component.scss']
})

export class AdminToolbarComponent implements OnInit {

    @Input() page;

    constructor() { }

    ngOnInit() { }

}
