export type Member = {
  usn: string;
  name: string;
  role: string;
  year: string;
  email: string;
};

export const club = {
  name: "WICOMM",
  parent: "ACSA",
  tagline: "The technical wing of ACSA.",
  description:
    "We’re WICOMM, ACSA’s technical sub-club. A place for curious minds to explore embedded boards, write code, and bring hardware to life.",
};

export const rosterSections = [
  { title: "Leadership", roles: ["President"] },
  { title: "Projects", roles: ["Project Head"] },
  { title: "Technical", roles: ["Technical Head", "Technical Co-head"] },
  {
    title: "Social media",
    roles: ["Social Media Head", "Social Media Co-head"],
  },
  { title: "Treasury", roles: ["Treasurer", "Joint Treasurer"] },
  { title: "Secretariat", roles: ["Secretary"] },
  { title: "Events", roles: ["Event Management"] },
] as const;

export function membersInSection(roles: readonly string[]) {
  return members.filter((m) => roles.includes(m.role));
}

export const members: Member[] = [
  {
    usn: "NNM23AC034",
    name: "Md Farhan Riaz",
    role: "President",
    year: "4th year",
    email: "mohammedfarhanriaz@gmail.com",
  },
  {
    usn: "NNM23AC008",
    name: "Avinash Shetty",
    role: "Project Head",
    year: "4th year",
    email: "nnm23ac008@nmamit.in",
  },
  {
    usn: "NNM23AC002",
    name: "Adwaith H U",
    role: "Technical Head",
    year: "4th year",
    email: "nnm23ac002@nmamit.in",
  },
  {
    usn: "NNM25AC502",
    name: "Jostan Saldanha",
    role: "Technical Co-head",
    year: "3rd year",
    email: "jostansaldanha58@gmail.com",
  },
  {
    usn: "NNM24AC008",
    name: "Anish Kumar",
    role: "Technical Co-head",
    year: "3rd year",
    email: "anish2k6rao@gmail.com",
  },
  {
    usn: "NNM23AC024",
    name: "H S Adithyashyama",
    role: "Social Media Head",
    year: "4th year",
    email: "adithyashyama2005@gmail.com",
  },
  {
    usn: "NNM24AC028",
    name: "Mayur Kharvi",
    role: "Social Media Co-head",
    year: "3rd year",
    email: "mayurkharvi13@gmail.com",
  },
  {
    usn: "NNM24AC035",
    name: "Pratham B",
    role: "Social Media Co-head",
    year: "3rd year",
    email: "nnm24ac035@nmamit.in",
  },
  {
    usn: "NNM23AC017",
    name: "Deekshith H Poojary",
    role: "Treasurer",
    year: "4th year",
    email: "nnm23ac017@nmamit.in",
  },
  {
    usn: "NNM24AC007",
    name: "Alden Noronha",
    role: "Joint Treasurer",
    year: "3rd year",
    email: "aldennoronhaschool@gmail.com",
  },
  {
    usn: "NNM24AC015",
    name: "Deekshith M G",
    role: "Secretary",
    year: "3rd year",
    email: "deekshithd154@gmail.com",
  },
  {
    usn: "NNM23AC042",
    name: "Pramith",
    role: "Event Management",
    year: "4th year",
    email: "nnm23ac042@nmamit.in",
  },
  {
    usn: "NNM24AC505",
    name: "Pranjal Bangera",
    role: "Event Management",
    year: "4th year",
    email: "pranjalbangera19@gmail.com",
  },
];

export function getMemberByUsn(usn: string) {
  const key = usn.trim().toUpperCase();
  return members.find((m) => m.usn.toUpperCase() === key) ?? null;
}

export const siteOrigin = "https://wicomm.in";

export function memberPhotoSrc(usn: string) {
  return `/profile/team/${usn.trim().toUpperCase()}.webp`;
}

export function memberProfileUrl(usn: string) {
  return `${siteOrigin}/team/u/${usn.trim().toUpperCase()}`;
}

export function memberQrFileName(name: string) {
  return `${name.trim().replace(/\s+/g, "-")}.png`;
}

export function memberQrSrc(name: string) {
  return `/qr/${memberQrFileName(name)}`;
}
