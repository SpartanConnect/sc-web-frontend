import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { TdLoadingService, LoadingType, LoadingMode } from '@covalent/core';

import { Announcement } from '../_models/announcement';
import { API_BASE, httpHandler } from '../_models/api';

@Injectable()
export class AuthService implements OnInit {
    public forbiddenUser = {
        success: false,
        isAuthenticated: false,
        rank: 99,
        id: 0
    };
    public currentUser = this.forbiddenUser;

    constructor(private http: Http, private loadingService: TdLoadingService) {
        this.loadingService.create({
            name: 'serviceAuthLoading',
            type: LoadingType.Linear,
            mode: LoadingMode.Indeterminate,
            color: 'primary'
        });
    }

    initUser(): void {
        localStorage.setItem('authenticated', '1');
        this.getUser();
        // localStorage.setItem('userId', '2');
        // localStorage.setItem('userEmail', userEmail);
        // localStorage.setItem('userName', userName);
        // localStorage.setItem('userRank', userRank);
        // localStorage.setItem('userHandle', userHandle);
    }

    getUser() {
        const apiLink = `${API_BASE}/users/me`;
        this.loadingService.register('serviceAuthLoading');
        if (localStorage.getItem('authenticated') !== '1') {
            localStorage.setItem('authenticated', '0');
            return new Promise((resolve) => {
                this.currentUser = this.forbiddenUser;
                this.loadingService.resolve('appAuthLoading');
                resolve(this.currentUser);
            });
        } else {
            return httpHandler(this.http, apiLink).then((user) => {
                this.currentUser = user;
                if (!user.isAuthenticated) { localStorage.setItem('authenticated', '0'); }
                this.loadingService.resolve('serviceAuthLoading');
                return user;
            });
        }


        /*return {
            authenticated: localStorage.getItem('authenticated') === '1',
            userId: parseInt(localStorage.getItem('userId')),
            userEmail: localStorage.getItem('userEmail'),
            userName: localStorage.getItem('userName'),
            userRank: parseInt(localStorage.getItem('userRank')),
            userHandle: localStorage.getItem('userHandle')
        };*/
    }

    logout(): Promise<boolean> {
        return new Promise((resolve) => {
            localStorage.setItem('authenticated', '0');
            resolve(true);
        });
    }

    isAuthenticated(): Promise<boolean> {
        return new Promise((resolve) => {
            this.getUser().then((user) => {
                resolve(user.isAuthenticated);
            });
        });
    }

    isAdministrator(): Promise<boolean> {
        return new Promise((resolve) => {
            this.getUser().then((user) => {
                resolve(user.rank <= 2);
            });
        });
    }

    ngOnInit() {
        // Set up local storage for first users.
        if (localStorage.getItem('authenticated') !== '1') {
            localStorage.setItem('authenticated', '0');
        }
    }
}
