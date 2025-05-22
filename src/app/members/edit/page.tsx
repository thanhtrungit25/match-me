import React from "react";
import { notFound } from "next/navigation";

import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberActions";

import CardInnerWrapper from "@/components/CardInnerWrapper";
import EditForm from "./EditForm";

export default async function EditPage() {
  const userId = await getAuthUserId();

  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return (
    <CardInnerWrapper
      header="Edit Profile"
      body={<EditForm member={member} />}
    />
  );
}
