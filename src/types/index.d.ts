import { Prisma } from "@prisma/client";
import { ZodIssue } from "zod";

type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] };

type MessageDto = {
  id: string;
  text: string;
  created: string;
  dateRead: string | null;
  senderId?: string;
  senderName?: string;
  senderImage?: string | null;
  recipientId?: string;
  recipientName?: string;
  recipientImage?: string | null;
};

type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
  select: {
    id: true;
    text: true;
    created: true;
    dateRead: true;
    sender: {
      select: {
        userId: true;
        name: true;
        image: true;
      };
    };
    recipient: {
      select: {
        userId: true;
        name: true;
        image: true;
      };
    };
  };
}>;

type UserFilters = {
  gender: string[];
  ageRange: number[];
  orderBy: string;
  withPhoto: boolean;
}

type GetMemberParams = {
  ageRange?: string;
  gender?: string;
  orderBy?: string;
  withPhoto?: string;
  pageNumber?: string;
  pageSize?: string;
}

type PaginatedResponse<T> = {
  items: T[];
  totalCount: number;
}

type PagingParams = {
  pageNumber: number;
  pageSize: number;
}

type PagingResult = {
  totalPages: number;
  totalCount: number;
} & PagingParams;
