'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoImage from '../../assets/FVLCON3.png'; 
// import keyboardTypingSound from '../../assets/audiomass-3.mp3'; 
import '../styles/index.css';

const HomePage = () => {
  const router = useRouter();
  const [typedText, setTypedText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const fvlconText = 'FVLCON';

  useEffect(() => {
    if (currentIndex < fvlconText.length) {
      const interval = setInterval(() => {
        if (currentIndex === 0) {
          // Play typing sound only when starting to type "FVLCON"
          // const audio = new Audio(keyboardTypingSound);
          // audio.play();
        }

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
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=\'100%\' height=\'100%\' viewBox=\'0 0 1920 1080\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'960\' cy=\'540\' r=\'8\' fill=\'%23999999\' fill-opacity=\'0.6\'/%3E%3C/svg%3E')] bg-repeat animate-moveParticles"></div>
      
      {/* Centered container */}
      <div className="flex flex-col items-center justify-center h-full relative z-10">
        <Image
          src={logoImage}
          alt="Company Logo"
          width={194} 
          height={194} 
          style={{ marginBottom: '30px' }} 
          className="transition-transform duration-500 ease-in-out"
        />
        <h1 className="text-5xl font-extralight user-select-none">
          {typedText}
        </h1>
      </div>

      {typedText === 'FVLCON' && (
        <div className="w-8 h-8 text-gray-400 my-5 animate-spin absolute top-0 left-0 z-20">
          <svg className="w-full h-full" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
          </svg>
        </div>
      )}

      <div className="absolute bottom-12 text-center text-xs text-gray-500 w-full font-orbitron">
        ©️ 2024 • BLVCK SAPPHIRE • All Rights Reserved
      </div>
    </div>
  );
};

export default HomePage;
