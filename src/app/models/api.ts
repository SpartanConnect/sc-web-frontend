import { Headers, Http, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { environment } from '../../environments/environment';

export const API_BASE = environment.apiUrl;

export function httpHandler(http, apiLink, queryData = {}) {
    const httpOptions: RequestOptionsArgs = new RequestOptions({
        withCredentials: true
    });
    return http.get(apiLink, httpOptions)
        .toPromise()
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
            return err.json();
        });
};
