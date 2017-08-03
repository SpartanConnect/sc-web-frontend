import { Injectable } from '@angular/core';

export enum PopupModalTypes {
    DEFAULT,
    CREDITS
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
    }

    closePopup() {
        this._isShowing = false;
    }

    constructor() { }
}
