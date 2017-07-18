import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TdLoadingService, LoadingType, LoadingMode } from '@covalent/core';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class UserOnlyGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        this.authService.isAuthenticated().then((isAuth) => {
            if (!isAuth) {
                this.router.navigate(['/login/create'], {queryParams: {forbidden: true}});
            }
        });
        return this.authService.isAuthenticated();
    }
}
