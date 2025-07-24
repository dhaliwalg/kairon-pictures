export const teamMembersData = [
  // Press & Careers
  {
    id: 100,
    name: "press@pulsefilms.com",
    title: "PRESS",
    category: "Contact",
  },
  {
    id: 101,
    name: "cv@pulsefilms.com",
    title: "CAREERS",
    address: "12910 Culver Blvd Suite I, Los Angeles, CA 90066",
    category: "Contact",
  },

  // Executive Leadership Team
  {
    id: 1,
    name: "Jamie Hall",
    title: "COO (SCRIPTED)",
    category: "Executive Leadership Team",
  },
  {
    id: 2,
    name: "Colin Waters",
    title: "CFO",
    category: "Executive Leadership Team",
  },
  {
    id: 3,
    name: "Samira Sorzano",
    title: "GLOBAL HEAD OF PR",
    category: "Executive Leadership Team",
  },

  // Commercials & Music Videos
  {
    id: 4,
    name: "Mino Jarjoura",
    title: "GLOBAL PRESIDENT, COMMERCIALS & MVS",
    category: "Commercials & Music Videos",
  },
  {
    id: 5,
    name: "Casey Engelhardt",
    title: "EXECUTIVE PRODUCER",
    category: "Commercials & Music Videos",
  },
  {
    id: 6,
    name: "Rik Green",
    title: "GLOBAL HEAD OF MUSIC VIDEOS",
    category: "Commercials & Music Videos",
  },
  {
    id: 7,
    name: "Gregorio Back",
    title: "STAFF PRODUCTION MANAGER",
    category: "Commercials & Music Videos",
  },

  // Sales
  { id: 8, name: "Stephanie Stephens", title: "SALES", category: "Sales" },
  {
    id: 9,
    name: "Claire Allman",
    title: "WEST COAST SALES",
    category: "Sales",
  },
  { id: 10, name: "Robert Mueller", title: "JOANNA MILLER", category: "Sales" }, // Typo in source: "Joanna Miller" is likely a name, not a title for Robert Mueller. Keeping as is for now.
  {
    id: 11,
    name: "Camille SemprEZ",
    title: "MUSIC VIDEO SALES",
    category: "Sales",
  },

  // Film & Scripted TV
  {
    id: 12,
    name: "Bianca Gavin",
    title: "HEAD OF PRODUCTION",
    category: "Film & Scripted TV",
  },
  {
    id: 13,
    name: "Oskar Pimlott",
    title: "PRODUCER, FILM",
    category: "Film & Scripted TV",
  },

  // Non-Fiction
  {
    id: 14,
    name: "Alice Rhodes",
    title: "EXECUTIVE PRODUCER, MUSIC DOCUMENTARIES",
    category: "Non-Fiction",
  },
  {
    id: 15,
    name: "Joe Ingham",
    title: "HEAD OF DEVELOPMENT, UNSCRIPTED",
    category: "Non-Fiction",
  },
];

export type TeamMember = {
  id: number;
  name: string;
  title: string;
  category?: string;
  address?: string;
};
