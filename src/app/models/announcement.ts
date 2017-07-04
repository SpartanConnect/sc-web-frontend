export class Announcement {
    id: number;
    title: string;
    description: string;
    creatorId: number;
    approverId: number;
    startDate: string;              // TODO: change this to native Date js object
    endDate: string;                // TODO: change this to native Date js object
    urgent: boolean;
    approved: number;
    timeSubmitted: string;
    timeApproved: string;
    timeEdited: string;
}

// Temporary array of mock announcements
// In the future, we want a service that retrieves it from our API and
// converts it to an Announcement object
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
    {
        id: 1,
        title: "Korean Honor Society",
        description: "Ahn Nyung Ha Sae Yo! La Canada High School will begin the Korean Honor Society program this year. We have an induction ceremony next Wednesday (5/24) during lunchtime in Ms. Lee's classroom, room 620. Every Korean Honor Society member should attend this ceremony to receive the certificate and pin. Gimbob will be provided.",
        creatorId: 1,
        approverId: 1,
        startDate: "2017-04-30",
        endDate: "2017-08-31",
        urgent: false,
        approved: 0,
        timeSubmitted: "2017-03-31 05:06:01",
        timeApproved: "2017-03-31 05:06:01",
        timeEdited: "2017-03-31 05:06:01",
    }
]
