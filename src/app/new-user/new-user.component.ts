import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { UsersService } from '../_services/users.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]);

    setupUserEmail = '';
    setupUserIsAdmin = false;

    submitForm() {
        this.usersService.createUser(this.setupUserEmail).then((res: any) => {
            if (res.success) {
                this.snackbar.open('User has been added.', 'DISMISS');
                this.router.navigate(['/admin']);
            } else {
                this.snackbar.open(res.message, 'DISMISS');
            }
        });
    }

    constructor(private usersService: UsersService, private snackbar: MdSnackBar, private router: Router) { }

    ngOnInit() {
    }

}
