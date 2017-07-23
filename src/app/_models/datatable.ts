import { ITdDataTableColumn } from '@covalent/core';

export const ANNOUNCEMENT_COLUMNS: ITdDataTableColumn[] = [
    {name: 'title', label: "Title"},
    {name: 'description', label: 'Description'},
    {name: 'creator.name', label: 'Author'},
    {name: 'tags', label: 'Tags'}
];

export const TAG_COLUMNS: ITdDataTableColumn[] = [
    {name: 'id', label: "ID", numeric: true},
    {name: 'name', label: "Name"},
    {name: 'slug', label: 'Text Identifier'}
];

export const USER_COLUMNS: ITdDataTableColumn[] = [
    {name: 'name', label: "Name"},
    {name: 'handle', label: 'Handle'},
    {name: 'email', label: 'Email'},
    {name: 'rank', label: 'Rank', numeric: true},
    {name: 'lastLogin', label: 'Last Login'}
];
