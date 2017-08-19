import { Component, OnInit, HostBinding } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { AuthService } from './_services/auth.service';
import { API_BASE } from './_models/api';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @HostBinding('class.noscroll') disableScroll = false;

    constructor(
        public snackBar: MdSnackBar, private authService: AuthService
    ) {}

    ngOnInit() {
        this.authService.getUser();
    }
}
