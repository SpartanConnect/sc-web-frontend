import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';

export const API_BASE = environment.apiUrl;

export function httpHandler(http, apiLink) {
    return http.get(apiLink)
        .toPromise()
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
            return err.json();
        });
};
