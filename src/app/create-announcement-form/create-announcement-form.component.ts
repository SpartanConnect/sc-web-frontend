import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';

import * as moment from 'moment';

interface AnnouncementInput {
    title: string;
    description: string;
    startDate: any;
    endDate: any;
    creatorName: string;
}

@Component({
  selector: 'app-create-announcement-form',
  templateUrl: './create-announcement-form.component.html',
  styleUrls: ['./create-announcement-form.component.scss']
})
export class CreateAnnouncementFormComponent implements OnInit {

    stepNumber: number = 1;
    stepError: number = 0;
    submitted: boolean = false;
    success: boolean = false;
    loading: boolean = false;


    announcement: AnnouncementInput = {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        creatorName: ''
    }

    // Activates when a person clicks 'Continue'
    addStepNumber(step: number) {
        console.log(this.stepNumber);
        if (!this.validateForm(step)) {
            this.stepError = step;
            return false;
        } else {
            this.stepError = 0;
            console.log(this.stepNumber);
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
        if (this.announcement.title.length < 10 && (step === 1 || step === null)) return false;
        else if (this.announcement.description.length < 10 && (step === 1 || step === null)) return false;
        else if (!((this.announcement.startDate instanceof Date) && (this.announcement.endDate instanceof Date)) && (step === 2 || step === null)) return false;
        else if (!moment(this.announcement.startDate.toString()).isValid() && (step === 2 || step === null)) return false;
        else if (!moment(this.announcement.endDate.toString()).isValid() && (step === 2 || step === null)) return false;
        else if (this.announcement.endDate < this.announcement.startDate && (step === 2 || step === null)) return false;
        else return true;
    }

    submitForm() {
        if (!this.validateForm()) {
            alert("This form has not been fully completed. Please confirm that all fields are filled in correctly and try again.");
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

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.announcement.creatorName = this.authService.getUser().userName;
    }

}
