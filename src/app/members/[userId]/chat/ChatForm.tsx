'use client';

import { Button, Input } from '@heroui/react';
import React from 'react';
import { HiPaperAirplane } from 'react-icons/hi2';

import { MessageSchema, messageSchema } from '@/lib/schemas/MessageSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { createMessage } from '@/app/actions/messageActions';
import { handleFormServerErrors } from '@/lib/util';

export default function ChatForm(){
  const router = useRouter();
  const params = useParams<{ userId: string }>();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, isValid, errors }
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema)
  })

  const onSubmit = async (data: MessageSchema) => {
    const result = await createMessage(
      params.userId,
      data
    );

    if (result.status === 'error') {
      handleFormServerErrors(result, setError);
    } else {
      reset();
      router.refresh();
    }
  }

  return (
    <form
      className='w-full'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center gap-2">
        <Input
          fullWidth
          placeholder='Type a message'
          variant='faded'
          {...register('text')}
          isInvalid={!!errors.text}
          errorMessage={errors.text?.message}
        />
        <Button
          type="submit"
          isIconOnly
          color='default'
          radius='full'
          isLoading={isSubmitting}
          isDisabled={!isValid || isSubmitting}
        >
          <HiPaperAirplane size={18} />
        </Button>
      </div>
    </form>
  );
};