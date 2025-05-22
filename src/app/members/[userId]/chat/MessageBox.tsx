'use client';

import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Avatar } from '@heroui/react';
import { MessageDto } from '@/types';

type Props = {
  message: MessageDto;
  currentUserId: string;
}

export default function MessageBox({
  message,
  currentUserId,
}: Props){
  const isCurrentUserSender =
    message.senderId === currentUserId;

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth"
      })
    }
  }, [messageEndRef])

  const renderAvatar = () => (
    <Avatar
      name={message.senderName}
      className='self-end'
      src={
        message.senderImage || "/images/user.png"
      }
    />
  )

  const renderMessageHeader = () => (
    <div
      className={clsx(
        "flex items-center w-full",
        {
          "justify-between": isCurrentUserSender
        }
      )}
    >
      {message.dateRead &&
      message.recipientId !== currentUserId && (
        <span className='text-xs text-black italic'>
          (Read x mins ago)
        </span>
      )}
      <div className="flex">
        <span className="text-sm font-semibold text-gray-900">
          {message.senderName}
        </span>
        <span className="text-sm ml-2 text-gray-500">
          {message.created}
        </span>
      </div>
    </div>
  )

  const messageContentClasses = clsx(
    "flex flex-col w-[50%] px-2 py-1",
    {
      "rounded-l-xl rounded-tr-xl bg-blue-100": isCurrentUserSender,
      "rounded-r-xl rounded-tl-xl bg-gray-100": !isCurrentUserSender,
    }
  )

  const renderMessageContent = () => {
    return (
      <div className={messageContentClasses}>
        {renderMessageHeader()}
        <p className='text-sm py-3 text-gray-900'>
          {message.text}
        </p>
      </div>
    )
  }

  return (
    <div className='grid grid-rows-1'>
      <div
        className={clsx("flex gap-2 mb-3", {
          "justify-end text-right": isCurrentUserSender,
          "justify-start": !isCurrentUserSender
        })}
      >
        {!isCurrentUserSender && renderAvatar()}
        {renderMessageContent()}
        {isCurrentUserSender && renderAvatar()}
      </div>
      <div ref={messageEndRef} />
    </div>
  );
};