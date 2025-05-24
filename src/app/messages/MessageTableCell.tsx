import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { truncateString } from "@/lib/util";
import { MessageDto } from "@/types";
import { Avatar, Button } from "@heroui/react";

type Props = {
  item: MessageDto;
  columnKey: string;
  isOutbox: boolean;
  deleteMessage: (message: MessageDto) => void;
  isDeleting: boolean;
}

export default function MessageTableCell({
  item,
  columnKey,
  isOutbox,
  deleteMessage,
  isDeleting,
}: Props) {
  const cellValue = item[columnKey as keyof MessageDto];

  switch (columnKey) {
    case "recipientName":
    case "senderName":
      return (
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar
            alt="Image of member"
            src={
              (isOutbox ? item.recipientImage : item.senderImage) ||
              "/images/user.png"
            }
          />
          <span>{cellValue}</span>
        </div>
      );
    case "text":
      return <div>{truncateString(cellValue, 80)}</div>;
    case "created":
      return cellValue;
    default:
      return (
        <Button
          isIconOnly
          variant="light"
          onPress={() => deleteMessage(item)}
          isLoading={isDeleting}
        >
          <AiFillDelete size={24} className="text-danger" />
        </Button>
      );
  }
}
