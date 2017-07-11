import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { User } from '../models/user';
import { API_BASE, httpHandler } from '../models/api';

// NOTICE: This does not contain any authentication code.
// Instead, it simply provides easy access to user data.
// This does not contain code for the logged in user.
// For authentication and more, see the AuthenticationService.

@Injectable()
export class UsersService implements OnInit {

    users: User[];

    // Exposed getters for other components to use
    getUsers(): Promise<User[]> {
        let apiLink = `${API_BASE}/users`;
        return httpHandler(this.http, apiLink);
    }

    constructor(private http: Http) { }

    ngOnInit() {
    }

}
