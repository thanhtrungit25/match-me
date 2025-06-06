"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";

import { addImage } from "@/app/actions/userActions";

import ImageUploadButton from "@/components/ImageUploadButton";

export default function MemberPhotoUpload() {
  const router = useRouter();

  const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === "object") {
      await addImage(result.info.secure_url, result.info.public_id);

      router.refresh();
    } else {
      toast.error("Problem adding image");
    }
  };

  return (
    <div>
      <ImageUploadButton onUploadImage={onAddImage} />
    </div>
  );
}
