
'use client';

import { useEffect, useState } from 'react';

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const fakeBooks = [
      {
        id: '0',
        title: 'The Old Man and the Sea',
        author: 'Ernest Hemingway',
        year: 2015,
        genre: 'Fantasy',
        description: 'Lorem ipsum egestas mauris sed scelerisque egestas...',
        image: '/book-cover.jpg',
      },
     
    ];

    const found = fakeBooks.find(b => b.id === params.id);
    setBook(found);
  }, [params.id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="flex gap-10 bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto">
      <img src={book.image} alt={book.title} className="w-40 h-60 object-cover rounded-md" />
      <div>
        <h1 className="text-2xl font-bold">{book.title}</h1>
        <p className="text-gray-600 mt-1">by {book.author}</p>
        <div className="flex gap-2 mt-4">
          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">{book.year}</span>
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">{book.genre}</span>
        </div>
        <p className="mt-6 text-sm leading-relaxed">{book.description}</p>
        <button className="mt-6 bg-[#3b5998] text-white px-6 py-2 rounded-xl">
          СТВОРИТИ ПРОФІЛЬ
        </button>
      </div>
    </div>
  );
}
