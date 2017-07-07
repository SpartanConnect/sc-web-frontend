import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AdminOnlyGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authService.isAdministrator()) {
            this.router.navigate(['/me']);
        }
        return this.authService.isAdministrator();
    }
}
