// app/page.tsx
'use client'; // This component uses client-side hooks

import { useState, useEffect } from 'react';
import { projectsData } from '@/data/projects'; // Import your project data
import InteractiveLiquidBackground from './components/InteractiveLiquidHomepage';

export default function HomePage() {
  

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <InteractiveLiquidBackground/>

    </div>
  );
}