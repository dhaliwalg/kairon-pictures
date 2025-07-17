// src/data/recognition.ts

export type RecognitionItem = {
  id: number;
  name: string;
  category: 'festivals/awards' | 'clients/collaborators' | 'press';
  link: string; // URL to the corresponding piece or article
};

export const recognitionData: RecognitionItem[] = [
  // FESTIVALS/AWARDS
  { id: 1, name: 'LAUREL', category: 'festivals/awards', link: 'https://example.com/aurel' },
  { id: 2, name: 'LAUREL', category: 'festivals/awards', link: 'https://example.com/laurel-1' },
  { id: 3, name: 'LAUREL', category: 'festivals/awards', link: 'https://example.com/laurel-2' },
  { id: 4, name: 'LAUREL', category: 'festivals/awards', link: 'https://example.com/laurel-3' },
  { id: 5, name: 'LAUREL', category: 'festivals/awards', link: 'https://example.com/laurel-4' },

  // PAST CLIENTS & COLLABORATORS
  { id: 6, name: 'CLIENT', category: 'clients/collaborators', link: 'https://example.com/client-1' },
  { id: 7, name: 'CLIENT', category: 'clients/collaborators', link: 'https://example.com/client-2' },
  { id: 8, name: 'CLIENT', category: 'clients/collaborators', link: 'https://example.com/client-3' },
  { id: 9, name: 'CLIENT', category: 'clients/collaborators', link: 'https://example.com/client-4' },

  // AS SEEN IN (PRESS)
  { id: 10, name: 'PRESS', category: 'press', link: 'https://example.com/press-1' },
  { id: 11, name: 'PRESS', category: 'press', link: 'https://example.com/press-2' },
  { id: 12, name: 'PRESS', category: 'press', link: 'https://example.com/press-3' },
  { id: 13, name: 'PRESS', category: 'press', link: 'https://example.com/press-4' },
];