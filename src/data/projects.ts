// src/data/projects.ts

export type Project = {
  id: number; // Keep id as number
  title: string;
  type: 'NARRATIVE' | 'COMMERCIAL' | 'MUSIC VIDEO';
  thumbnailUrl: string; // Static image URL
  gifUrl: string;       // GIF URL for hover effect
  vimeoId?: string;     // Added: Optional Vimeo video ID
  description?: string; // Added: Optional project description
  crew?: { role: string; name: string }[]; // Added: Optional array for cast/crew
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Doritos Mortis',
    type: 'COMMERCIAL',
    thumbnailUrl: 'https://placehold.co/400x225/222222/bbbbbb?text=Doritos+Thumb',
    gifUrl: 'https://placehold.co/400x225/222222/bbbbbb/gif?text=Doritos+GIF',
    vimeoId: '984534888', // <-- REPLACE with actual Vimeo ID
    description: 'A thrilling commercial for Doritos that brings a spooky twist to snack time. This project showcases our ability to blend humor with high-production value, creating memorable content that resonates with audiences.',
    crew: [
      { role: 'Director', name: 'Ava Chen' },
      { role: 'Producer', name: 'Ben Carter' },
      { role: 'D.P.', name: 'Chris Lee' },
      { role: 'Editor', name: 'Dana Evans' },
    ],
  },
  {
    id: 2,
    title: 'Graywind Blinds',
    type: 'COMMERCIAL',
    thumbnailUrl: 'https://placehold.co/400x225/333333/cccccc?text=Graywind+Thumb',
    gifUrl: 'https://placehold.co/400x225/333333/cccccc/gif?text=Graywind+GIF',
    vimeoId: '984534889', // <-- REPLACE with actual Vimeo ID
    description: 'An elegant commercial showcasing the innovative features and sleek design of Graywind Blinds. We focused on clean aesthetics and smooth transitions to highlight the product\'s modern appeal and ease of use.',
    crew: [
      { role: 'Director', name: 'Ethan Foster' },
      { role: 'D.P.', name: 'Grace Hill' },
      { role: 'Client Lead', name: 'Hannah Ives' },
    ],
  },
  {
    id: 3,
    title: 'Nigaam Jewels',
    type: 'COMMERCIAL',
    thumbnailUrl: 'https://placehold.co/400x225/444444/dddddd?text=Nigaam+Thumb',
    gifUrl: 'https://placehold.co/400x225/444444/dddddd/gif?text=Nigaam+GIF',
    vimeoId: '984534890', // <-- REPLACE with actual Vimeo ID
    description: 'A luxurious commercial for Nigaam Jewels, emphasizing the exquisite craftsmanship and timeless beauty of their collections. We aimed for a sophisticated visual style to reflect the brand\'s prestige.',
    crew: [
      { role: 'Director', name: 'Isaac King' },
      { role: 'Jewelry Specialist', name: 'Julia Lim' },
      { role: 'Sound Design', name: 'Kyle Meng' },
    ],
  },
  {
    id: 4,
    title: 'I, Chinese',
    type: 'NARRATIVE',
    thumbnailUrl: 'https://placehold.co/400x225/555555/eeeeee?text=Chinese+Thumb',
    gifUrl: 'https://placehold.co/400x225/555555/eeeeee/gif?text=Chinese+GIF',
    vimeoId: '984534891', // <-- REPLACE with actual Vimeo ID
    description: 'A powerful narrative short film exploring themes of cultural identity and belonging within the Chinese diaspora. The film delves into personal journeys and societal expectations.',
    crew: [
      { role: 'Director', name: 'Lena Nguyen' },
      { role: 'Writer', name: 'Mark Olson' },
      { role: 'Lead Actor', name: 'Nina Patel' },
    ],
  },
  {
    id: 5,
    title: "Damien's Gym",
    type: 'NARRATIVE',
    thumbnailUrl: 'https://placehold.co/400x225/666666/ffffff?text=Damiens+Gym+Thumb',
    gifUrl: 'https://placehold.co/400x225/666666/ffffff/gif?text=Damiens+Gym+GIF',
    vimeoId: '984534892', // <-- REPLACE with actual Vimeo ID
    description: 'A gritty short film set in the world of underground boxing, following a young fighter\'s struggle for redemption. The raw visuals and intense performances capture the spirit of the gym.',
    crew: [
      { role: 'Director', name: 'Oscar Perry' },
      { role: 'Cinematographer', name: 'Quinn Roberts' },
      { role: 'Stunt Coordinator', name: 'Sara Thompson' },
    ],
  },
  {
    id: 6,
    title: 'BONGO',
    type: 'NARRATIVE',
    thumbnailUrl: 'https://placehold.co/400x225/777777/aaaaaa?text=Bongo+Thumb',
    gifUrl: 'https://placehold.co/400x225/777777/aaaaaa/gif?text=Bongo+GIF',
    vimeoId: '984534893', // <-- REPLACE with actual Vimeo ID
    description: 'A whimsical and heartwarming narrative about an unexpected friendship formed over a shared love for music. "BONGO" is a testament to the power of connection and rhythm.',
    crew: [
      { role: 'Director', name: 'Victor Ung' },
      { role: 'Composer', name: 'Wendy Volkov' },
      { role: 'Production Designer', name: 'Xavier Young' },
    ],
  },
  {
    id: 7,
    title: 'Pass Go - Jordan Webb',
    type: 'MUSIC VIDEO',
    thumbnailUrl: 'https://placehold.co/400x225/888888/bbbbbb?text=Pass+Go+Thumb',
    gifUrl: 'https://placehold.co/400x225/888888/bbbbbb/gif?text=Pass+Go+GIF',
    vimeoId: '984534894', // <-- REPLACE with actual Vimeo ID
    description: 'The official music video for Jordan Webb\'s hit "Pass Go," featuring dynamic visuals and captivating choreography. The video captures the vibrant energy of the track.',
    crew: [
      { role: 'Director', name: 'Yara Zaki' },
      { role: 'Choreographer', name: 'Zoe Allen' },
      { role: 'Artist', name: 'Jordan Webb' },
    ],
  },
  {
    id: 8,
    title: 'Back to Sender - Zyodara ft. Yasmina',
    type: 'MUSIC VIDEO',
    thumbnailUrl: 'https://placehold.co/400x225/999999/cccccc?text=Sender+Thumb',
    gifUrl: 'https://placehold.co/400x225/999999/cccccc/gif?text=Sender+GIF',
    vimeoId: '984534895', // <-- REPLACE with actual Vimeo ID
    description: 'A visually stunning music video for "Back to Sender," a collaboration between Zyodara and Yasmina. The video uses surreal imagery to convey the song\'s themes.',
    crew: [
      { role: 'Director', name: 'Adam Bell' },
      { role: 'VFX Supervisor', name: 'Chloe Davis' },
      { role: 'Artist', name: 'Zyodara' },
      { role: 'Featured Artist', name: 'Yasmina' },
    ],
  },
  {
    id: 9,
    title: 'More - Jordan Webb ft. Lucy Northern',
    type: 'MUSIC VIDEO',
    thumbnailUrl: 'https://placehold.co/400x225/AAAAAA/dddddd?text=More+Thumb',
    gifUrl: 'https://placehold.co/400x225/AAAAAA/dddddd/gif?text=More+GIF',
    vimeoId: '984534896', // <-- REPLACE with actual Vimeo ID
    description: 'The heartfelt music video for Jordan Webb\'s "More," featuring Lucy Northern. The intimate visuals complement the emotional depth of the song, creating a touching experience.',
    crew: [
      { role: 'Director', name: 'Elijah Fox' },
      { role: 'Stylist', name: 'Fiona Green' },
      { role: 'Artist', name: 'Jordan Webb' },
      { role: 'Featured Artist', name: 'Lucy Northern' },
    ],
  },
  {
    id: 10,
    title: 'Neon Dreams',
    type: 'NARRATIVE',
    thumbnailUrl: 'https://placehold.co/400x225/BBBBBB/eeeeee?text=Neon+Thumb',
    gifUrl: 'https://placehold.co/400x225/BBBBBB/eeeeee/gif?text=Neon+GIF',
    vimeoId: '984534897', // <-- REPLACE with actual Vimeo ID
    description: 'A visually striking narrative short film that plunges into a futuristic city bathed in neon lights. It explores a protagonist\'s journey through a cybernetic landscape.',
    crew: [
      { role: 'Director', name: 'George Harris' },
      { role: 'Lead Actor', name: 'Isabelle Jones' },
      { role: 'Production Designer', name: 'Kevin Li' },
    ],
  },
  {
    id: 11,
    title: 'Urban Pulse',
    type: 'COMMERCIAL',
    thumbnailUrl: 'https://placehold.co/400x225/CCCCCC/bbbbbb?text=Urban+Thumb',
    gifUrl: 'https://placehold.co/400x225/CCCCCC/bbbbbb/gif?text=Urban+GIF',
    vimeoId: '984534898', // <-- REPLACE with actual Vimeo ID
    description: 'A dynamic commercial capturing the vibrant energy of city life for a lifestyle brand. The fast-paced edits and modern aesthetics reflect the urban environment.',
    crew: [
      { role: 'Director', name: 'Mia Navarro' },
      { role: 'Editor', name: 'Noah Owens' },
      { role: 'Creative Director', name: 'Olivia Perez' },
    ],
  },
  {
    id: 12,
    title: 'Echoes in the Dark',
    type: 'MUSIC VIDEO',
    thumbnailUrl: 'https://placehold.co/400x225/DDDDDD/aaaaaa?text=Echoes+Thumb',
    gifUrl: 'https://placehold.co/400x225/DDDDDD/aaaaaa/gif?text=Echoes+GIF',
    vimeoId: '984534899', // <-- REPLACE with actual Vimeo ID
    description: 'A hauntingly beautiful music video that uses atmospheric visuals to complement the melancholic tones of the song. The narrative unfolds in a mystical, shadowy world.',
    crew: [
      { role: 'Director', name: 'Patrick Quinn' },
      { role: 'Vocalist', name: 'Rachel Scott' },
      { role: 'Cinematographer', name: 'Sam Taylor' },
    ],
  },
];