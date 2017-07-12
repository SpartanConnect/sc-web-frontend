export class User {
    id: number;
    name: string;
    email: string;
    handle: string;
    rank: number;
    lastLogin: Date;
}

export const MOCK_USERS: User[] = [
    {
        id: 1,
        name: "Zhang Caoli",
        email: "zcaoli@notlcusd.net",
        handle: "zcaoli",
        rank: 0,
        lastLogin: new Date(1995, 11, 17, 3, 24, 0)
    },
    {
        id: 2,
        name: "Yankie Theloxas O. Dory",
        email: "dory@notlcusd.net",
        handle: "ythodory",
        rank: 0,
        lastLogin: new Date(2007, 3, 14, 3, 24, 0)
    },
    {
        id: 3,
        name: "Hedoku Taichi",
        email: "htaichi@notlcusd.net",
        handle: "htaichi",
        rank: 0,
        lastLogin: new Date(2015, 6, 25, 3, 24, 0)
    },
    {
        id: 4,
        name: "Horizon Berlot",
        email: "hberlot@notlcusd.net",
        handle: "sirberlot",
        rank: 0,
        lastLogin: new Date(2016, 12, 25, 3, 24, 0)
    },
    {
        id: 5,
        name: "Cardigal Nartovich",
        email: "cnartovich@notlcusd.net",
        handle: "cnartovich",
        rank: 0,
        lastLogin: new Date(2017, 2, 23, 3, 24, 0)
    },
    {
        id: 6,
        name: "Mathias Elliot the II of Thaxoria",
        email: "me2thx@notlcusd.net",
        handle: "me2thx",
        rank: 0,
        lastLogin: new Date(2017, 5, 13, 3, 24, 0)
    },
    {
        id: 7,
        name: "Jamie Lewsadder",
        email: "jlewsadder@lcusd.net",
        handle: "jlewsadder",
        rank: 0,
        lastLogin: new Date(2017, 11, 17, 3, 24, 0)
    },
    {
        id: 8,
        name: "The Joker",
        email: "joker@notlcusd.net",
        handle: "ulostzgame",
        rank: 0,
        lastLogin: new Date(1984, 1, 13, 1, 0, 3)
    },
];
