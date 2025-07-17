// src/data/projects.ts

export type Project = {
  id: number;
  title: string;
  type: 'NARRATIVE' | 'COMMERCIAL' | 'MUSIC VIDEO';
  thumbnailUrl: string; // Static image URL
  gifUrl: string;       // GIF URL for hover effect
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Doritos Mortis',
    type: 'COMMERCIAL',
    thumbnailUrl: 'https://placehold.co/400x225/222222/bbbbbb?text=Doritos+Thumb',
    gifUrl: 'https://placehold.co/400x225/222222/bbbbbb/gif?text=Doritos+GIF',
  },
  {
    id: 2,
    title: 'Graywind Blinds',
    type: 'COMMERCIAL',
    thumbnailUrl: 'https://placehold.co/400x225/333333/cccccc?text=Graywind+Thumb',
    gifUrl: 'https://placehold.co/400x225/333333/cccccc/gif?text=Graywind+GIF',
  },
  {
    id: 3,
    title: 'Nigaam Jewels',
    type: 'COMMERCIAL',
    thumbnailUrl: 'https://placehold.co/400x225/444444/dddddd?text=Nigaam+Thumb',
    gifUrl: 'https://placehold.co/400x225/444444/dddddd/gif?text=Nigaam+GIF',
  },
  {
    id: 4,
    title: 'I, Chinese',
    type: 'NARRATIVE',
    thumbnailUrl: 'https://placehold.co/400x225/555555/eeeeee?text=Chinese+Thumb',
    gifUrl: 'https://placehold.co/400x225/555555/eeeeee/gif?text=Chinese+GIF',
  },
  {
    id: 5,
    title: "Damien's Gym",
    type: 'NARRATIVE',
    thumbnailUrl: 'https://placehold.co/400x225/666666/ffffff?text=Damiens+Gym+Thumb',
    gifUrl: 'https://placehold.co/400x225/666666/ffffff/gif?text=Damiens+Gym+GIF',
  },
  {
    id: 6,
    title: 'BONGO',
    type: 'NARRATIVE',
    thumbnailUrl: 'https://placehold.co/400x225/777777/aaaaaa?text=Bongo+Thumb',
    gifUrl: 'https://placehold.co/400x225/777777/aaaaaa/gif?text=Bongo+GIF',
  },
  {
    id: 7,
    title: 'Pass Go - Jordan Webb',
    type: 'MUSIC VIDEO',
    thumbnailUrl: 'https://placehold.co/400x225/888888/bbbbbb?text=Pass+Go+Thumb',
    gifUrl: 'https://placehold.co/400x225/888888/bbbbbb/gif?text=Pass+Go+GIF',
  },
  {
    id: 8,
    title: 'Back to Sender - Zyodara ft. Yasmina',
    type: 'MUSIC VIDEO',
    thumbnailUrl: 'https://placehold.co/400x225/999999/cccccc?text=Sender+Thumb',
    gifUrl: 'https://placehold.co/400x225/999999/cccccc/gif?text=Sender+GIF',
  },
  {
    id: 9,
    title: 'More - Jordan Webb ft. Lucy Northern',
    type: 'MUSIC VIDEO',
    thumbnailUrl: 'https://placehold.co/400x225/AAAAAA/dddddd?text=More+Thumb',
    gifUrl: 'https://placehold.co/400x225/AAAAAA/dddddd/gif?text=More+GIF',
  },
  {
    id: 10,
    title: 'Neon Dreams',
    type: 'NARRATIVE',
    thumbnailUrl: 'https://placehold.co/400x225/BBBBBB/eeeeee?text=Neon+Thumb',
    gifUrl: 'https://placehold.co/400x225/BBBBBB/eeeeee/gif?text=Neon+GIF',
  },
  {
    id: 11,
    title: 'Urban Pulse',
    type: 'COMMERCIAL',
    thumbnailUrl: 'https://placehold.co/400x225/CCCCCC/bbbbbb?text=Urban+Thumb',
    gifUrl: 'https://placehold.co/400x225/CCCCCC/bbbbbb/gif?text=Urban+GIF',
  },
  {
    id: 12,
    title: 'Echoes in the Dark',
    type: 'MUSIC VIDEO',
    thumbnailUrl: 'https://placehold.co/400x225/DDDDDD/aaaaaa?text=Echoes+Thumb',
    gifUrl: 'https://placehold.co/400x225/DDDDDD/aaaaaa/gif?text=Echoes+GIF',
  },
];