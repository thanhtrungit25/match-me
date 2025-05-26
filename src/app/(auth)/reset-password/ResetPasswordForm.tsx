'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ActionResult } from '@/types';
import { Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';

import { resetPasswordSchema, ResetPasswordSchema } from '@/lib/schemas/ForgotPasswordSchema';
import CardWrapper from '@/components/CardWrapper';
import { resetPassword } from '@/app/actions/authActions';
import ResultMessage from '@/components/ResultMessage';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [result, setResult] =
    useState<ActionResult<string> | null>(null);

  const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitting, isValid, errors }
    } = useForm<ResetPasswordSchema>({
      mode: 'onTouched',
      resolver: zodResolver(resetPasswordSchema),
    });

  const onSubmit = async (data: ResetPasswordSchema) => {
    setResult(
      await resetPassword(
        searchParams.get('token') as string,
        data.password,
      )
    );
    reset();
  }

  return (
    <CardWrapper
      headerIcon={GiPadlock}
      headerText='Reset password'
      subHeaderText='Enter your new password'
      body={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col space-y-4'
        >
          <Input
            type='password'
            placeholder='Password'
            variant='bordered'
            defaultValue=''
            {...register('password')}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message as string}
          />
          <Input
            type='password'
            placeholder='Confirm Password'
            variant='bordered'
            defaultValue=''
            {...register('confirmPassword')}
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message as string}
          />
          <Button
            type='submit'
            color='default'
            isLoading={isSubmitting}
            isDisabled={!isValid}
          >
            Reset password
          </Button>
        </form>
      }
      footer={<ResultMessage result={result} />}
    />
  );
};