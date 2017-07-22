import { Component, OnInit, HostListener } from '@angular/core';
import { Http } from '@angular/http';
import { MdSnackBar } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import { AuthService } from '../_services/auth.service';
import { TagsService } from '../_services/tags.service';

import { Tag } from '../_models/tag';
import { API_BASE, postHandler } from '../_models/api';

import * as moment from 'moment';

interface AnnouncementGrades {
    grade7: boolean;
    grade8: boolean;
    grade9: boolean;
    grade10: boolean;
    grade11: boolean;
    grade12: boolean;
}

interface AnnouncementInput {
    title: string;
    description: string;
    startDate: any;
    endDate: any;
    creatorName: string;
    creatorId: number;
    category: number;
    isUrgent: boolean;
    grades: AnnouncementGrades;
}

enum AnnouncementStep {
    IS_RESTING = 0,                     // User has not clicked into the creation box
    STEP_ONE_POST_CREATE = 1,           // Includes creating a title and description
    STEP_TWO_CATEGORY_ASSIGN = 2,       // Includes category assignment
    STEP_THREE_DATE_ASSIGN = 3,         // Includes date assignment
    STEP_FOUR_EVENTS_CREATION = 4,      // Includes event creation
    STEP_FIVE_SUBMIT_CONFIRMATION = 5,  // Includes confirmation
    STEP_FIVE_SUBMIT_LOADING = 6,       // Sending POST request, awaiting response...
    STEP_FIVE_SUBMISSION_FAILURE = 7,   // Submission failed
    SUBMISSION_SUCCESS = 8              // Submission success!
}

@Component({
    selector: 'app-cx-post-announcement',
    templateUrl: 'html/post-announcement.component.html',
    styleUrls: ['scss/post-announcement.component.scss']
})
export class PostAnnouncementComponent implements OnInit {

    announcement: AnnouncementInput = {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        creatorName: '',
        creatorId: 0,
        category: 0,
        isUrgent: false,
        grades: {
            grade7: false,
            grade8: false,
            grade9: false,
            grade10: false,
            grade11: false,
            grade12: false
        }
    }

    allTags: Tag[];

    step = AnnouncementStep.IS_RESTING;
    steps = AnnouncementStep;

    currentTooltip = 'Initializing...';
    currentStepCounter = 'STEP 1: BASIC INFO';

    constructor(private authService: AuthService, private tagsService: TagsService,
            private dialogService: TdDialogService, private snackbar: MdSnackBar,
            private http: Http) { }

    // Validates the entire form or "by step".
    // Example: running w/o a parameter checks the entire form while
    // running with a step number checks only that step.
    validateForm(step = null): boolean {
        if (this.announcement.title.length < 10 && (step === AnnouncementStep.STEP_ONE_POST_CREATE || step === null)) { return false; }
        if (this.announcement.description.length < 20 &&
            (step === AnnouncementStep.STEP_ONE_POST_CREATE || step === null)) { return false; }
        if (!((this.announcement.startDate instanceof Date) &&
                (this.announcement.endDate instanceof Date)) &&
                (step === AnnouncementStep.STEP_THREE_DATE_ASSIGN || step === null)) { return false; }
        if (!moment(this.announcement.startDate.toString()).isValid() &&
            (step === AnnouncementStep.STEP_THREE_DATE_ASSIGN || step === null)) { return false; }
        if (!moment(this.announcement.endDate.toString()).isValid() &&
            (step === AnnouncementStep.STEP_THREE_DATE_ASSIGN || step === null)) { return false; }
        if (this.announcement.endDate < this.announcement.startDate &&
            (step === AnnouncementStep.STEP_THREE_DATE_ASSIGN || step === null)) { return false; }
        if ((this.announcement.category === 0 || this.announcement.category === null) &&
            (step === AnnouncementStep.STEP_TWO_CATEGORY_ASSIGN || step === null)) { return false; }
        // ! TODO: Must choose a grade!
        // else if (!this.selectGrades('hasAnySelected') && (step === 3 || step === null)) return false;
        return true;
    }

    changeStep() {
        this.step += 1;
        this.updateTooltip();
    }

    updateTooltip() {
        switch (this.step) {
            case AnnouncementStep.STEP_ONE_POST_CREATE:
                // tslint:disable-next-line:max-line-length
                this.currentStepCounter = 'STEP 1: BASIC INFO';
                this.currentTooltip = 'Announcement titles must be at least 10 characters long. Descriptions must be at least 20 characters long.';
                break;
            default:
                this.currentTooltip = '(no information)';
        }
    }

    /*returnTagsArray() {
        // tslint:disable:curly
        const tagsArray = [];
        // Redesign some time soon with regex?
        if (this.announcement.grades.grade7) tagsArray.push(this.allTags.filter((tag) => tag.slug === 'grade7')[0]);
        if (this.announcement.grades.grade8) tagsArray.push(this.allTags.filter((tag) => tag.slug === 'grade8')[0]);
        if (this.announcement.grades.grade9) tagsArray.push(this.allTags.filter((tag) => tag.slug === 'grade9')[0]);
        if (this.announcement.grades.grade10) tagsArray.push(this.allTags.filter((tag) => tag.slug === 'grade10')[0]);
        if (this.announcement.grades.grade11) tagsArray.push(this.allTags.filter((tag) => tag.slug === 'grade11')[0]);
        if (this.announcement.grades.grade12) tagsArray.push(this.allTags.filter((tag) => tag.slug === 'grade12')[0]);
        if (this.announcement.isUrgent) tagsArray.push(this.allTags.filter((tag) => tag.slug === 'urgent')[0]);
        if (this.announcement.category) tagsArray.push(this.allTags.filter((tag) => tag.id === this.announcement.category)[0]);
        return tagsArray;
        // tslint:enable:curly
    }*/

    ngOnInit() {
        this.tagsService.getTags().then((tags) => {
            this.allTags = tags;
        });
    }
}
