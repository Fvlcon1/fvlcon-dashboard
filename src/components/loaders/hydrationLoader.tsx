'use client'

import { useEffect, useState } from 'react';
import PageLoader from './pageLoader';

const HydrationLoader = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <PageLoader />
  }

  return <>{children}</>;
};

export default HydrationLoader;
