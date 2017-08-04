import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redirect-mobile-app',
  templateUrl: './redirect-mobile-app.component.html',
  styleUrls: ['./redirect-mobile-app.component.scss']
})
export class RedirectMobileAppComponent implements OnInit {

    loading = true;
    isDesktop = false;
    iosPlatforms = ['iPhone', 'iPhone Simulator', 'iPod', 'iPad', 'iPod Simulator', 'iPad Simulator'];
    androidPlatforms = ['Android', null, 'Linux armv7l'];
    // tslint:disable-next-line:max-line-length
    androidLink = 'https://play.google.com/store/apps/details?id=com.spartanconnect.SpartanConnect&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1';

    constructor() { }

    ngOnInit() {
        // Redirect on case...
        if (this.iosPlatforms.indexOf(navigator.platform) !== -1) {
            window.location.replace('http://itunes.apple.com/us/app/spartan-connect/id1257927264?mt=8');
        } else if (this.androidPlatforms.indexOf(navigator.platform) !== -1) {
            window.location.replace('market://details?id=com.spartanconnect.SpartanConnect');
            // tslint:disable-next-line:max-line-length
            this.androidLink = 'https://play.google.com/store/apps/details?id=com.spartanconnect.SpartanConnect&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1';
        } else {
            this.isDesktop = true;
        }
    }

}
