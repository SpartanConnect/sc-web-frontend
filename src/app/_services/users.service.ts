import { Injectable, OnInit } from '@angular/core';

import { User } from '../models/user';
import { API_BASE } from '../models/api';

// NOTICE: This does not contain any authentication code.
// Instead, it simply provides easy access to user data.
// This does not contain code for the logged in user.
// For authentication and more, see the AuthenticationService.

@Injectable()
export class UsersService implements OnInit {

    users: User[];

    // Exposed getters for other components to use
    getUsers(): Promise<User[]> {
        return new Promise((resolve) => {
            this.retrieveUsers().then(() => {
                resolve(this.users);
            });
        });
    }

    // Refreshing the service itself with new announcements
    // TODO: Remove this and the announcements array.
    retrieveUsers(): Promise<User[]> {
        return new Promise((resolve) => {
            this.users = [];                            // Replace with HTTP GET
            setTimeout(() => {resolve(this.users)}, 1500);      // Artificial delay
        });
    }

    constructor() { }

    ngOnInit() {
        this.retrieveUsers();
    }

}
