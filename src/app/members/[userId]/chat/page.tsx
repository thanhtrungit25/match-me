import React from 'react';

import { createChatId } from '@/lib/util';

import { getAuthUserId } from '@/app/actions/authActions';
import { getMessageThread } from '@/app/actions/messageActions';

import CardInnerWrapper from '@/components/CardInnerWrapper';
import MessageList from './MessageList';
import ChatForm from './ChatForm';

export default async function ChatPage({
  params,
}: {
  params: { userId: string }
}){
  const messages = await getMessageThread(params.userId);

  const userId = await getAuthUserId();

  const chatId = createChatId(
    userId,
    params.userId,
  );

  return (
    <CardInnerWrapper
      header="Chat"
      body={
        <MessageList
          initialMessages={messages}
          currentUserId={userId}
          chatId={chatId}
        />
      }
      footer={<ChatForm />}
    />
  );
};