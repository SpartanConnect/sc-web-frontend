import { Component, OnInit, HostListener } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import { AuthService } from '../_services/auth.service';
import { TagsService } from '../_services/tags.service';

import { ConfirmLeaveGuard, ComponentCanDeactivate } from '../_guards/confirmleave.guard';

import { Tag } from '../models/tag';

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
    tagsStrings: string[];
    category: number;
    isUrgent: boolean;
    grades: AnnouncementGrades;
}

@Component({
  selector: 'app-create-announcement-form',
  templateUrl: './create-announcement-form.component.html',
  styleUrls: ['./create-announcement-form.component.scss']
})
export class CreateAnnouncementFormComponent implements OnInit, ComponentCanDeactivate {

    stepNumber: number = 1;
    stepError: number = 0;
    submitted: boolean = false;
    success: boolean = false;
    loading: boolean = false;
    allTags: Tag[] = [];
    allTagsStrings: string[] = [];
    filteredTags: Tag[] = [];
    filteredTagsStrings: string[] = [];

    allCategories: Tag[] = [];

    announcement: AnnouncementInput = {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        creatorName: '',
        tagsStrings: [],
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

    // Make it so you cannot deactivate this page.
    @HostListener('window:beforeunload')
    canDeactivate() {
        return this.success;
    }

    // Activates when a person clicks 'Continue'
    addStepNumber(step: number) {
        if (!this.validateForm(step)) {
            this.stepError = step;
            return false;
        } else {
            this.stepError = 0;
            this.setStepNumber(step + 1);
            return true;
        }
    }

    // Function used mainly to affirm that when a step is open,
    // the step number in the DOM is set to the step number in this component code.
    // Steppers do not handle two-way binding very well
    // so this is the solution to that.
    setStepNumber(step: number) {
        this.stepNumber = step;
    }

    // Validates the entire form or "by step".
    // Example: running w/o a parameter checks the entire form while
    // running with a step number checks only that step.
    validateForm(step: number = null): boolean {
        // tslint:disable:curly
        if (this.announcement.title.length < 10 && (step === 1 || step === null)) return false;
        else if (this.announcement.description.length < 10 && (step === 1 || step === null)) return false;
        // tslint:disable-next-line:max-line-length
        else if (!((this.announcement.startDate instanceof Date) && (this.announcement.endDate instanceof Date)) && (step === 2 || step === null)) return false;
        else if (!moment(this.announcement.startDate.toString()).isValid() && (step === 2 || step === null)) return false;
        else if (!moment(this.announcement.endDate.toString()).isValid() && (step === 2 || step === null)) return false;
        else if (this.announcement.endDate < this.announcement.startDate && (step === 2 || step === null)) return false;
        // else if (!this.announcement.tagsStrings.length && (step === 3 || step === null)) return false;
        else if ((this.announcement.category === 0 || this.announcement.category === null) && (step === 3 || step === null)) return false;
        else if (!this.selectGrades('hasAnySelected') && (step === 3 || step === null)) return false;
        else return true;
        // tslint:enable:curly
    }

    submitForm() {
        window.scrollTo(0, 0);
        if (!this.validateForm()) {
            // tslint:disable-next-line:max-line-length
            this.snackbar.open('This form has not been fully completed. Please confirm that all fields are filled in correctly and try again.', 'DISMISS', {
                duration: 5000
            });
        } else {
            this.submitted = false;
            this.loading = true;
            this.success = false;
            setTimeout(() => {
                this.submitted = true;
                this.loading = false;
                this.success = true;
            }, 1500);
        }
    }

    // Called when input changed
    filterTags(val: string): void {
        this.filteredTags = this.allTags.filter((tag: any) => {
            if (val) {
                return (tag.name.toLowerCase().indexOf(val.toLowerCase()) > -1) || (tag.slug.toLowerCase().indexOf(val.toLowerCase()) > -1);
            } else {
                return true;        // don't filter anything
            }
        }).filter((filteredTag: any) => {
            // Remove any tags from autocomplete that the user already selected
            return this.announcement.tagsStrings ? (this.announcement.tagsStrings.indexOf(filteredTag.name) < 0) : true;
        });
        this.filteredTagsStrings = this.filteredTags.map((tag: Tag) => {
            return tag.name;
        })
    }

    // Select checkboxes
    selectGrades(mode: string) {
        // tslint:disable:curly
        switch (mode) {
            case 'middle':
                this.announcement.grades.grade7 = true;
                this.announcement.grades.grade8 = true;
                this.announcement.grades.grade9 = false;
                this.announcement.grades.grade10 = false;
                this.announcement.grades.grade11 = false;
                this.announcement.grades.grade12 = false;
                break;
            case 'high':
                this.announcement.grades.grade7 = false;
                this.announcement.grades.grade8 = false;
                this.announcement.grades.grade9 = true;
                this.announcement.grades.grade10 = true;
                this.announcement.grades.grade11 = true;
                this.announcement.grades.grade12 = true;
                break;
            case 'all':
                this.announcement.grades.grade7 = true;
                this.announcement.grades.grade8 = true;
                this.announcement.grades.grade9 = true;
                this.announcement.grades.grade10 = true;
                this.announcement.grades.grade11 = true;
                this.announcement.grades.grade12 = true;
                break;
            case 'none':
                this.announcement.grades.grade7 = false;
                this.announcement.grades.grade8 = false;
                this.announcement.grades.grade9 = false;
                this.announcement.grades.grade10 = false;
                this.announcement.grades.grade11 = false;
                this.announcement.grades.grade12 = false;
                break;
            case 'hasAllSelected':
                if (!this.announcement.grades.grade7) return false;
                if (!this.announcement.grades.grade8) return false;
                if (!this.announcement.grades.grade9) return false;
                if (!this.announcement.grades.grade10) return false;
                if (!this.announcement.grades.grade11) return false;
                if (!this.announcement.grades.grade12) return false;
                return true;
            case 'hasAnySelected':
                if (this.announcement.grades.grade7) return true;
                if (this.announcement.grades.grade8) return true;
                if (this.announcement.grades.grade9) return true;
                if (this.announcement.grades.grade10) return true;
                if (this.announcement.grades.grade11) return true;
                if (this.announcement.grades.grade12) return true;
                return false;
        }
        // tslint:enable:curly
    }

    confirmUrgency() {
        // tslint:disable:max-line-length
        if (!this.announcement.isUrgent) {
            this.dialogService.openConfirm({
                disableClose: true,
                title: 'Don\'t cry wolf!',
                message: 'The urgent tag is only reserved for announcements that contain critical and time-sensitive information. By accepting this dialog, you agree that your announcement is indeed urgent.'
            }).afterClosed().subscribe((confirmed: boolean) => {
                if (confirmed) {
                    this.snackbar.open('Your announcement is now marked as urgent.', 'DISMISS', {
                        duration: 5000
                    });
                } else {
                    this.announcement.isUrgent = false;
                }
            });
        }
        // tslint:enable:max-line-length
    }

    constructor(private authService: AuthService, private tagsService: TagsService,
            private dialogService: TdDialogService, private snackbar: MdSnackBar) { }

    ngOnInit() {
        this.authService.getUser().then((user) => {
            this.announcement.creatorName = user.name;
        });
        /*
        this.tagsService.getVisibleTags().then((data) => {
            this.allTags = data;
            this.allTagsStrings = this.allTags.map((tag) => {
                return tag.name;
            });
            this.filterTags('');
        });*/
        this.tagsService.getCategories().then((categories) => {
            this.allCategories = categories;
        })
    }

}
