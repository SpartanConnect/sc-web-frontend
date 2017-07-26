import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CovalentCommonModule } from '@covalent/core';

import { MdIconModule, MdProgressSpinnerModule,
         MdButtonModule, MdTableModule,
         MdCheckboxModule, MdTooltipModule } from '@angular/material';

import { AdminDatatableComponent } from './ts/admin-datatable.component';
import { AdminHeaderPanelComponent } from './ts/admin-header-panel.component';
import { AdminToolbarComponent } from './ts/admin-toolbar.component';
import { AdminOverviewPanelComponent } from './ts/admin-overview-panel.component';
import { AdminPanelComponent } from './admin-panel.component';
import { StatusTagComponent } from '../_components/status-tag.component';
import { AnnouncementComponent } from '../_components/announcement.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdIconModule,
        MdProgressSpinnerModule,
        MdButtonModule,
        MdTableModule,
        MdCheckboxModule,
        MdTooltipModule,
        CovalentCommonModule
    ],
    exports: [
        AnnouncementComponent
    ],
    declarations: [
        AdminDatatableComponent,
        AdminHeaderPanelComponent,
        AdminToolbarComponent,
        AdminOverviewPanelComponent,
        AdminPanelComponent,
        AnnouncementComponent,
        StatusTagComponent
    ],
    providers: [],
})
export class AdminPanelModule { }
