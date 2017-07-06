import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {    MdInputModule, MdButtonModule,
            MdTooltipModule, MdSnackBarModule,
            MdIconModule, MdMenuModule,
            MdDialog, MdDialogModule } from '@angular/material';
import {    CovalentDataTableModule, CovalentPagingModule,
            CovalentCommonModule, CovalentSearchModule,
            CovalentMessageModule, TdDialogService,
            CovalentDialogsModule, TdLoadingService,
            CovalentLoadingModule } from '@covalent/core';

import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { IndexViewComponent } from './index-view/index-view.component';
import { AnnouncementViewComponent } from './announcement-view/announcement-view.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AnnouncementsService } from './_services/announcements.service';
import { TagsService } from './_services/tags.service';
import { UsersService } from './_services/users.service';

const appRoutes: Routes = [
  { path: 'admin', component: AdminPanelComponent },
  { path: 'me', component: UserPanelComponent },
  { path: 'home', component: IndexViewComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    IndexViewComponent,
    AnnouncementViewComponent,
    UserPanelComponent,
    AdminPanelComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdButtonModule,
    MdTooltipModule,
    MdSnackBarModule,
    MdIconModule,
    MdMenuModule,
    MdDialogModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentCommonModule,
    CovalentSearchModule,
    CovalentMessageModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    MdDialog,
    TdDialogService,
    TdLoadingService,
    AnnouncementsService,
    TagsService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
