'use client';

import React from 'react';
import { Avatar, Badge } from '@heroui/react';
import usePresenceStore from '@/hooks/usePresenceStore';

type Props = {
  src?: string | null;
  userId?: string;
}

export default function PresenceAvatar({
  userId,
  src,
}: Props) {
  const { membersId } = usePresenceStore(
    (state) => ({
      membersId: state.membersId,
    })
  );

  const isOnline =
    userId && membersId.indexOf(userId) !== -1;

  return (
    <Badge
      content=""
      color='success'
      shape='circle'
      isInvisible={!isOnline}
    >
      <Avatar
        src={src || "/images/user.png"}
        alt='user avatar'
      />
    </Badge>
  );
};