'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { CheckIcon, CopyIcon, EyeIcon } from 'lucide-react';

type Url = {
  id: string;
  shortCode: string;
  originalUrl: string;
  visits: number;
};

const UrlList = () => {
  const [urls, setUrls] = useState<Url[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const origin = typeof window !== 'undefined' && location.origin

  const urlShortener = (code: string) => {
    return `${origin}/${code}`;
  };

  const fetchUrls = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/urls');
      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyUrl = (code: string) => {
    const fullUrl = `${urlShortener(code)}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setCopiedUrl(code);
      setTimeout(() => {
        setCopied(false);
        setCopiedUrl('');
      }, 1000);
    });
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  if (isLoading) {
    const arr = urls ?? [1, 2, 3];
    return (
      <div className='animate-pulse'>
        <div className='h-8 bg-gray-200 rounded w-1/4 mb-4'></div>
        <ul className='space-y-2'>
          {arr.map((url) => {
            return (
              <li
                key={url.id}
                className='flex items-center gap-2 rounded-md border bg-card p-4 text-card-foreground justify-between'
              >
                <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                <div className='flex items-center gap-3'>
                  <div className='h-5 w-5 bg-gray-200 rounded'></div>
                  <span className='flex items-center gap-20'>
                    <div className='w-4 h-4 bg-gray-200 rounded'></div>
                    <div className='w-10 h-4 bg-gray-200 rounded'></div>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    urls?.length > 0 && (
      <div>
        <h2 className='text-2xl font-bold mb-2'>Recent URLs</h2>
        <ul className='space-y-2'>
          {urls.map((url) => {
            return (
              <li
                key={url.id}
                className='flex items-center gap-2 justify-between bg-card rounded-md text-card-foreground border p-3'
              >
                <Link
                  href={`/${url.shortCode}`}
                  target='_blank'
                  className='text-blue-500'
                >
                  {urlShortener(url.shortCode)}
                </Link>
                <div className='flex items-center gap-3'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-muted-foreground hover:bg-muted'
                    onClick={() => handleCopyUrl(url.shortCode)}
                  >
                    {copied && copiedUrl === url.shortCode ? (
                      <CheckIcon className='w-4 h-4' />
                    ) : (
                      <CopyIcon className='w-4 h-4' />
                    )}
                    <span className='sr-only'>Copy URL</span>
                  </Button>
                  <span className='flex items-center gap-2'>
                    <EyeIcon className='h-4 w-4' />
                    {url.visits} views
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default UrlList;
