'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createShortenUrl } from '@/app/actions';

interface ShortenFormProps {
  handleUrlShortened: () => void;
}

const ShortenForm = ({ handleUrlShortened }: ShortenFormProps) => {
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createShortenUrl(url.toString());
      setUrl('');
      handleUrlShortened();
    } catch (error) {
      console.log('Error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <div className='space-y-4'>
        <Input
          className='h-12'
          type='url'
          placeholder='Enter URL to shorten'
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button className='w-full p-2' type='submit' disabled={isLoading}>
          {isLoading ? 'Shortening' : 'Shorten URL'}
        </Button>
      </div>
    </form>
  );
};

export default ShortenForm;
