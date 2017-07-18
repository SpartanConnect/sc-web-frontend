import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent implements OnInit {

    public createAccountHandle: string = "";
    public createAccountName: string = "";
    public createAccountEmail: string = "";
    public createAccountRank: string = null;
    forbidden: boolean = false;

    public ranks = [
        {name: 'Superadmin', value: 0},
        {name: 'Maintenance', value: 1},
        {name: 'Admin', value: 2},
        {name: 'User', value: 3}
    ];

    setAccount() {
        if (this.createAccountHandle.length && this.createAccountRank !== null &&
            this.createAccountEmail.length && this.createAccountName.length) {
            this.authService.initUser();
            window.location.reload();
            window.location.href = '/login?authstatus=100';
        } else {
            alert('Please fill out all fields.');
        }
    }

    constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.forbidden = (this.route.snapshot.queryParamMap.has('forbidden'));
    }

}
