import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'htmlLink'
})
export class HtmlLinkPipe implements PipeTransform {
    transform(value: string, ...args: any[]): string {
        let newValue = value;

        // tslint:disable:max-line-length
        const noEmailRegex = /(ht|f)tp(s?):\/{2}(www\.)?([a-z0-9-]+\.)?([a-z0-9-]+\.)?([a-z]{2,4})([a-zA-Z0-9\.\/?&=_#-]*)/g;
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

        // Remove http(s?) and add http:// again
        newValue = newValue.replace(noEmailRegex, `<a href="$&">$&</a>`);
        newValue = newValue.replace(emailRegex, `<a href="mailto:$&">$&</a>`);
        return newValue;
    }
}
