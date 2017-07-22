import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-cx-status-tag',
    template: `<div [class]="statusStyle" [mdTooltip]="statusTip" mdTooltipPosition="right">{{statusValue}}</div>`,
    styleUrls: ['status-tag.component.scss']
})
export class StatusTagComponent implements OnInit {
    @Input() announcement;
    statusValue: string;
    statusStyle: string;
    statusTip: string;

    constructor() {}

    ngOnInit() {
        this.statusStyle = 'status-tag ';
        switch (this.announcement.status) {
            case 0:
                this.statusValue = 'PENDING APPROVAL';
                this.statusStyle += 'yellow';
                this.statusTip = 'This announcement is pending approval.';
                break;
            case 1:
                this.statusValue = 'APPROVED';
                this.statusStyle += 'green';
                this.statusTip = 'Approved by ' + this.announcement.creator.name + ' on ' + this.announcement.timeApproved;
                break;
            case 2:
                this.statusValue = 'DENIED';
                this.statusStyle += 'red';
                this.statusTip = 'Your announcement has been denied by '
                    + this.announcement.creator.name +
                    ' for not complying with our announcement guidelines. Please edit your announcement and resubmit it for approval.';
                break;
            case 3:
                this.statusValue = 'REMOVED';
                this.statusStyle += 'gray';
                this.statusTip = 'This announcement has been removed.';
                break;
            default:
                this.statusValue = 'INVALID STATUS';
                this.statusStyle += 'gray';
                this.statusTip = 'Could not correctly fetch announcement status. Please reload your page.';
        }
    }

}
