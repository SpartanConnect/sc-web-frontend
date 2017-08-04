import { Component, OnInit } from '@angular/core';
import { getPlatformUrl, getAndroidUrl, getiOSUrl } from '../_models/mobile';

@Component({
  selector: 'app-redirect-mobile-app',
  templateUrl: './redirect-mobile-app.component.html',
  styleUrls: ['./redirect-mobile-app.component.scss']
})
export class RedirectMobileAppComponent implements OnInit {

    loading = true;
    isDesktop = false;
    // tslint:disable-next-line:max-line-length

    constructor() { }

    getAndroidUrl() {
        return getAndroidUrl();
    }

    getiOSUrl() {
        return getiOSUrl();
    }

    ngOnInit() {
        // Redirect on case...
        if (getPlatformUrl() !== '') {
            window.location.replace(getPlatformUrl());
        } else {
            this.isDesktop = true;
        }
    }

}
