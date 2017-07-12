import { Headers, Http } from '@angular/http';

export const API_BASE = "https://apisc.encadyma.com/";

export function httpHandler(http, apiLink) {
    return http.get(apiLink)
        .toPromise()
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
        });
};
