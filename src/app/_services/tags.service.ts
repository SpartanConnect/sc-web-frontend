import { Injectable, OnInit } from '@angular/core';

import { Tag, MOCK_TAGS } from '../models/tag';

@Injectable()
export class TagsService implements OnInit {

    tags: Tag[];

    // Exposed getters for other components to use
    getTags(): Promise<Tag[]> {
        return new Promise((resolve) => {
            this.retrieveTags().then(() => {
                resolve(this.tags);
            });
        });
    }

    // This is an additional function that doesn't serve any other purpose
    // other than to demonstrate the power of array filtering.
    // If this serves any use, keep it.
    // IDEA: Delete this and incorporate it into getTags.
    getVisibleTags(): Promise<Tag[]> {
        return new Promise((resolve) => {
            this.retrieveTags().then(() => {
                resolve(this.tags.filter((tag) => tag.visible));
            });
        });
    }

    // Refreshing the service itself with new tags
    // TODO: Remove this and the tags array.
    retrieveTags(): Promise<Tag[]> {
        return new Promise((resolve) => {
            this.tags = MOCK_TAGS;                              // Replace with HTTP GET
            setTimeout(() => {resolve(this.tags)}, 1500);       // Artificial delay
        });
    }

    constructor() { }

    ngOnInit() {
        this.retrieveTags();
    }

}
