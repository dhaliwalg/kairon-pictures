// app/about/page.tsx
import React from 'react';

export const metadata = {
  title: 'Kairon Pictures - Contact',
  description: 'Contact Kairon Pictures for inquiries.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-black px-4 py-8">
      <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">CONTACT US?</h1>

        <div className="text-center space-y-4 font-sans">
          <p className="text-lg">New Projects</p>
          <p className="text-lg">studio@yourcompany.com</p>
          <p className="text-lg">(XXX) XXX-XXXX</p>
        </div>
      </div>
    </div>
  );
}