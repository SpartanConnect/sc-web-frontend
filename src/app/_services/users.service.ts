import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { User } from '../_models/user';
import { API_BASE, httpHandler, postHandler } from '../_models/api';

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

    createUser(email: string) {
        const apiLink = `${API_BASE}/users`;
        return new Promise((resolve) => {
            this.getUsers().then((allUsers) => {
                if (allUsers.filter((u) => u.email === email).length !== 0) {
                    resolve({
                        success: false,
                        message: 'Email already exists in the system.'
                    });
                } else {
                    postHandler(this.http, apiLink, {
                        name: '(not logged in)',
                        email: email
                    }).then(() => {
                        this.getUsers().then((newUsers) => {
                            const userId = data.filter((u) => u.email === email)[0].id;
                            postHandler(this.http, apiLink + `/${userId}`, {
                                rank: 3
                            }).then((data2) => {
                                resolve({
                                    success: true,
                                    message: 'User has been added.'
                                });
                                return data2;
                            });
                        });
                    });
                }

            });
        })
    }

    constructor(private http: Http) { }

    ngOnInit() {
    }

}
