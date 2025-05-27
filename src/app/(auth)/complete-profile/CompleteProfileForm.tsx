'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RiProfileLine } from "react-icons/ri";
import { profileSchema, ProfileSchema } from '@/lib/schemas/RegisterSchema';
import { zodResolver } from '@hookform/resolvers/zod';

import { signIn } from 'next-auth/react';
import { completeSocialLoginProfile } from '@/app/actions/authActions';

import CardWrapper from '@/components/CardWrapper';
import { Button } from '@heroui/react';
import ProfileDetailsForm from '../register/ProfileDetailsForm';

export default function CompleteProfileForm(){
  const methods = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const onSubmit = async (data: ProfileSchema) => {
    const result = await completeSocialLoginProfile(data);

    if (result.status === 'success') {
      signIn(result.data, {
        callbackUrl: '/members',
      });
    }
  }

  return (
    <CardWrapper
      headerText='About You'
      subHeaderText='Please complete your profile to continue the app'
      headerIcon={RiProfileLine}
      body={
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <ProfileDetailsForm />
              {errors.root?.serverError && (
                <p className="text-danger text-sm">
                  {errors.root.serverError.message}
                </p>
              )}
              <div className="flex flex-row items-center gap-6">
                <Button
                  type="submit"
                  color='default'
                  isLoading={isSubmitting}
                  isDisabled={!isValid || isSubmitting}
                  fullWidth
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      } 
    />
  );
};