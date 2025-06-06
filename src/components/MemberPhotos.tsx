"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Photo } from "@prisma/client";
import { deleteImage, setMainImage } from "@/app/actions/userActions";

import MemberImage from "./MemberImage";
import StarButton from "./StarButton";
import DeleteButton from "./DeleteButton";

type Props = {
  photos?: Photo[] | null;
  editing?: boolean;
  mainImageUrl?: string | null;
};

export default function MemberPhotos({ photos, editing, mainImageUrl }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState({
    type: "",
    isLoading: false,
    id: "",
  });

  const onSetMain = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;

    setLoading({
      isLoading: true,
      id: photo.id,
      type: "main",
    });

    try {
      await setMainImage(photo);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading({
        isLoading: false,
        id: "",
        type: "",
      });
    }
  };

  const onDelete = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;

    setLoading({
      isLoading: true,
      id: photo.id,
      type: "delete",
    });

    await deleteImage(photo);
    router.refresh();
    setLoading({
      isLoading: false,
      id: "",
      type: "",
    });
  };

  return (
    <div className="grid grid-cols-5 gap-3 p-5">
      {photos &&
        photos.map((photo) => (
          <div key={photo.id} className="relative">
            <MemberImage photo={photo} />
            {editing && (
              <>
                <div
                  onClick={() => onSetMain(photo)}
                  className="absolute top-3 left-3 z-50"
                >
                  <StarButton
                    selected={photo.url === mainImageUrl}
                    loading={
                      loading.isLoading &&
                      loading.type === "main" &&
                      loading.id === photo.id
                    }
                  />
                </div>
                <div
                  onClick={() => onDelete(photo)}
                  className="absolute top-3 right-3 z-50"
                >
                  <DeleteButton
                    loading={
                      loading.isLoading &&
                      loading.type === "delete" &&
                      loading.id === photo.id
                    }
                  />
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
}
