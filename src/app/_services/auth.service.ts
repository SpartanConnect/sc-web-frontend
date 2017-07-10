import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class AuthService implements OnInit {
    private currentUser = null;

    initUser(userEmail, userName, userRank, userHandle): void {
        localStorage.setItem('authenticated', '1');
        localStorage.setItem('userId', '20');
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userName', userName);
        localStorage.setItem('userRank', userRank);
        localStorage.setItem('userHandle', userHandle);
    }

    getUser() {
        if (localStorage.getItem('authenticated') !== '1') {
            localStorage.setItem('authenticated', '0');
        }
        return {
            authenticated: localStorage.getItem('authenticated') === '1',
            userId: parseInt(localStorage.getItem('userId')),
            userEmail: localStorage.getItem('userEmail'),
            userName: localStorage.getItem('userName'),
            userRank: parseInt(localStorage.getItem('userRank')),
            userHandle: localStorage.getItem('userHandle')
        };
    }

    logout(): Promise<boolean> {
        return new Promise((resolve) => {
            localStorage.setItem('authenticated', '0');
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            localStorage.removeItem('userRank');
            localStorage.removeItem('userHandle');
            resolve(true);
        });
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('authenticated') === '1';
    }

    isAdministrator(): boolean {
        return (localStorage.getItem('authenticated') === '1') && (parseInt(localStorage.getItem('userRank')) <= 2);
    }

    ngOnInit() {
        // Set up local storage for first users.
        if (localStorage.getItem('authenticated') !== '1') {
            localStorage.setItem('authenticated', '0');
        }
    }
}
