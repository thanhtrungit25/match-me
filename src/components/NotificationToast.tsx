import Link from "next/link";
import { toast } from "react-toastify";
import { Image } from "@heroui/react";
import { MessageDto } from "@/types";

type Props = {
  image?: string | null;
  href: string;
  title: string;
  subtitle?: string;
};

function NotificationToast({ image, href, title, subtitle }: Props) {
  return (
    <Link href={href} className="flex items-center">
      <div className="mr-2">
        <Image
          src={image || "/images/user.png"}
          width={50}
          height={50}
          alt="Sender image"
        />
      </div>
      <div className="flex flex-grow flex-col justify-center">
        <div className="font-semibold">{title}</div>
        <div className="text-sm">{subtitle || "Click to view"}</div>
      </div>
    </Link>
  );
}

export const newMessageToast = (message: MessageDto) => {
  toast(
    <NotificationToast
      image={message.senderImage}
      href={`/members/${message.senderId}/chat`}
      title={`${message.senderName} has sent you a new message`}
    />
  );
};

export const newLikeToast = (
  name: string,
  image: string | null,
  userId: string
) => {
  toast(
    <NotificationToast
      image={image}
      href={`/members/${userId}`}
      title={`You have been liked by ${name}`}
      subtitle="Click here to view their profile"
    />
  );
};
