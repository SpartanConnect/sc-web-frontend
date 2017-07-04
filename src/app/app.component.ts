import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public snackBar: MdSnackBar) {}

  openDialog(appName) {
    this.snackBar.open("HEY! THIS '"+appName+"' IS THE BEST!", "Go Away, Sir", {
      duration: 5000,
    });
  }

  title = {
    value: 'Spartan Connect'
  };
}
