import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';

import * as moment from 'moment';

@Component({
  selector: 'app-create-announcement-form',
  templateUrl: './create-announcement-form.component.html',
  styleUrls: ['./create-announcement-form.component.scss']
})
export class CreateAnnouncementFormComponent implements OnInit {

    stepNumber: number = 1;
    stepError: number = 0;
    success: boolean = false;

    announcement = {
        title: '',
        description: '',
        startDate: null,
        endDate: null,
        creatorName: ''
    }

    addStepNumber(step: number) {
        if (!this.validateForm(step)) {
            this.stepError = step;
            return false;
        }
        this.stepError = 0;
        this.setStepNumber(step + 1);
        return true;
    }

    setStepNumber(step: number) {
        this.stepNumber = step;
    }

    // Validates the entire form or by step.
    validateForm(step: number = null): boolean {
        if (this.announcement.title.length < 10 && (step === 1 || step === null)) return false;
        if (this.announcement.description.length < 10 && (step === 1 || step === null)) return false;
        if (!((this.announcement.startDate instanceof Date) && (this.announcement.endDate instanceof Date)) && (step === 2 || step === null)) return false;
        if (!moment(this.announcement.startDate.toString()).isValid() && (step === 2 || step === null)) return false;
        if (!moment(this.announcement.endDate.toString()).isValid() && (step === 2 || step === null)) return false;
        if (this.announcement.endDate < this.announcement.startDate && (step === 2 || step === null)) return false;
        return true;
    }

    submitForm() {
        if (!this.validateForm()) {
            alert("This form has not been fully completed. Please confirm that all fields are filled in correctly and try again.");
        } else {
            this.success = true;
        }
    }

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.announcement.creatorName = this.authService.getUser().userName;
    }

}
