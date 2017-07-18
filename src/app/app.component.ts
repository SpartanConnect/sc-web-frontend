import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { TdLoadingService, LoadingType, LoadingMode } from '@covalent/core';

import { AuthService } from './_services/auth.service';
import { API_BASE } from './models/api';

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
    public authStatus = null;

    constructor(public snackBar: MdSnackBar, private authService: AuthService, private loadingService: TdLoadingService,
    private route: ActivatedRoute, private router: Router) {
        this.loadingService.create({
            name: 'appAuthLoading',
            type: LoadingType.Linear,
            mode: LoadingMode.Indeterminate,
            color: 'primary'
        });
    }

    ngOnInit() {
        // Load in the user header
        this.loadingService.register('appAuthLoading');
        this.authService.getUser().then((data) => {
            this.authUser = data;
            this.loadingService.resolve('appAuthLoading');
        });
    }
}
