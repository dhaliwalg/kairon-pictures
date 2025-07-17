// app/about/page.tsx
import { teamMembersData } from "@/data/team";

export const metadata = {
  title: 'Kairon Pictures - About Us',
  description: 'Learn about Kairon Pictures, our mission, and our team.',
};

export default function AboutPage() {
  // Group team members as seen in the PPT slide for structured display
  const pressContact = { name: 'press@pulsefilms.com', title: 'PRESS' as const };
  const careersContact = { name: 'cv@pulsefilms.com', title: 'CAREERS' as const, address: '12910 Culver Blvd Suite I, Los Angeles, CA 90066' };

  const executiveLeadershipTeam = teamMembersData.filter(member =>
    ['COO (SCRIPTED)', 'CFO', 'GLOBAL HEAD OF PR'].includes(member.title)
  );

  const commercialsMusicVideosTeam = teamMembersData.filter(member =>
    ['GLOBAL PRESIDENT, COMMERCIALS & MVS', 'EXECUTIVE PRODUCER', 'GLOBAL HEAD OF MUSIC VIDEOS', 'STAFF PRODUCTION MANAGER'].includes(member.title)
  );

  // For Sales, matching the PPT visual precisely from image_9fbee6.png
  // "Robert Mueller JOANNA MILLER" is very specific in the PPT layout.
  // Assuming 'JOANNA MILLER' is his title, or a second person listed adjacently.
  // To match the visual, we'll ensure they are ordered as in the PPT.
  const salesSpecificMembers = [
    teamMembersData.find(m => m.name === 'Stephanie Stephens'),
    teamMembersData.find(m => m.name === 'Claire Allman'),
    teamMembersData.find(m => m.name === 'Robert Mueller'),
    teamMembersData.find(m => m.name === 'Camille SemprEZ')
  ].filter(Boolean); // Filter out any undefined if a find fails

  const filmScriptedTvTeam = teamMembersData.filter(member =>
    ['HEAD OF PRODUCTION', 'PRODUCER, FILM'].includes(member.title)
  );

  const nonFictionTeam = teamMembersData.filter(member =>
    ['EXECUTIVE PRODUCER, MUSIC DOCUMENTARIES', 'HEAD OF DEVELOPMENT, UNSCRIPTED'].includes(member.title)
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white px-0 py-0">
      {/* Main content wrapper - centered and with specific max-width and internal padding */}
      {/* Increased pt- value to push content down further from the global navbar. */}
      {/* This value might need slight manual tuning based on the final header height. */}
      <div className="w-full max-w-[1200px] px-24 md:px-32 lg:px-40 xl:px-48 pt-40 pb-16 mx-auto">

        {/* Company Bio Section */}
        <div className="mb-12 font-sans">
          {/* Single paragraph to match PPT's continuous text flow */}
          <p className="text-[22px] leading-[1.3] tracking-[0.01em] font-normal">
            <span className="font-bold">KAIRON PICTURES</span> is a creative production company, specializing in <span className="font-bold">narrative</span>, <span className="font-bold">commercial</span>, <span className="font-bold">fashion</span>, and <span className="font-bold">music video productions.</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        {/* Separator Line - Thin and light grey, matching image_9fbee6.png */}
        <div className="w-full border-b border-gray-600 mb-12"></div>

        {/* Team Contact Info Section - Structured according to PPT */}
        {/* Adjusted grid to match the 5-column distribution in image_9fbee6.png more precisely */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-8 font-sans">
          {/* Column 1: Press & Careers */}
          <div>
            <h2 className="text-[14px] font-bold tracking-[0.05em] mb-4 uppercase">Press</h2>
            <p className="text-sm tracking-wide mb-6 leading-tight">
              <a href={`mailto:${pressContact.name}`} className="hover:underline">{pressContact.name}</a>
            </p>

            <h2 className="text-[14px] font-bold tracking-[0.05em] mb-4 uppercase">Careers</h2>
            <p className="text-sm tracking-wide mb-1 leading-tight">
              <a href={`mailto:${careersContact.name}`} className="hover:underline">{careersContact.name}</a>
            </p>
            <address className="text-sm not-italic tracking-wide leading-tight">
              {careersContact.address.split(', ').map((line, index) => (
                <span key={index} className="block">{line}</span>
              ))}
            </address>
          </div>

          {/* Column 2: Executive Leadership Team */}
          <div>
            <h2 className="text-[14px] font-bold tracking-[0.05em] mb-4 uppercase">Executive Leadership Team</h2>
            {executiveLeadershipTeam.map(member => (
              <div key={member.id} className="mb-3 leading-tight">
                <p className="text-sm tracking-wide">{member.name}</p>
                <p className="text-xs text-gray-400 tracking-wide">{member.title}</p>
              </div>
            ))}
          </div>

          {/* Column 3: Commercials & Music Videos */}
          <div>
            <h2 className="text-[14px] font-bold tracking-[0.05em] mb-4 uppercase">Commercials & Music Videos</h2>
            {commercialsMusicVideosTeam.map(member => (
              <div key={member.id} className="mb-3 leading-tight">
                <p className="text-sm tracking-wide">{member.name}</p>
                <p className="text-xs text-gray-400 tracking-wide">{member.title}</p>
              </div>
            ))}
          </div>

          {/* Column 4: Sales */}
          <div className="lg:col-span-1">
            <h2 className="text-[14px] font-bold tracking-[0.05em] mb-4 uppercase">Sales</h2>
            {salesSpecificMembers.map(member => (
              <div key={member?.id} className="mb-3 leading-tight">
                <p className="text-sm tracking-wide">{member?.name}</p>
                <p className="text-xs text-gray-400 tracking-wide">{member?.title}</p>
              </div>
            ))}
          </div>

          {/* Column 5: Film & Scripted TV & Non-Fiction */}
          <div>
            <h2 className="text-[14px] font-bold tracking-[0.05em] mb-4 uppercase">Film & Scripted TV</h2>
            {filmScriptedTvTeam.map(member => (
              <div key={member.id} className="mb-3 leading-tight">
                <p className="text-sm tracking-wide">{member.name}</p>
                <p className="text-xs text-gray-400 tracking-wide">{member.title}</p>
              </div>
            ))}

            <h2 className="text-[14px] font-bold tracking-[0.05em] mb-4 mt-6 uppercase">Non-Fiction</h2>
            {nonFictionTeam.map(member => (
              <div key={member.id} className="mb-3 leading-tight">
                <p className="text-sm tracking-wide">{member.name}</p>
                <p className="text-xs text-gray-400 tracking-wide">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}