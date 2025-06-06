"use server";

import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./authActions";
import { mapMessageToMessageDto } from "@/lib/mappings";
import { messageSchema, MessageSchema } from "@/lib/schemas/MessageSchema";
import { ActionResult, MessageDto } from "@/types";

import { pusherServer } from "@/lib/pusher";
import { createChatId } from "@/lib/util";

export async function createMessage(
  recipientUserId: string,
  data: MessageSchema
): Promise<ActionResult<MessageDto>> {
  try {
    const userId = await getAuthUserId();

    const validated = messageSchema.safeParse(data);

    if (!validated.success)
      return { status: "error", error: validated.error.errors };

    const { text } = validated.data;

    const message = await prisma.message.create({
      data: {
        text,
        recipientId: recipientUserId,
        senderId: userId,
      },
      select: messageSelect
    });
    const messageDto = mapMessageToMessageDto(message);

    await pusherServer.trigger(createChatId(userId, recipientUserId), 'message:new', messageDto);
    await pusherServer.trigger(`private-${recipientUserId}`, 'message:new', messageDto);

    return { status: "success", data: messageDto };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getMessageThread(recipientId: string) {
  try {
    const userId = await getAuthUserId();

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        created: "asc",
      },
      select: messageSelect,
    });

    let readCount = 0;

    if (messages.length > 0) {
      const unreadMessageIds = messages
        .filter(m => m.dateRead === null
          && m.recipient?.userId === userId
          && m.sender?.userId === recipientId
        )
        .map(m => m.id);
      

      await prisma.message.updateMany({
        where: {
          senderId: recipientId,
          recipientId: userId,
          dateRead: null,
        },
        data: { dateRead: new Date() },
      });

      readCount = unreadMessageIds.length;

      await pusherServer.trigger(createChatId(recipientId, userId), 'messages:read', unreadMessageIds);
    }

    return {
      messages: messages.map((message) => mapMessageToMessageDto(message)),
      readCount
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUnreadMessageCount() {
  try {
    const userId = await getAuthUserId();

    return prisma.message.count({
      where: {
        recipientId: userId,
        dateRead: null,
        recipientDeleted: false,
      }
    })
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMessagesByContainer(
  container?: string | null,
  cursor?: string,
  limit = 2,
) {
  try {
    const userId = await getAuthUserId();

    const conditions = {
      [container === "outbox" ? "senderId" : "recipientId"]: userId,
      ...(container === "outbox"
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };

    const messages = await prisma.message.findMany({
      where: {
        ...conditions,
        ...(cursor ? { created: { lte: new Date(cursor) } } : {}),
      },
      orderBy: {
        created: "desc",
      },
      select: messageSelect,
      take: limit + 1,
    });

    let nextCursor: string | undefined;

    if (messages.length > limit) {
      const nextItem = messages.pop()
      nextCursor = nextItem?.created.toISOString();
    } else {
      nextCursor = undefined;
    }

    const messagesToReturn = messages.map((message) => mapMessageToMessageDto(message));

    return { messages: messagesToReturn, nextCursor }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteMessage(messageId: string, isOutbox: boolean) {
  const selector = isOutbox ? "senderDeleted" : "recipientDeleted";

  try {
    const userId = await getAuthUserId();

    await prisma.message.update({
      where: { id: messageId },
      data: {
        [selector]: true,
      },
    });

    const messagesToDelete = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
          {
            recipientId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
        ],
      },
    });

    if (messagesToDelete.length > 0) {
      await prisma.message.deleteMany({
        where: {
          OR: messagesToDelete.map((m) => ({ id: m.id })),
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const messageSelect = {
  id: true,
  text: true,
  created: true,
  dateRead: true,
  sender: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
  recipient: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
};