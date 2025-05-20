'use client'

import React from 'react'
import {HeroUIProvider} from '@heroui/react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastContainer
        position='bottom-right'
        hideProgressBar
      />
      {children}
    </HeroUIProvider>
  )
}