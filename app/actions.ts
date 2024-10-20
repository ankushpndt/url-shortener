'use server';

import prisma from '@/lib/db';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';

export async function createShortenUrl(content: string) {
  const shortCode = nanoid(8);
  console.log({ content });
  await prisma.url.create({
    data: {
      originalUrl: content,
      shortCode,
    },
  });
  revalidatePath('/');
}

export async function fetchShortenedUrls() {
  const data = await prisma.url.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return data;
}
