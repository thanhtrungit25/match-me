"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { calculateAge } from "@/lib/util";
import { Member } from "@prisma/client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@heroui/react";
import PresenceDot from "@/components/PresenceDot";

type Props = {
  member: Member;
  navLinks: { name: string; href: string }[];
};

export default function MemberSidebar({ member, navLinks }: Props) {
  const pathname = usePathname();

  return (
    <Card className="w-full mt-10 items-center h-[80vh]">
      <Image
        src={member.image || "/images/user.png"}
        alt="User profile main image"
        height={200}
        width={200}
        className="rounded-full mt-6 aspect-square object-cover"
      />
      <CardBody className="overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="flex">
            <div className="text-2xl">
              {member.name}, {calculateAge(member.dateOfBirth)}
            </div>
            <div>
              <PresenceDot member={member} />
            </div>
          </div>
          <div className="text-sm text-neutral-500">
            {member.city}, {member.country}
          </div>
        </div>

        <Divider className="my-3" />

        <nav className="flex flex-col p-4 ml-4 text-2xl gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block rounded ${
                pathname === link.href
                  ? "text-default"
                  : "hover:text-default/50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          href="/members"
          fullWidth
          color="default"
          variant="bordered"
        >
          Go back
        </Button>
      </CardFooter>
    </Card>
  );
}
