// app/components/RecognitionGridItem.tsx
'use client'; // This component uses client-side event handlers

import Link from 'next/link';

// Define the type for the item prop
export type RecognitionItem = {
  id: number;
  name: string;
  category: 'festival' | 'award' | 'client' | 'press';
  logoUrl: string;
  link: string;
};

const RecognitionGridItem: React.FC<{ item: RecognitionItem }> = ({ item }) => {
  return (
    <Link
      href={item.link}
      target="_blank" // Open links in a new tab
      rel="noopener noreferrer" // Security best practice for target="_blank"
      className="flex flex-col items-center justify-center p-4 rounded-lg
                 hover:bg-gray-800 transition-colors duration-200 group
                 h-40 w-40 md:h-48 md:w-48 text-center" // Fixed size for grid items, adjust as needed
    >
      <img
        src={item.logoUrl}
        alt={item.name}
        className="object-contain max-h-24 max-w-full mb-2 group-hover:scale-105 transition-transform duration-200"
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/150x150/000000/FFFFFF?text=Error'; }} // Fallback image for error
      />
      <span className="text-sm md:text-base font-medium group-hover:text-white transition-colors duration-200">
        {item.name}
      </span>
    </Link>
  );
};

export default RecognitionGridItem;