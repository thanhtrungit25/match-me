'use client';

import React from 'react';

import { MessageDto } from '@/types';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import MessageTableCell from './MessageTableCell';
import { useMessages } from '@/hooks/useMessages';

type Props = {
  initialMessages: MessageDto[];
};

export default function MessageTable({
  initialMessages,
}: Props){

  const {
    columns,
    isOutbox,
    isDeleting,
    deleteMessage,
    selectRow,
    messages,
  } = useMessages(initialMessages);

  return (
    <Card>
      <Table
        aria-label="Example static collection table"
        selectionMode='single'
        onRowAction={(key) => selectRow(key)}
        shadow='none'
      >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={messages}
        emptyContent="No messages for this container"
      >
        {(item) => (
          <TableRow key={item.id} className='cursor-pointer'>
            {(columnKey) => (
              <TableCell>
                <MessageTableCell
                  item={item}
                  columnKey={columnKey as string}
                  isOutbox={isOutbox}
                  deleteMessage={deleteMessage}
                  isDeleting={
                    isDeleting.loading &&
                    isDeleting.id === item.id
                  }
                />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </Card>
  );
};