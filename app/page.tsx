'use client';

import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/signup'); 
  };


  return (
    <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
     
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Blue Tongue Logo" className="w-24 h-24" />
        </div>

     
        <h1 className="text-lg font-medium text-gray-700 mb-6">Welcome to BlueTongue</h1>

       
        <div className="space-y-3">
          <button className="flex items-center justify-center w-full py-3 px-4 bg-white rounded-xl shadow border border-gray-200 hover:shadow-md transition">
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
            <span className="text-sm text-gray-700 font-medium">Sign in with Google</span>
          </button>

          <button className="flex items-center justify-center w-full py-3 px-4 bg-white rounded-xl shadow border border-gray-200 hover:shadow-md transition">
            <img src="/apple-icon.svg" alt="Apple" className="w-5 h-5 mr-2" />
            <span className="text-sm text-gray-700 font-medium">Sign in with Apple</span>
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center my-2">
            <span className="h-px bg-gray-300 flex-1"></span>
            <span className="px-3 text-sm text-gray-400">or</span>
            <span className="h-px bg-gray-300 flex-1"></span>
          </div>

    
          <button
            onClick={() => router.push('/signup')}
            className="flex items-center justify-center w-full py-3 px-4 bg-white rounded-xl shadow border border-gray-200 hover:shadow-md transition"
          >
            <img src="/email-icon.svg" alt="Email" className="w-5 h-5 mr-2" />
            <span className="text-sm text-gray-700 font-medium">Sign in with email</span>
          </button>
        </div>
      </div>
    </div>
  );
}
