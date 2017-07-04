import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule, MdButtonModule, MdTooltipModule, MdSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { IndexViewComponent } from './index-view/index-view.component';
import { AnnouncementViewComponent } from './announcement-view/announcement-view.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    IndexViewComponent,
    AnnouncementViewComponent,
    UserPanelComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdButtonModule,
    MdTooltipModule,
    MdSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
