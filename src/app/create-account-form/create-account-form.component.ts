import { Component, OnInit } from '@angular/core';
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

    public ranks = [
        {name: 'Superadmin', value: 0},
        {name: 'Maintenance', value: 1},
        {name: 'Admin', value: 2},
        {name: 'User', value: 3}
    ];

    setAccount() {
        if (this.createAccountHandle.length && this.createAccountRank !== null && this.createAccountEmail.length && this.createAccountName.length) {
            this.authService.initUser(this.createAccountEmail, this.createAccountName, this.createAccountRank, this.createAccountHandle);
            window.location.reload();
            window.location.href = '/home';
        } else {
            alert("Please fill out all fields.");
        }
    }

    constructor(private authService: AuthService) { }

    ngOnInit() {
    }

}
