import { Key, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MessageDto } from "@/types";

import useMessageStore from "./useMessageStore";

import { deleteMessage, getMessagesByContainer } from "@/app/actions/messageActions";

const outboxColumns = [
  { key: "recipientName", label: "Recipient" },
  { key: "text", label: "Message" },
  { key: "created", label: "Date sent" },
  { key: "actions", label: "Actions" },
];

const inboxColumns = [
  { key: "senderName", label: "Sender" },
  { key: "text", label: "Message" },
  { key: "created", label: "Date received" },
  { key: "actions", label: "Actions" },
];

export const useMessages = (
  initialMessages: MessageDto[],
  nextCursor?: string,
) => {
  const {
    set,
    remove,
    messages,
    updateUnreadCount,
    resetMessages,
  } = useMessageStore((state) => ({
    set: state.set,
    remove: state.remove,
    messages: state.messages,
    updateUnreadCount: state.updateUnreadCount,
    resetMessages: state.resetMessages,
  }));
  const searchParams = useSearchParams();
  const router = useRouter();

  const cursorRef = useRef(nextCursor);

  const container = searchParams.get("container");
  const isOutbox = container === "outbox";

  const [loadingMore, setLoadingMore] = useState(false);
  
  const [isDeleting, setDeleting] = useState({
    id: "",
    loading: false,
  });

  useEffect(() => {
    set(initialMessages);
    cursorRef.current = nextCursor;

    return () => {
      resetMessages();
    }
  }, [initialMessages, set, nextCursor]);

  const columns = isOutbox
    ? outboxColumns
    : inboxColumns;

  const loadMore = useCallback(async () => {
    if (cursorRef.current) {
      setLoadingMore(true);

      const { messages, nextCursor } = await getMessagesByContainer(
        container,
        cursorRef.current
      );

      set(messages);
      cursorRef.current = nextCursor;
      setLoadingMore(false);
    }
  }, [container, set]);

  const handleDeleteMessage = useCallback(
    async (message: MessageDto) => {
      setDeleting({
        id: message.id,
        loading: true,
      });
      await deleteMessage(message.id, isOutbox);
      remove(message.id);
      if (!message.dateRead && !isOutbox) {
        updateUnreadCount(-1);
      }
      setDeleting({ id: "", loading: false });
    },
    [isOutbox, remove, updateUnreadCount]
  );

  const handleRowSelect = (key: Key) => {
    const message = messages.find(
      (m) => m.id === key
    );
    const url = isOutbox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`;
    router.push(url + "/chat");
  };

  return {
    isOutbox,
    columns,
    deleteMessage: handleDeleteMessage,
    selectRow: handleRowSelect,
    isDeleting,
    messages,
    loadMore,
    loadingMore,
    hasMore: !!cursorRef.current,
  };
}