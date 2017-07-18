import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AdminOnlyGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        this.authService.isAdministrator().then((isAdmin) => {
            if (!isAdmin) {
                this.router.navigate(['/me'], {queryParams: {forbidden: true}});
            }
        });
        return this.authService.isAdministrator();
    }
}
