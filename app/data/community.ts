/**
 * Hackathons, competitions and volunteering.
 *
 * Photos: drop image files into /public/community/ and list their paths in
 * the `photos` array of the matching entry, e.g.
 *   photos: ["/community/moraforesight-1.jpg", "/community/moraforesight-2.jpg"]
 * The first photo is the cover; clicking opens a viewer with all of them.
 * Entries without photos render as compact text-only cards.
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
    title: "AQUILA",
    event: "Cre8X Designathon",
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
    photos: ["/community/cre8x-certificate.jpg"],
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
      "Competed with a team of three against more than 100 teams from across Sri Lanka, solving algorithmic problems under time pressure.",
    tags: ["Competitive programming", "Algorithms", "Teamwork"],
    photos: ["/community/aces-team.jpg", "/community/aces-hall.jpg"],
  },
  {
    id: "moraxtreme",
    title: "MoraXtreme 9.0",
    event: "Competitive programming contest",
    organiser: "IEEE Student Branch · University of Moratuwa",
    team: "WuMing",
    description:
      "Took on challenging problems with team WuMing, sharpening competitive programming skills at the IEEE Student Branch's flagship contest.",
    tags: ["Competitive programming", "Problem solving", "Teamwork"],
    photos: [],
  },
];

export const volunteering: Volunteering[] = [
  {
    id: "yathra",
    title: "Yathra 2025",
    role: "Finance committee member & event day coordinator",
    organiser: "Classical Music Society",
    date: "October 1, 2025",
    location: "Nelum Pokuna Theatre, Colombo",
    description:
      "Helped stage a large-scale classical music concert, \"The world's music converges in one cosmic symphony\". I prepared the event budget and coordinated on the day, which taught me a lot about planning, organising and financial management.",
    tags: ["Budgeting", "Event management", "Leadership", "Teamwork"],
    photos: ["/community/yathra-stage.jpg", "/community/yathra-finale.jpg"],
  },
  {
    id: "futurewave",
    title: "FutureWave Mission 3",
    role: "Volunteer",
    organiser: "Leo Club · University of Moratuwa (UoM Leos)",
    date: "October 25",
    location: "Welagedara Navodya Maha Vidyalaya, Kalutara",
    description:
      "A robotics and programming workshop for O/L and A/L students in underprivileged schools. About 140 students joined motivational talks, an introduction to computer hardware and microcontrollers, and hands-on robotics activities.",
    tags: ["Robotics", "Electronics", "Programming", "Outreach"],
    photos: ["/community/futurewave-group.jpg", "/community/futurewave-robotics.jpg"],
  },
  // {
  //   id: "hackelite",
  //   title: "Hackelite 1.0",
  //   role: "Editorial committee member",
  //   organiser:
  //     "IEEE WIE Student Branch Affinity Group · University of Moratuwa",
  //   date: "IEEE WIE UoM",
  //   description:
  //     "Part of the editorial committee behind Hackelite 1.0, working with the organising team to run the event for its participants.",
  //   tags: ["IEEE WIE", "Editorial", "Teamwork"],
  //   photos: ["/community/hackelite-editorial.jpg"],
  //   photoFit: "contain",
  // },
  {
    id: "vrcade",
    title: "VRCade",
    role: "Finance committee member",
    organiser:
      "IEEE Industry Applications Society Student Chapter · University of Moratuwa",
    date: "September 27",
    description:
      "Helped bring a virtual reality event to life as a member of the finance committee.",
    tags: ["IEEE", "Finance", "Virtual reality"],
    photos: ["/community/vrcade-event.jpg", "/community/vrcade-finance-committee.jpg"],
  },
  {
    id: "moraforesight",
    title: "MoraForesight 1.0",
    role: "Finance committee member",
    organiser: "IEEE Student Branch · University of Moratuwa",
    date: "August 25–27 · Term 22/23",
    description:
      "Served on the organising committee of a three-day programme for programming, robotics and entrepreneurship, giving outstanding students, picked from thousands of applicants, curated learning resources and mentorship.",
    tags: ["Programming", "Robotics", "Entrepreneurship", "Mentorship"],
    photos: ["/community/moraforesight-team.jpg", "/community/moraforesight-venue.jpg"],
  },
];
