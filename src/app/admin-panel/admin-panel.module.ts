import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminDatatableComponent } from './ts/admin-datatable.component';
import { AdminHeaderPanelComponent } from './ts/admin-header-panel.component';
import { AdminToolbarComponent } from './ts/admin-toolbar.component';
import { AdminOverviewPanelComponent } from './ts/admin-overview-panel.component';
// import { AdminPanelComponent } from './admin-panel.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        AdminDatatableComponent,
        AdminHeaderPanelComponent,
        AdminToolbarComponent,
        AdminOverviewPanelComponent
    ],
    providers: [],
})
export class AdminPanelModule { }
