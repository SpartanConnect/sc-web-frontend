import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public authUser;

    constructor(public snackBar: MdSnackBar, private authService: AuthService) {}

    ngOnInit() {
        this.authUser = this.authService.getUser();
    }
}
