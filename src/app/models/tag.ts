export class Tag {
    id: number;
    name: string;
    slug: string;
    visible: boolean;
    minUserLevelAssign: number;
    minUserLevelRequest: number;
    parentId?: number;
    isCritical: boolean;
};

export const MOCK_TAGS: Tag[] = [
    {
        id: 1,
        name: "ASB",
        slug: "asb",
        visible: true,
        isCritical: false,
        minUserLevelAssign: 3,
        minUserLevelRequest: 3
    },
    {
        id: 2,
        name: "Sports",
        slug: "sports",
        visible: true,
        isCritical: false,
        minUserLevelAssign: 3,
        minUserLevelRequest: 3
    },
    {
        id: 3,
        name: "Clubs",
        slug: "asb",
        visible: true,
        isCritical: false,
        minUserLevelAssign: 3,
        minUserLevelRequest: 3
    },
    {
        id: 4,
        name: "Counseling",
        slug: "counseling",
        visible: true,
        isCritical: false,
        minUserLevelAssign: 3,
        minUserLevelRequest: 3
    },
    {
        id: 5,
        name: "General",
        slug: "general",
        visible: true,
        isCritical: false,
        minUserLevelAssign: 3,
        minUserLevelRequest: 3
    },
    {
        id: 6,
        name: "Grade 7",
        slug: "grade-7",
        visible: false,
        isCritical: true,
        minUserLevelAssign: 3,
        minUserLevelRequest: 3
    },
    {
        id: 7,
        name: "Grade 8",
        slug: "grade-8",
        visible: false,
        isCritical: true,
        minUserLevelAssign: 3,
        minUserLevelRequest: 3
    },
    {
        id: 8,
        name: "Grade 9",
        slug: "grade-9",
        visible: false,
        isCritical: true,
        minUserLevelAssign: 3,
        minUserLevelRequest: 3
    },
    {
        id: 9,
        name: "Grade 10",
        slug: "grade-10",
        visible: false,
        isCritical: true,
        minUserLevelAssign: 3,
        minUserLevelRequest: 3
    },
    {
        id: 10,
        name: "Grade 11",
        slug: "grade-11",
        visible: false,
        isCritical: true,
        minUserLevelAssign: 3,
        minUserLevelRequest: 3
    },
    {
        id: 11,
        name: "Grade 12",
        slug: "grade-12",
        visible: false,
        isCritical: true,
        minUserLevelAssign: 3,
        minUserLevelRequest: 3
    },
    {
        id: 12,
        name: "Spartan Connect",
        slug: "spartan-connect",
        visible: true,
        isCritical: false,
        minUserLevelAssign: 3,
        minUserLevelRequest: 3
    },
    {
        id: 13,
        name: "Private Channel",
        slug: "private",
        visible: true,
        isCritical: false,
        minUserLevelAssign: 3,
        minUserLevelRequest: 3
    }
];
