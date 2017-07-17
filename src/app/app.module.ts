import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {    MdInputModule, MdButtonModule,
            MdTooltipModule, MdSnackBarModule,
            MdIconModule, MdMenuModule,
            MdDialog, MdDialogModule,
            MdSelectModule, MdCardModule,
            MdProgressSpinnerModule, MdDatepickerModule,
            MdNativeDateModule, MdChipsModule,
            MdCheckboxModule } from '@angular/material';
import {    CovalentDataTableModule, CovalentPagingModule,
            CovalentCommonModule, CovalentSearchModule,
            CovalentMessageModule, TdDialogService,
            CovalentDialogsModule, TdLoadingService,
            CovalentLoadingModule, CovalentStepsModule,
            CovalentNotificationsModule, CovalentChipsModule } from '@covalent/core';

import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { IndexViewComponent } from './index-view/index-view.component';
import { AnnouncementViewComponent } from './announcement-view/announcement-view.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';
import { CreateAnnouncementFormComponent } from './create-announcement-form/create-announcement-form.component';
import { LoginViewComponent } from './login-view/login-view.component';

import { AnnouncementsService } from './_services/announcements.service';
import { TagsService } from './_services/tags.service';
import { UsersService } from './_services/users.service';
import { AuthService } from './_services/auth.service';

import { UserOnlyGuard } from './_guards/useronly.guard';
import { AdminOnlyGuard } from './_guards/adminonly.guard';
import { ConfirmLeaveGuard } from './_guards/confirmleave.guard';

import 'hammerjs';

const appRoutes: Routes = [
  { path: 'admin', component: AdminPanelComponent, canActivate: [UserOnlyGuard, AdminOnlyGuard] },
  { path: 'me', component: UserPanelComponent, canActivate: [UserOnlyGuard] },
  { path: 'me/create', component: CreateAnnouncementFormComponent, canActivate: [UserOnlyGuard], canDeactivate: [ConfirmLeaveGuard] },
  { path: 'home', component: IndexViewComponent },
  { path: 'view/:id', component: AnnouncementViewComponent},
  { path: 'login/create', component: CreateAccountFormComponent },
  { path: 'login', component: LoginViewComponent },
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
    PageNotFoundComponent,
    CreateAccountFormComponent,
    CreateAnnouncementFormComponent,
    LoginViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MdInputModule,
    MdButtonModule,
    MdTooltipModule,
    MdSnackBarModule,
    MdIconModule,
    MdMenuModule,
    MdDialogModule,
    MdSelectModule,
    MdCardModule,
    MdDatepickerModule,
    MdProgressSpinnerModule,
    MdNativeDateModule,
    MdChipsModule,
    MdCheckboxModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentCommonModule,
    CovalentSearchModule,
    CovalentMessageModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentStepsModule,
    CovalentNotificationsModule,
    CovalentChipsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    MdDialog,
    TdDialogService,
    TdLoadingService,
    AnnouncementsService,
    TagsService,
    UsersService,
    AuthService,
    UserOnlyGuard,
    AdminOnlyGuard,
    ConfirmLeaveGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
