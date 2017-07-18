import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { API_BASE } from '../models/api';

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
        generalError: [102, 103, 104, 105, 106, 107, 108, 109, 110]
    };

    constructor(private authService: AuthService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.authStatus = parseInt(this.route.snapshot.queryParamMap.get('authstatus'), undefined);
        if (!this.authStatus || this.authStatus === 101) {
            window.location.href = `${API_BASE}/users/login/generate`;
        } else if (this.authStatus === 100) {
            this.authService.initUser();
        }
    }

}