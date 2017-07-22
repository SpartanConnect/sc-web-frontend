import { Component, OnInit, HostListener } from '@angular/core';
import { Http } from '@angular/http';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';

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
    omniDate: any;
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
    STEP_TWO_GRADES_ASSIGN = 3,         // Includes grade assignment
    STEP_THREE_DATE_ASSIGN = 4,         // Includes date assignment
    STEP_FOUR_EVENTS_CREATION = 5,      // Includes event creation
    STEP_FIVE_SUBMIT_CONFIRMATION = 6,  // Includes confirmation
    STEP_FIVE_SUBMIT_LOADING = 7,       // Sending POST request, awaiting response...
    STEP_FIVE_SUBMISSION_FAILURE = 8,   // Submission failed
    SUBMISSION_SUCCESS = 9              // Submission success!
}

enum AnnouncementDateMode {
    NOT_SELECTED,
    SHOW_ONE_DAY,                       // Only start date
    SHOW_OVER_RANGE                     // Start date + end date
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
        omniDate: '',
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
    allCategories: Tag[];

    step = AnnouncementStep.IS_RESTING;
    steps = AnnouncementStep;
    dateMode = AnnouncementDateMode.NOT_SELECTED;
    dateModes = AnnouncementDateMode;

    isExplanationOpen = false;

    currentTooltip = 'Initializing...';
    currentStepCounter = 'STEP 1: BASIC INFO';

    constructor(private authService: AuthService, private tagsService: TagsService,
            private dialogService: TdDialogService, private snackbar: MdSnackBar,
            private http: Http, private loadingService: TdLoadingService) { }

    // Validates the entire form or "by step".
    // Example: running w/o a parameter checks the entire form while
    // running with a step number checks only that step.
    validateForm(step = null): boolean {
        if (this.announcement.title.length < 10 && (step === AnnouncementStep.STEP_ONE_POST_CREATE || step === null)) { return false; }
        if (this.announcement.description.length < 20 &&
            (step === AnnouncementStep.STEP_ONE_POST_CREATE || step === null)) { return false; }
        if ((step === AnnouncementStep.STEP_TWO_GRADES_ASSIGN || step === null) && (
            (!this.announcement.grades.grade7) &&
            (!this.announcement.grades.grade8) &&
            (!this.announcement.grades.grade9) &&
            (!this.announcement.grades.grade10) &&
            (!this.announcement.grades.grade11) &&
            (!this.announcement.grades.grade12)
        )) { return false; }
        if (this.dateMode === AnnouncementDateMode.NOT_SELECTED &&
            (step === AnnouncementStep.STEP_THREE_DATE_ASSIGN || step === null)) { return false; }
        if (!((this.announcement.startDate instanceof Date) &&
                (this.announcement.endDate instanceof Date)) && (this.dateMode === AnnouncementDateMode.SHOW_OVER_RANGE) &&
                (step === AnnouncementStep.STEP_THREE_DATE_ASSIGN || step === null)) { return false; }
        if (!(this.announcement.omniDate instanceof Date) && (this.dateMode === AnnouncementDateMode.SHOW_ONE_DAY) &&
                (step === AnnouncementStep.STEP_THREE_DATE_ASSIGN || step === null)) { return false; }
        if (!moment(this.announcement.startDate.toString()).isValid() && (this.dateMode === AnnouncementDateMode.SHOW_OVER_RANGE) &&
            (step === AnnouncementStep.STEP_THREE_DATE_ASSIGN || step === null)) { return false; }
        if (!moment(this.announcement.endDate.toString()).isValid() && (this.dateMode === AnnouncementDateMode.SHOW_OVER_RANGE) &&
            (step === AnnouncementStep.STEP_THREE_DATE_ASSIGN || step === null)) { return false; }
        if (this.announcement.endDate < this.announcement.startDate && (this.dateMode === AnnouncementDateMode.SHOW_OVER_RANGE) &&
            (step === AnnouncementStep.STEP_THREE_DATE_ASSIGN || step === null)) { return false; }
        if (!moment(this.announcement.omniDate.toString()).isValid() && (this.dateMode === AnnouncementDateMode.SHOW_ONE_DAY) &&
            (step === AnnouncementStep.STEP_THREE_DATE_ASSIGN || step === null)) { return false; }
        if ((this.announcement.category === 0 || this.announcement.category === null) &&
            (step === AnnouncementStep.STEP_TWO_CATEGORY_ASSIGN || step === null)) { return false; }
        if (step === AnnouncementStep.STEP_FIVE_SUBMIT_LOADING) { return false; }
        // else if (!this.selectGrades('hasAnySelected') && (step === 3 || step === null)) return false;
        return true;
    }

    changeStep() {
        this.isExplanationOpen = false;
        if (this.validateForm(this.step)) {
            // Make sure to set the start/end date of the announcement to the omni date
            // ! We are porting this over to the announcement submission handler.
            /*if (this.step === AnnouncementStep.STEP_THREE_DATE_ASSIGN) {
                if (this.announcement.omniDate && this.dateMode === AnnouncementDateMode.SHOW_ONE_DAY) {
                    this.announcement.startDate = this.announcement.omniDate;
                    this.announcement.endDate = this.announcement.omniDate;
                }
            }*/
            // Get user information before user moves on to confirmation dialog
            if (this.step === AnnouncementStep.STEP_FIVE_SUBMIT_CONFIRMATION - 1) {
                this.authService.getUser().then((user) => {
                    this.announcement.creatorName = user.name;
                    this.announcement.creatorId = user.id;
                });
            }
            // Make sure user doesn't normally proceed when on confirmation stage
            if (this.step === AnnouncementStep.STEP_FIVE_SUBMIT_CONFIRMATION
                || this.step === AnnouncementStep.STEP_FIVE_SUBMIT_LOADING
                || this.step === AnnouncementStep.STEP_FIVE_SUBMISSION_FAILURE) {
                if (this.step === AnnouncementStep.STEP_FIVE_SUBMIT_CONFIRMATION && this.validateForm()) {
                    this.step = AnnouncementStep.STEP_FIVE_SUBMIT_LOADING;
                    this.updateTooltip();
                    this.submitAnnouncement();
                }
            } else {
                this.step += 1;
                this.updateTooltip();
            }
        }
    }

    moveBackStep() {
        this.isExplanationOpen = false;
        if (this.step !== AnnouncementStep.STEP_ONE_POST_CREATE) {
            this.step = this.step - 1;
            this.updateTooltip();
        }
    }

    updateTooltip() {
        switch (this.step) {
            // tslint:disable:max-line-length
            case AnnouncementStep.STEP_ONE_POST_CREATE:
                this.currentStepCounter = 'STEP 1: BASIC INFO';
                this.currentTooltip = 'Announcement titles must be at least 10 characters long. Descriptions must be at least 20 characters long.';
                break;
            case AnnouncementStep.STEP_TWO_CATEGORY_ASSIGN:
                this.currentStepCounter = 'STEP 2: CATEGORIES';
                this.currentTooltip = 'You must select one category.';
                break;
            case AnnouncementStep.STEP_TWO_GRADES_ASSIGN:
                this.currentStepCounter = 'STEP 2: GRADES';
                this.currentTooltip = 'You must select at least one grade level.';
                break;
            case AnnouncementStep.STEP_THREE_DATE_ASSIGN:
                this.currentStepCounter = 'STEP 3: DISPLAY DATES';
                this.currentTooltip = 'You must select a valid start and end date window.';
                break;
            case AnnouncementStep.STEP_FOUR_EVENTS_CREATION:
                this.currentStepCounter = 'STEP 4: EVENTS';
                this.currentTooltip = '(Optional) You can add events and deadlines.';
                break;
            case AnnouncementStep.STEP_FIVE_SUBMIT_CONFIRMATION:
                this.currentStepCounter = 'STEP 5: CONFIRMATION';
                this.currentTooltip = 'Please confirm that your announcement is valid. Feel free to skip back to any steps.';
                break;
            case AnnouncementStep.STEP_FIVE_SUBMISSION_FAILURE:
                this.currentStepCounter = 'STEP 5: CONFIRMATION';
                this.currentTooltip = 'Please confirm that your announcement is valid. Feel free to skip back to any steps.';
                break;
            case AnnouncementStep.STEP_FIVE_SUBMIT_LOADING:
                this.currentStepCounter = 'SUBMITTING ANNOUNCEMENT';
                this.currentTooltip = 'Your announcement is currently being submitted. If this process takes over a few minutes, refresh your browser and try again.';
                break;
            default:
                this.currentStepCounter = 'STEP ?: UNKNOWN STEP';
                this.currentTooltip = '(no information)';
            // tslint:enable:max-line-length
        }
    }

    openExplanation() {
        this.isExplanationOpen = true;
    }

    returnTagsArray() {
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
    }

    toggleGrade(grade: number) {
        if (this.announcement.grades['grade' + grade]) {
            this.announcement.grades['grade' + grade] = false;
        } else {
            this.announcement.grades['grade' + grade] = true;
        }
        const cachedGrades = [];
        Object.keys(this.announcement.grades).forEach((key) => {
            if (this.announcement.grades[key]) {
                cachedGrades.push(parseInt(key.replace('grade', ''), undefined));
            }
        });
        this.cacheResponse('ann_grades', cachedGrades.join('/'));
    }

    setCategory(id: number) {
        this.announcement.category = id;
        this.cacheResponse('ann_category', this.announcement.category.toString());
    }

    cacheResponse(key, value) {
        localStorage.setItem(key, value.toString());
    }

    // Posts the announcement
    submitAnnouncement() {
        const apiLink = `${API_BASE}/announcements`;
        window.scrollTo(0, 0);
        this.loadingService.register('submissionLoading');

        if (this.validateForm()) {
            postHandler(this.http, apiLink, {
                title: this.announcement.title,
                description: this.announcement.description,
                startDate: ((this.dateMode === AnnouncementDateMode.SHOW_ONE_DAY) ?
                    moment(this.announcement.omniDate).format('YYYY-MM-DD') :
                    moment(this.announcement.startDate).format('YYYY-MM-DD')),
                endDate: ((this.dateMode === AnnouncementDateMode.SHOW_ONE_DAY) ?
                    moment(this.announcement.omniDate).format('YYYY-MM-DD') :
                    moment(this.announcement.endDate).format('YYYY-MM-DD')),
                tags: this.returnTagsArray()
            }).then((postData) => {
                this.loadingService.resolve('submissionLoading');
                if (postData.success === false) {
                    this.snackbar.open('Submission error: ' + (postData.message || postData.reason), 'DISMISS', {
                        duration: 5000
                    });
                    this.step = AnnouncementStep.STEP_FIVE_SUBMISSION_FAILURE;
                } else {
                    this.step = AnnouncementStep.SUBMISSION_SUCCESS;
                    localStorage.removeItem('ann_title');
                    localStorage.removeItem('ann_description');
                    localStorage.removeItem('ann_grades');
                    localStorage.removeItem('ann_category');
                }
            }).catch((err) => {
                this.loadingService.resolve('submissionLoading');
                this.step = AnnouncementStep.STEP_FIVE_SUBMISSION_FAILURE;
                // tslint:disable-next-line:max-line-length
                this.snackbar.open('Error: ' + (err.message || err.reason), 'DISMISS', {
                    duration: 5000
                });
            });
        } else {
            // tslint:disable-next-line:max-line-length
            this.snackbar.open('This form has not been fully completed. Please confirm that all fields are filled in correctly and try again.', 'DISMISS', {
                duration: 5000
            });
        }
    }

    reloadPage() {
        window.location.reload();
    }

    ngOnInit() {
        this.tagsService.getTags().then((tags) => {
            this.allTags = tags;
            this.allCategories = tags.filter((tag) => {
                return tag.parentId === null && tag.visibility && (tag.slug !== 'urgent');
            });
            if (localStorage.getItem('ann_category') !== null) {
                const categoryIds = this.allCategories.map((tag) => tag.id);
                if (categoryIds.indexOf(parseInt(localStorage.getItem('ann_category'), undefined)) !== -1) {
                    this.announcement.category = parseInt(localStorage.getItem('ann_category'), undefined);
                } else {
                    this.announcement.category = 0;
                    this.cacheResponse('ann_category', '0');
                }
            }
        });
        // Local Storage
        if (localStorage.getItem('ann_title') !== null) {
            this.announcement.title = localStorage.getItem('ann_title');
        }
        if (localStorage.getItem('ann_description') !== null) {
            this.announcement.description = localStorage.getItem('ann_description');
        }
        if (localStorage.getItem('ann_grades') !== null) {
            // this.announcement.description = localStorage.getItem('ann_description');
            localStorage.getItem('ann_grades').split('/').map((grade) => {
                this.announcement.grades['grade' + grade] = true;
            });
        }
    }
}
