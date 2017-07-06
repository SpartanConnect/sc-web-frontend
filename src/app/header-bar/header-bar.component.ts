import { Component, Input } from '@angular/core';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent {

    @Input() authUser;

    constructor(private authService: AuthService) { }

    logout() {
        this.authService.logout().then(() => {
            window.location.reload();
            window.location.href = '/home';
        });
    }

}
