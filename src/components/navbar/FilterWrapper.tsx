"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Filters from "./Filters";

export default function FilterWrapper() {
  const pathname = usePathname();

  if (pathname === "/members") return <Filters />;
  else return null;
}
