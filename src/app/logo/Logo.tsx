'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoImage from '../../assets/FVLCON3.png'; 
import '../styles/index.css';

const Logo: React.FC = () => {
  const router = useRouter();
  const [typedText, setTypedText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const fvlconText = 'FVLCON';

  useEffect(() => {
    if (currentIndex < fvlconText.length) {
      const interval = setInterval(() => {
        setTypedText((prevText) => prevText + fvlconText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 100);

      return () => clearInterval(interval);
    } else {
      setTimeout(() => {
        router.push('/company-code'); 
      }, 2000);
    }
  }, [currentIndex, fvlconText, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-orbitron relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' viewBox=\'0 0 1920 1080\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'960\' cy=\'540\' r=\'8\' fill=\'%23999999\' fill-opacity=\'0.6\'/%3E%3C/svg%3E')] bg-repeat animate-moveParticles"></div>
      <div className="flex flex-col items-center justify-center h-full">
        <Image src={logoImage} alt="Company Logo" className="h-32 mb-10 transition-transform duration-500 ease-in-out z-10" />
        <h1 className="text-5xl font-extralight user-select-none z-10">
          {typedText}
        </h1>
      </div>

      {typedText === 'FVLCON' && (
        <div className="w-8 h-8 text-gray-400 my-5 animate-spin absolute top-0 left-0">
          <svg className="w-8 h-8" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
          </svg>
        </div>
      )}

      <div className="absolute bottom-0 mb-4 text-xs text-gray-500">©️ 2024 • BLVCK SAPPHIRE • All Rights Reserved</div>

      <div className="absolute top-4 right-4 text-white opacity-50 text-2xl">
        <i className="fas fa-user-secret"></i>
      </div>
    </div>
  );
};

export default Logo;
