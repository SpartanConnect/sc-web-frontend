import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Tag } from '../models/tag';
import { API_BASE, httpHandler } from '../models/api';

@Injectable()
export class TagsService implements OnInit {

    tags: Tag[];

    // Exposed getters for other components to use
    getTags(): Promise<Tag[]> {
        const apiLink = `${API_BASE}/tags`;
        return httpHandler(this.http, apiLink);
    }

    // This is an additional function that doesn't serve any other purpose
    // other than to demonstrate the power of array filtering.
    // If this serves any use, keep it.
    // IDEA: Delete this and incorporate it into getTags.
    getVisibleTags(): Promise<Tag[]> {
        const apiLink = `${API_BASE}/tags?visibility=1`;
        return httpHandler(this.http, apiLink);
    }

    getCategories(): Promise<Tag[]> {
        const apiLink = `${API_BASE}/tags?visibility=1&parentId=0`;
        return httpHandler(this.http, apiLink);
    }

    constructor(private http: Http) { }

    ngOnInit() {}

}
