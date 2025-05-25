import { Spinner } from "@heroui/react";
import React from "react";

export default function LoadingComponent({
  label,
}: {
  label?: string;
}) {
  return (
    <div className="fixed flex justify-center items-center">
      <Spinner
        label={label || "Loading..."}
        color="default"
      />
    </div>
  );
}