import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { API_BASE } from '../_models/api';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

    authStatus: number;
    errors = {
        successLogin: [100],
        successLogout: [200],
        notLoggedIn: [101],
        generalError: [102, 103, 104, 105, 106, 107, 108, 110, 111],
        incorrectDomain: [109]
    };

    constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.authStatus = parseInt(this.route.snapshot.queryParamMap.get('authstatus'), undefined);
        if (this.authStatus === 101 || !this.authStatus) {
            window.location.href = `${API_BASE}/users/login/generate`;
        } else if (this.authStatus === 100) {
            this.authService.initUser().then((user) => {
                if (user.isAuthenticated) {
                    this.router.navigate(['/me'], {
                        queryParams: {
                            loggedin: true
                        }
                    });
                } else {
                    this.authStatus = 111;
                }
            });
        } else if (this.authStatus === 200) {
            localStorage.removeItem('hasloggedin');
            this.router.navigate(['/home'], {
                queryParams: {
                    loggedout: true
                }
            });
        }
    }

}
