'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const languages = Array(12).fill({
  name: 'English',
  flag: '/flags/uk-flag.png',
});

export default function NativeLanguageSelection() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(0);

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  const handleNext = () => {
    if (selected === null) {
      alert('Please select your native language');
      return;
    }

    localStorage.setItem('nativeLanguage', languages[selected].name);
    router.push('/library'); // або інша сторінка після вибору
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col justify-between px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <img src="/logo.png" alt="Logo" className="w-20 mx-auto mb-6" />
        <h1 className="text-lg font-semibold text-gray-700 mb-6">What is your native language?</h1>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {languages.map((lang, index) => (
            <div
              key={index}
              onClick={() => handleSelect(index)}
              className={`rounded-xl p-2 flex flex-col items-center justify-center border cursor-pointer transition ${
                selected === index ? 'border-blue-500 bg-white shadow' : 'border-gray-200 bg-gray-100'
              }`}
            >
              <div className="w-10 h-10 mb-1 rounded-md overflow-hidden bg-white">
                <img src={lang.flag} alt={lang.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs text-gray-700">{lang.name}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full py-3 bg-gray-100 rounded-xl font-medium hover:shadow transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
