'use client';

import React, { useState } from 'react';
import ShortenForm from './ShortenForm';
import UrlList from './UrlList';

const UrlShortenerContainer = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUrlShortened = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <ShortenForm handleUrlShortened={handleUrlShortened} />
      <UrlList key={refreshKey} />
    </div>
  );
};

export default UrlShortenerContainer;
