import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';

export enum PopupModalTypes {
    DEFAULT,
    CREDITS,
    FIRST_SETUP,
    MOBILE_MENU
}

@Injectable()
export class PopupModalService {

    private _isShowing = false;
    private _type = PopupModalTypes.DEFAULT;

    get activated() {
        return this._isShowing;
    }

    get type() {
        return this._type;
    }

    openPopup(type: PopupModalTypes) {
        this._type = type;
        this._isShowing = true;
        this.body.disableScroll = true;
    }

    closePopup() {
        this._isShowing = false;
        this.body.disableScroll = false;
    }

    constructor(private body: AppComponent) { }
}
