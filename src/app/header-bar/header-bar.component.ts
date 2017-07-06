import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

    @Input() authUser;

    constructor() { }

    ngOnInit() {
    }

}
