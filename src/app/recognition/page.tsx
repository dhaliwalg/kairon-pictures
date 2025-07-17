// app/recognition/page.tsx
import { recognitionData } from '@/data/recognition'; // Import only data
import Link from 'next/link'; // We'll use Link for the clickable text

export const metadata = {
  title: 'Kairon Pictures - Recognition',
  description: 'Showcasing our festival selections, awards, clients, and press spots.',
};

export default function RecognitionPage() {
  // Filter items by category based on the new data structure
  const festivalsAwards = recognitionData.filter(item => item.category === 'festivals/awards');
  const clientsCollaborators = recognitionData.filter(item => item.category === 'clients/collaborators');
  const pressItems = recognitionData.filter(item => item.category === 'press');

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white px-0 py-0">
      {/* Main content wrapper - centered and with specific max-width and internal padding */}
      {/* pt-48 to push content down further, mx-auto to center horizontally */}
      <div className="w-full max-w-[1400px] px-8 md:px-16 lg:px-24 pt-48 pb-16 mx-auto">

        {/* FESTIVALS/AWARDS Section */}
        <section className="mb-24"> {/* Increased mb for larger vertical separation between sections */}
          <h2 className="text-2xl md:text-3xl font-bold mb-12 tracking-widest uppercase">FESTIVALS/AWARDS</h2> {/* Larger heading, wide tracking, uppercase */}
          <div className="flex flex-wrap justify-start items-baseline gap-x-16 gap-y-8"> {/* Flex for horizontal items, generous gap */}
            {festivalsAwards.map(item => (
              <Link
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl md:text-4xl font-medium uppercase hover:text-gray-400 transition-colors duration-200" // Adjusted font-size and font-weight
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>

        {/* PAST CLIENTS & COLLABORATORS Section */}
        <section className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 tracking-widest uppercase">PAST CLIENTS & COLLABORATORS</h2>
          <div className="flex flex-wrap justify-start items-baseline gap-x-16 gap-y-8">
            {clientsCollaborators.map(item => (
              <Link
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl md:text-4xl font-medium uppercase hover:text-gray-400 transition-colors duration-200" // Adjusted font-size and font-weight
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>

        {/* AS SEEN IN (PRESS) Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 tracking-widest uppercase">AS SEEN IN</h2>
          <div className="flex flex-wrap justify-start items-baseline gap-x-16 gap-y-8">
            {pressItems.map(item => (
              <Link
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl md:text-4xl font-medium uppercase hover:text-gray-400 transition-colors duration-200" // Adjusted font-size and font-weight
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}