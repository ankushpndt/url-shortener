import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react';

interface RedirectPageProps {
  params: { shortCode: string };
}

const RedirectPage = async ({ params }: RedirectPageProps) => {
  const { shortCode } = params;

  const url = await prisma.url.findUnique({
    where: { shortCode },
  });

  if (!url) {
    return <div>404 - URL not found</div>;
  }

  await prisma.url.update({
    where: {
      id: url.id,
    },
    data: { visits: { increment: 1 } },
  });

  redirect(url.originalUrl);
};

export default RedirectPage;
