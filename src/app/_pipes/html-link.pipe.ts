import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'htmlLink'
})
export class HtmlLinkPipe implements PipeTransform {
    transform(value: string, ...args: any[]): string {
        const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        return value.replace(urlRegex, `<a href="` + (/^https?:\/\//i.test(value) ? '' : 'http://') + `$&">$&</a>`);
    }
}
