import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'htmlLink'
})
export class HtmlLinkPipe implements PipeTransform {
    transform(value: string, ...args: any[]): string {
        let newValue = value;
        const httpRegex = /(http(s)?:\/\/)/g;
        const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        const noEmailRegex = /(ht|f)tp(s?):\/{2}(www\.)?([a-z0-9-]+\.)?([a-z0-9-]+\.)?([a-z]{2,4})([a-zA-Z0-9\.\/?&=_#-]*)/g;

        // Remove http(s?) and add http:// again
        // newValue = newValue.replace(httpRegex, ``);

        // newValue = newValue.replace(urlRegex, `<a href="//$&">http://$&</a>`);
        newValue = newValue.replace(noEmailRegex, `<a href="$&">$&</a>`);
        return newValue;
    }
}
