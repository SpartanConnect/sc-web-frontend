const iosPlatforms = ['iPhone', 'iPhone Simulator', 'iPod', 'iPad', 'iPod Simulator', 'iPad Simulator'];
const androidPlatforms = ['Android', null, 'Linux armv7l'];

// tslint:disable:max-line-length
export const androidDesktopUrl = 'https://play.google.com/store/apps/details?id=com.spartanconnect.SpartanConnect&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1';
export const androidMobileUrl = 'market://details?id=com.spartanconnect.SpartanConnect';
export const iosUrl = 'http://itunes.apple.com/us/app/spartan-connect/id1257927264?mt=8';
// tslint:enable:max-line-length

export function getAndroidUrl() {
    if (androidPlatforms.indexOf(navigator.platform) !== -1) {
        return androidMobileUrl;
    } else {
        return androidDesktopUrl;
    }
}

export function getiOSUrl() {
    return iosUrl;
}

export function getPlatformUrl(): string {
    if (iosPlatforms.indexOf(navigator.platform) !== -1) {
        return iosUrl;
    } else if (androidPlatforms.indexOf(navigator.platform) !== -1) {
        window.location.replace('market://details?id=com.spartanconnect.SpartanConnect');
        // tslint:disable-next-line:max-line-length
        this.androidLink = 'https://play.google.com/store/apps/details?id=com.spartanconnect.SpartanConnect&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1';
    } else {
        return '';
    }
}
