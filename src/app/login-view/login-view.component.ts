import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

    authStatus: number;

    constructor(private authService: AuthService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.authStatus = parseInt(this.route.snapshot.queryParamMap.get('authstatus'), undefined);
    }

}
