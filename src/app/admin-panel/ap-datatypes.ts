export enum AdminPanelPage {
    PAGE_OVERVIEW = 1,              // Default page with selectable options
    PAGE_USERS_ALL = 2,             // All users
    PAGE_USERS_UNAPPROVED = 3,
    PAGE_USERS_TEACHERS = 4,
    PAGE_TAGS_ALL = 5,
    PAGE_TAGS_CATEGORIES = 6,
    PAGE_ANNOUNCEMENTS_PENDING = 7,
    PAGE_ANNOUNCEMENTS_CURRENT = 8,
    PAGE_ANNOUNCEMENTS_TOTAL = 9
}
export enum AdminPanelActions {
    ACTION_ANNOUNCEMENT_APPROVE = 1,
    ACTION_ANNOUNCEMENT_DENY = 2,
    ACTION_ANNOUNCEMENT_SET_URGENT = 3,
    ACTION_USER_INVITE = 4,
    ACTION_USER_EDIT = 5
}
