'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHeart, FaRegHeart, FaLock } from 'react-icons/fa';

export default function LibraryPage() {
  const [language, setLanguage] = useState('English');
  const router = useRouter();

  useEffect(() => {
    const selected = localStorage.getItem('selectedLanguage');
    if (selected) setLanguage(selected);
  }, []);

  const handleBookClick = (id: string) => {
    router.push(`/book/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col text-sm font-sans">
      {/* Header */}
      <header className="flex flex-col px-4 py-4 bg-white shadow-md">
        <div className="flex justify-between items-center mb-4">
          <button className="text-2xl">☰</button>
          <div className="flex items-center gap-2">
            <img src="/avatar.png" className="w-8 h-8 rounded-full" alt="User" />
          </div>
        </div>
        <div className="flex justify-between gap-2 mb-4">
          <div className="flex flex-col text-xs">
            <label className="text-gray-500 mb-1">I'm learning</label>
            <select className="px-2 py-1 rounded bg-gray-100">
              <option selected>{language}</option>
            </select>
          </div>
          <div className="flex flex-col text-xs">
            <label className="text-gray-500 mb-1">I know</label>
            <select className="px-2 py-1 rounded bg-gray-100">
              <option selected>Ukrainian</option>
            </select>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="flex justify-between items-center px-4 py-2 gap-2">
        <select className="flex-1 px-2 py-2 rounded-lg bg-white border text-sm">
          <option>Genres</option>
        </select>
        <select className="flex-1 px-2 py-2 rounded-lg bg-white border text-sm">
          <option>Authors</option>
        </select>
        <button className="text-xl">🔍</button>
      </div>

      {/* Book List */}
      <div className="px-4 py-2 space-y-3 overflow-auto">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            onClick={() => handleBookClick(`${idx}`)}
            className={`flex items-start bg-white rounded-xl p-3 shadow ${idx === 3 ? 'opacity-50' : 'cursor-pointer'}`}
          >
            <img
              src="/book-cover.jpg"
              alt="Book"
              className="w-12 h-16 object-cover rounded-md mr-3"
            />
            <div className="flex-1">
              <h3 className={`font-semibold text-sm ${idx === 3 ? 'text-gray-400' : 'text-black'}`}>
                {idx === 0 ? 'Book Of Jungle' : 'The Old Man and The Sea'}
              </h3>
              <p className={`text-xs ${idx === 3 ? 'text-gray-300' : 'text-gray-600'}`}>
                {idx === 0 ? 'Rudyard Kipling' : 'Ernest Hemingway'}
              </p>
              <div className="mt-2 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full" style={{ width: idx === 3 ? '30%' : '60%' }}></div>
              </div>
            </div>
            <div className="pl-2 pt-1">
              {idx === 0 ? (
                <FaHeart className="text-red-500 text-lg" />
              ) : idx === 3 ? (
                <FaLock className="text-gray-400 text-lg" />
              ) : (
                <FaRegHeart className="text-gray-400 text-lg" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-[#1777c2] text-white flex justify-around items-center py-3 text-xs">
  <div className="flex flex-col items-center">
    <img src="/icons/profile.png" alt="Profile" className="w-6 h-6 mb-1" />
    <span>Profile</span>
  </div>
  <div className="flex flex-col items-center">
    <img src="/icons/library.png" alt="Library" className="w-6 h-6 mb-1" />
    <span className="font-bold">Library</span>
  </div>
  <div className="flex flex-col items-center">
    <img src="/icons/tutor.png" alt="Tutor" className="w-6 h-6 mb-1" />
    <span>Tutor</span>
  </div>
  <div className="flex flex-col items-center">
    <img src="/icons/resume.png" alt="Resume" className="w-6 h-6 mb-1" />
    <span>Resume</span>
  </div>
</nav>

    </div>
  );
}
