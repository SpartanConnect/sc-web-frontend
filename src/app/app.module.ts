import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {    MdInputModule, MdButtonModule,
            MdTooltipModule, MdSnackBarModule,
            MdIconModule, MdMenuModule,
            MdDialog, MdDialogModule,
            MdSelectModule, MdCardModule,
            MdProgressSpinnerModule, MdDatepickerModule,
            MdNativeDateModule, MdChipsModule,
            MdCheckboxModule, MdRadioModule } from '@angular/material';
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
import { LoginViewComponent } from './login-view/login-view.component';
// import { StatusTagComponent } from './_components/status-tag.component';
import { PostAnnouncementComponent } from './_components/post-announcement.component';
// import { AnnouncementComponent } from './_components/announcement.component';
import { SpotlightCardComponent } from './_components/spotlight-card.component';
import { AnnouncementAllViewComponent } from './announcement-all-view/announcement-all-view.component';
import { StaticPrivacyPolicyComponent } from './static-privacy-policy/static-privacy-policy.component';
import { FooterComponent } from './footer/footer.component';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { RedirectMobileAppComponent } from './redirect-mobile-app/redirect-mobile-app.component';
import { NewUserComponent } from './new-user/new-user.component';

import { HtmlLinkPipe } from './_pipes/html-link.pipe';
import { AdminPanelModule } from './admin-panel/admin-panel.module';

import { AnnouncementsService } from './_services/announcements.service';
import { TagsService } from './_services/tags.service';
import { UsersService } from './_services/users.service';
import { AuthService } from './_services/auth.service';
import { NotificationsService } from './_services/notifications.service';
import { PopupModalService } from './popup-modal/popup-modal.service';

import { UserOnlyGuard } from './_guards/useronly.guard';
import { AdminOnlyGuard } from './_guards/adminonly.guard';
import { ConfirmLeaveGuard } from './_guards/confirmleave.guard';

import 'hammerjs';

const appRoutes: Routes = [
  { path: 'admin', component: AdminPanelComponent, canActivate: [UserOnlyGuard, AdminOnlyGuard] },
  { path: 'admin/newuser', component: NewUserComponent, canActivate: [UserOnlyGuard, AdminOnlyGuard] },
  { path: 'me', component: UserPanelComponent, canActivate: [UserOnlyGuard] },
  { path: 'home', component: IndexViewComponent },
  { path: 'view/archived', component: AnnouncementAllViewComponent},
  { path: 'view/:id', component: AnnouncementViewComponent},
  { path: 'login', component: LoginViewComponent },
  { path: 'privacy', component: StaticPrivacyPolicyComponent },
  { path: 'm', component: RedirectMobileAppComponent },
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
    // AdminPanelComponent,
    PageNotFoundComponent,
    LoginViewComponent,
    // StatusTagComponent,
    PostAnnouncementComponent,
    AnnouncementAllViewComponent,
    SpotlightCardComponent,
    StaticPrivacyPolicyComponent,
    FooterComponent,
    PopupModalComponent,
    RedirectMobileAppComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
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
    MdRadioModule,
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
    AdminPanelModule,
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
    ConfirmLeaveGuard,
    PopupModalService,
    AppComponent,
    NotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
