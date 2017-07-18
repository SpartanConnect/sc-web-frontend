import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TdLoadingService, LoadingType, LoadingMode } from '@covalent/core';

import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public authUser = {
        success: false,
        isAuthenticated: false,
        rank: 99
    };

    constructor(public snackBar: MdSnackBar, private authService: AuthService, private loadingService: TdLoadingService) {
        this.loadingService.create({
            name: 'appAuthLoading',
            type: LoadingType.Linear,
            mode: LoadingMode.Indeterminate,
            color: 'primary'
        });
    }

    ngOnInit() {
        this.loadingService.register('appAuthLoading');
        this.authService.getUser().then((data) => {
            this.authUser = data;
            this.loadingService.resolve('appAuthLoading');
        });
    }
}
