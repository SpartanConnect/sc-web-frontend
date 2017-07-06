import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class AuthService implements OnInit {
    private currentUser = null;

    initUser(userEmail, userName, userRank): void {
        localStorage.setItem('authenticated', '1');
        localStorage.setItem('userId', '20');
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userName', userName);
        localStorage.setItem('userRank', userRank);
    }

    getUser(): object {
        if (localStorage.getItem('authenticated') !== '1') {
            localStorage.setItem('authenticated', '0');
        }
        return {
            authenticated: localStorage.getItem('authenticated') === '1',
            userId: localStorage.getItem('userId'),
            userEmail: localStorage.getItem('userEmail'),
            userName: localStorage.getItem('userName'),
            userRank: parseInt(localStorage.getItem('userRank'))
        };
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('authenticated') === '1';
    }

    ngOnInit() {
        // Set up local storage for first users.
        if (localStorage.getItem('authenticated') !== '1') {
            localStorage.setItem('authenticated', '0');
        }
    }
}
