import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CovalentCommonModule, CovalentDataTableModule, TdDialogService } from '@covalent/core';

import { MdIconModule, MdProgressSpinnerModule,
         MdButtonModule, MdCheckboxModule,
         MdTooltipModule, MdSnackBarModule,
         MdSelectModule } from '@angular/material';

import { AdminDatatableComponent } from './ts/admin-datatable.component';
import { AdminHeaderPanelComponent } from './ts/admin-header-panel.component';
import { AdminToolbarComponent } from './ts/admin-toolbar.component';
import { AdminOverviewPanelComponent } from './ts/admin-overview-panel.component';
import { AdminPanelComponent } from './admin-panel.component';
import { StatusTagComponent } from '../_components/status-tag.component';
import { AnnouncementComponent } from '../_components/announcement.component';

import { AdminPanelService } from './admin-panel.service';
import { NotificationsService } from '../_services/notifications.service';

import { HtmlLinkPipe } from '../_pipes/html-link.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MdIconModule,
        MdProgressSpinnerModule,
        MdButtonModule,
        MdCheckboxModule,
        MdTooltipModule,
        MdSnackBarModule,
        MdSelectModule,
        CovalentCommonModule,
        CovalentDataTableModule
    ],
    exports: [
        AnnouncementComponent,
        HtmlLinkPipe
    ],
    declarations: [
        AdminDatatableComponent,
        AdminHeaderPanelComponent,
        AdminToolbarComponent,
        AdminOverviewPanelComponent,
        AdminPanelComponent,
        AnnouncementComponent,
        StatusTagComponent,
        HtmlLinkPipe
    ],
    providers: [
        AdminPanelService,
        TdDialogService,
        NotificationsService
    ],
})
export class AdminPanelModule { }
