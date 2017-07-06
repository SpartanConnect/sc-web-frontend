import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent {

    @Input() authUser;

    constructor(private authService: AuthService, private router: Router) { }

    redirectToHome() {
        this.router.navigate(['/home']);
    }

    logout() {
        this.authService.logout().then(() => {
            window.location.reload();
            this.router.navigate(['/home']);
        });
    }

}
