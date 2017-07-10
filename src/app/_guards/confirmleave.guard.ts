import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface ComponentCanDeactivate {
    canDeactivate: () => boolean;
}

@Injectable()
export class ConfirmLeaveGuard implements CanDeactivate<ComponentCanDeactivate> {
    canDeactivate(component: ComponentCanDeactivate): boolean {
        if (component.canDeactivate()) {
            return true;
        } else {
            return confirm('Are you sure you want to navigate away from this page? Any unsaved changes will be lost.');
        }
    }
}
