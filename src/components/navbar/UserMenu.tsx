"use client";

import React from 'react';
import Link from 'next/link';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@heroui/react';
import { Session } from 'next-auth';
import { signOutUser } from '@/app/actions/authActions';

type Props = {
  user: Session["user"]
}

export default function UserMenu({
  user
}: Props){
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          as="button"
          isBordered
          className="transition-transform"
          color="default"
          name={user?.name || "user avatar"}
          size="sm"
          src={user?.image || "/images/user.png"}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User actions menu">
        <DropdownSection showDivider>
          <DropdownItem
            key="username"
            isReadOnly
            as="span"
            className="h-14 flex flex-row"
            aria-label="username"
          >
            Signed in as {user?.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem as={Link} href="/members/edit" key="edit">
          Edit profile
        </DropdownItem>
        <DropdownItem color="danger" key="logout" onClick={async () => signOutUser()}>
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};