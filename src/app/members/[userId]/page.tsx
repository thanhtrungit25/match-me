import React from 'react';
import { notFound } from 'next/navigation';

import { getMemberByUserId } from '@/app/actions/memberActions';
import CardInnerWrapper from '@/components/CardInnerWrapper';

export default async function MemberDetailPage({
  params
}: {
  params: { userId: string }
}){
  const member = await getMemberByUserId(params.userId);
  if (!member) return notFound();

  return (
    <CardInnerWrapper
      header="Profile"
      body={member.description}
    />
  );
};