"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeroUIProvider } from "@heroui/react";

import { getUnreadMessageCount } from "@/app/actions/messageActions";

import useMessageStore from "@/hooks/useMessageStore";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";
import { useNotificationChannel } from "@/hooks/useNotificationChannel";

export function Providers({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string | null;
}) {
  const isUnreadCountSet = useRef(false);
  const { updateUnreadCount } = useMessageStore((state) => ({
    updateUnreadCount: state.updateUnreadCount,
  }));

  const setUnreadCount = useCallback(
    (amount: number) => {
      updateUnreadCount(amount);
    },
    [updateUnreadCount]
  );

  useEffect(() => {
    if (!isUnreadCountSet.current && userId) {
      getUnreadMessageCount().then((count) => {
        setUnreadCount(count);
      });

      isUnreadCountSet.current = true;
    }
  }, [setUnreadCount, userId]);

  usePresenceChannel();
  useNotificationChannel(userId);

  return (
    <HeroUIProvider>
      <ToastContainer position="bottom-right" hideProgressBar />
      {children}
    </HeroUIProvider>
  );
}
