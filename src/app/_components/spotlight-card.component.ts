import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-spotlight-card',
    templateUrl: 'html/spotlight-card.component.html',
    styleUrls: ['scss/spotlight-card.component.scss']
})

export class SpotlightCardComponent implements OnInit {

    @Input() mode = 'default';
    @Input() width = 600;

    constructor() { }
    ngOnInit() { }

}
