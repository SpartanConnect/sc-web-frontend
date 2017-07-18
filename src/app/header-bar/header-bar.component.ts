import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { API_BASE } from '../models/api';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

    @Input() authUser;

    constructor(private authService: AuthService, private router: Router) { }

    redirectToHome() {
        window.scrollTo(0, 0);
        this.router.navigate(['/home']);
    }

    logout() {
        this.authService.logout().then(() => {
            window.location.href = `${API_BASE}/users/logout`;
        });
    }

    ngOnInit() {
    }

}
