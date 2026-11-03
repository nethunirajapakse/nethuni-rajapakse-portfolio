/*
 * Hackathons, competitions and volunteering.
 */

export type Competition = {
  id: string;
  title: string;
  event: string;
  organiser: string;
  /** Short badge, e.g. a placement. Leave out when there is no result to claim. */
  result?: string;
  date?: string;
  team?: string;
  teammates?: string[];
  description: string;
  tags: string[];
  photos?: string[];
  /** "contain" shows the whole image (posters, certificates); default crops to fill. */
  photoFit?: "cover" | "contain";
};

export type Volunteering = {
  id: string;
  title: string;
  role: string;
  organiser: string;
  date: string;
  location?: string;
  description: string;
  tags: string[];
  photos?: string[];
  photoFit?: "cover" | "contain";
};

/** Newest first, roughly. */
export const competitions: Competition[] = [
  {
    id: "cre8x",
    title: "Cre8X 1.0",
    event: "Designathon",  
    organiser:
      "BCS Student Chapter · General Sir John Kotelawala Defence University",
    result: "Top 10 finalist",
    date: "September 7, 2024",
    team: "WuMing",
    teammates: ["Bhawanthi Weerasinghe", "Nuwani Samarakoon"],
    description:
      "AQUILA is a digital platform for eco-tourism and forest conservation. It gives explorers live forest conditions, smart ticket booking, safety alerts and personalised trail suggestions, and it can identify wildlife and plants with AI. Built with team WuMing for hikers, nature photographers, writers and safari enthusiasts.",
    tags: [
      "Forest monitoring",
      "Smart ticketing",
      "Safety alerts",
      "Trail recommendations",
      "AI wildlife ID",
      "Community tools",
    ],
    photos: ["/community/cre8x-certificate.jpg", "/community/cre8x-nethuni.jpg"],
    photoFit: "contain",
  },
  {
    id: "aces-coders",
    title: "ACES Coders 2024",
    event: "Competitive programming contest",
    organiser:
      "Department of Computer Engineering · University of Peradeniya",
    date: "2024",
    teammates: ["Chamod Weerasinghe", "Manoj Thilakarathna"],
    description:
      "A 12-hour overnight coding marathon against more than 100 teams from across Sri Lanka. Working through algorithmic problems with my team from evening until morning was intense, tiring and a wonderful experience in teamwork, endurance and problem solving.",
    tags: ["Competitive programming", "12-hour overnight", "Algorithms", "Teamwork"],
    photos: ["/community/aces-hall.jpg", "/community/aces-team.jpg"],
  },
];

export const volunteering: Volunteering[] = [
  {
    id: "yathra",
    title: "Yathra 2025",
    role: "Finance committee member & Event day coordinator",
    organiser: "Classical Music Society",
    date: "October 1, 2025",
    location: "Nelum Pokuna Theatre, Colombo",
    description:
      "Contributed to stage a large-scale classical music concert, \"The world's music converges in one cosmic symphony\". I worked on sponsorship hunting and event-day coordination, gaining experience in planning, organising, and financial management.",
    tags: ["Budgeting", "Event management", "Leadership", "Teamwork"],
    photos: ["/community/yathra-stage.jpg", "/community/yathra-finale.jpg"],
  },
  {
    id: "futurewave",
    title: "FutureWave Mission 3",
    role: "Organising committee member & Volunteer tutor",
    organiser: "Leo Club · University of Moratuwa (UoM Leos)",
    date: "October 25, 2023",
    location: "Welagedara Navodya Maha Vidyalaya, Kalutara",
    description:
      "A robotics and programming workshop for O/L and A/L students in underprivileged schools. About 140 students joined motivational talks, an introduction to computer hardware and microcontrollers, and hands-on robotics activities.",
    tags: ["Robotics", "Electronics", "Programming", "Outreach"],
    photos: ["/community/futurewave-group.jpg", "/community/futurewave-robotics.jpg"],
  },
  {
    id: "vrcade",
    title: "VRCade",
    role: "Finance committee member",
    organiser:
      "IEEE Industry Applications Society Student Chapter · University of Moratuwa",
    date: "September 27, 2023 · Term 22/23",
    location: "Old gymnasium, University of Moratuwa",
    description:
      "Helped organise VRCade, a virtual reality event, as part of the finance committee. Contributed to the event's financial planning and coordination.",
    tags: ["IEEE", "Finance", "Virtual reality"],
    photos: ["/community/vrcade-event.jpg", "/community/vrcade-finance-committee.jpg"],
  },
  {
    id: "moraforesight",
    title: "MoraForesight 1.0",
    role: "Finance committee member",
    organiser: "IEEE Student Branch · University of Moratuwa",
    date: "August 25–27, 2023 · Term 22/23",
    location: "Citrus Waskaduwa, Waskaduwa",
    description:
      "Served on the organising committee of a three-day programme for programming, robotics and entrepreneurship, giving outstanding students, picked from thousands of applicants, curated learning resources and mentorship.",
    tags: ["Programming", "Robotics", "Entrepreneurship", "Mentorship"],
    photos: [ "/community/moraforesight-venue.jpg", "/community/moraforesight-team.jpg", "/community/foresight-robotics.jpeg" ],
  },
];