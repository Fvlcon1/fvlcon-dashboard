'use client';

import React from 'react';
import MFAValidation from './MFAValidation';

const App: React.FC = () => {
  return (
    <div>
      <MFAValidation onSuccess={()=>{}} />
    </div>
  );
};

export default App;
