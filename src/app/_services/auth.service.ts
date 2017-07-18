import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Announcement } from '../models/announcement';
import { API_BASE, httpHandler } from '../models/api';

@Injectable()
export class AuthService implements OnInit {
    private currentUser = null;

    constructor(private http: Http) {}

    initUser(): void {
        localStorage.setItem('authenticated', '1');
        // localStorage.setItem('userId', '2');
        // localStorage.setItem('userEmail', userEmail);
        // localStorage.setItem('userName', userName);
        // localStorage.setItem('userRank', userRank);
        // localStorage.setItem('userHandle', userHandle);
    }

    getUser() {
        const apiLink = `${API_BASE}/users/me`;
        if (localStorage.getItem('authenticated') !== '1') {
            localStorage.setItem('authenticated', '0');
            return new Promise((resolve) => {
                resolve({
                    success: false,
                    isAuthenticated: false,
                    rank: 99
                });
            });
        } else {
            return httpHandler(this.http, apiLink);
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
            // localStorage.removeItem('userId');
            // localStorage.removeItem('userEmail');
            // localStorage.removeItem('userName');
            // localStorage.removeItem('userRank');
            // localStorage.removeItem('userHandle');
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
