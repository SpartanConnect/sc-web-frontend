import {User} from './user';
import {Tag} from './tag';

export class Announcement {
    id: number;
    title: string;
    description: string;

    startDate: Date;
    endDate: Date;

    timeSubmitted: Date;
    timeApproved: Date;
    timeEdited: Date;

    urgent: boolean;
    status: number;

    creator: User;
    admin: User;

    tags: Tag[];
};

// Temporary array of mock announcements
// In the future, we want a service that retrieves it from our API and
// converts it to an Announcement object
/*
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
    {
        id: 1,
        title: "Korean Honor Society",
        description: "Ahn Nyung Ha Sae Yo! La Canada High School will begin the Korean Honor Society program this year. We have an induction ceremony next Wednesday (5/24) during lunchtime in Ms. Lee's classroom, room 620. Every Korean Honor Society member should attend this ceremony to receive the certificate and pin. Gimbob will be provided.",
        creatorId: 1,
        approverId: 1,
        startDate: new Date("2017-04-30"),
        endDate: new Date("2017-08-31"),
        urgent: false,
        status: 0,
        timeSubmitted: "2017-03-31 05:06:01",
        timeApproved: "2017-03-31 05:06:01",
        timeEdited: "2017-03-31 05:06:01",
        author: "Hedoku Taichi",
        tagsString: "Clubs",
    },
    {
        id: 2,
        title: "Lost and Found",
        description: "If you have lost anything, please come check the Lost and Found in the health office (room 111) for any missing items by 1 PM, Thursday, June 1st. All unclaimed items will be donated to charity.",
        creatorId: 1,
        approverId: 1,
        startDate: new Date("2017-04-30"),
        endDate: new Date("2017-08-31"),
        urgent: false,
        status: 0,
        timeSubmitted: "2017-03-31 05:06:01",
        timeApproved: "2017-03-31 05:06:01",
        timeEdited: "2017-03-31 05:06:01",
        author: "Hedoku Taichi",
        tagsString: "Clubs",
    },
    {
        id: 3,
        title: "Victory! Congrats LC Varsity Hockey Team!",
        description: "Congratulations the LC Varsity Hockey Team! They secured first place in their division with a 5-3 victory over Venice, and will return to the playoffs for the second consecutive year. I would also like to congratulate the Junior Varsity team who showed tremendous improvement throughout the season. Go Spartans!",
        creatorId: 1,
        approverId: 1,
        startDate: new Date("2017-04-30"),
        endDate: new Date("2017-08-31"),
        urgent: false,
        status: 0,
        timeSubmitted: "2017-03-31 05:06:01",
        timeApproved: "2017-03-31 05:06:01",
        timeEdited: "2017-03-31 05:06:01",
        author: "Hedoku Taichi",
        tagsString: "Clubs",
    },
    {
        id: 4,
        title: "North Gym Lunch: Vertigo!",
        description: "Come watch Vertigo (Ava Salzman, Caroline Daniels and Zach Northrop) play at lunch in front of the North Gym TODAY. They will be playing covers and originals. Also, Henry Vaughn and Jordan Stroud will be featured on trumpet and saxophone. Come out and support!",
        creatorId: 1,
        approverId: 1,
        startDate: new Date("2017-04-30"),
        endDate: new Date("2017-08-31"),
        urgent: false,
        status: 0,
        timeSubmitted: "2017-03-31 05:06:01",
        timeApproved: "2017-03-31 05:06:01",
        timeEdited: "2017-03-31 05:06:01",
        author: "Hedoku Taichi",
        tagsString: "Clubs",
    },
    {
        id: 5,
        title: "Omega Yearbooks: Seniors!",
        description: "Omega Yearbooks are here! SENIORS ONLY, if you prepaid for you book, please pick up your book during lunch and after school today in the space between the bungalows and the art room. This is the only distribution time this week for seniors. Seniors, didn't pre-order? You can buy a yearbook for $150 CASH at lunch.",
        creatorId: 1,
        approverId: 1,
        startDate: new Date("2017-04-30"),
        endDate: new Date("2017-08-31"),
        urgent: false,
        status: 0,
        timeSubmitted: "2017-03-31 05:06:01",
        timeApproved: "2017-03-31 05:06:01",
        timeEdited: "2017-03-31 05:06:01",
        author: "Hedoku Taichi",
        tagsString: "Clubs",
    },
    {
        id: 6,
        title: "Senior Salute",
        description: "Attention Seniors! Tomorrow is Senior Salute! We are excited to spend the entire day celebrating all of your hard work, achievements and showcasing your special talents. Make sure you are here at school and taking part in the celebration!",
        creatorId: 1,
        approverId: 1,
        startDate: new Date("2017-04-30"),
        endDate: new Date("2017-08-31"),
        urgent: false,
        status: 0,
        timeSubmitted: "2017-03-31 05:06:01",
        timeApproved: "2017-03-31 05:06:01",
        timeEdited: "2017-03-31 05:06:01",
        author: "Hedoku Taichi",
        tagsString: "Clubs",
    },
    {
        id: 7,
        title: "LC Baseball",
        description: "Come out and support the LC Baseball team vs Lompoc today at 3:15 PM at the Varsity Baseball Field and the LC Softball team vs Arroyo at 3:15 PM at the Varsity Softball Field. Both teams open up CIF Playoffs today as undefeated Rio Hondo League Champs!",
        creatorId: 1,
        approverId: 1,
        startDate: new Date("2017-04-30"),
        endDate: new Date("2017-08-31"),
        urgent: false,
        status: 0,
        timeSubmitted: "2017-03-31 05:06:01",
        timeApproved: "2017-03-31 05:06:01",
        timeEdited: "2017-03-31 05:06:01",
        author: "Hedoku Taichi",
        tagsString: "Clubs",
    },
    {
        id: 8,
        title: "Join Drumline!",
        description: "For our next announcement, drumroll please….Are you interested in joining Drumline? If so, come to the band room, room 106, on Monday, May 22nd and Tuesday, May 23rd! Mallet instrument workshops will be this week on Friday, directly after school. You will get the opportunity to play on different types of percussive instruments such as drums and xylophones. Absolutely no musical experience is required, so anyone can come to the band room on Monday and Tuesday next week from 5:30-8:30pm! Hope to see y’all there!",
        creatorId: 1,
        approverId: 1,
        startDate: new Date("2017-04-30"),
        endDate: new Date("2017-08-31"),
        urgent: false,
        status: 1,
        timeSubmitted: "2017-03-31 05:06:01",
        timeApproved: "2017-03-31 05:06:01",
        timeEdited: "2017-03-31 05:06:01",
        author: "Hedoku Taichi",
        tagsString: "Clubs",
    },
    {
        id: 9,
        title: "Movie Night @ the Deck!",
        description: "Love the pool, love the movies? What about Movie Night Under the Stars on May 19th at 7pm on the Spartan pool deck? Tickets are on sale now for $5 presale, which includes chips and a hot dog. Buy now from any swim team member! If you have any questions contact Mrs. Kalb or any swim team member.",
        creatorId: 1,
        approverId: 1,
        startDate: new Date("2017-04-30"),
        endDate: new Date("2017-08-31"),
        urgent: false,
        status: 1,
        timeSubmitted: "2017-03-31 05:06:01",
        timeApproved: "2017-03-31 05:06:01",
        timeEdited: "2017-03-31 05:06:01",
        author: "Hedoku Taichi",
        tagsString: "Clubs",
    }
];
*/
