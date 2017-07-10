import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-index-view',
  templateUrl: './index-view.component.html',
  styleUrls: ['./index-view.component.scss']
})
export class IndexViewComponent implements OnInit {

  constructor(public snackBar: MdSnackBar) { }

  openDialog(appName) {
    this.snackBar.open("HEY! THIS '"+appName+"' IS THE BEST!", "Go Away, Sir", {
      duration: 5000,
    });
  }

  ngOnInit() {
  }

}
