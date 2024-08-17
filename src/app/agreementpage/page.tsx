'use client'; 

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import agree from '../../assets/agree.png';
import '../styles/index.css';

const TypingAnimation: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const word = 'FVLCON';

  useEffect(() => {
    const interval = setInterval(() => {
      setText(word.slice(0, index));
      setIndex((prevIndex) => (prevIndex === word.length ? prevIndex : prevIndex + 1));
    }, 300);

    return () => clearInterval(interval);
  }, [index]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prevShow) => !prevShow);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div>
      <span>{text}</span>
      {showCursor && <span className="animate-blink">_</span>}
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <>
      <div style={{
        zIndex: -1,
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0
      }}>
        <Image
          alt="Background"
          src={agree}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      </div>

      <div className="w-screen h-screen flex justify-center items-center flex-col relative text-white">
        <motion.div
          className="absolute"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="text-[5rem] mt-5 mb-3 font-roboto">
            <TypingAnimation />
          </div>

          <motion.div
            className='w-[45.5%] mt-2 font-mono text-gray-300 bg-gray-700 bg-opacity-20 backdrop-blur-sm border border-gray-200 shadow-lg rounded-lg p-3 mb-5'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            This is a secure system for access by authorized individuals only. The right to use this system is restricted to authorized individuals only and is not transferable to any other person or entity. By clicking &quot;Agree&quot; you acknowledge, understand and further agree that you are the authorized and you will observe and be bound by the <a href="" className="text-[#19c2ca]">Access and Terms of Use Agreement</a>
          </motion.div>

          <Link href="/dashboard/home">
            <motion.button
              className="bg-blue-500 text-white font-serif py-1 font-light px-2 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Agree
            </motion.button>
          </Link>
        </motion.div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center font-thin text-gray-400">
          <div className="flex flex-col font-roboto text-xs">
            <div>Copyright ©️ 2024 • BLVCK SAPPHIRE • All Rights Reserved</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
