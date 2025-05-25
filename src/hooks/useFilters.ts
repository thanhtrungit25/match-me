import { ChangeEvent, useEffect, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaMale, FaFemale } from "react-icons/fa";
import { SharedSelection } from "@heroui/react";

import useFilterStore from "./useFilterStore";
import usePaginationStore from "./usePaginationStore";

export const useFilters = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { filters, setFilters } = useFilterStore();

  const { pageNumber, pageSize, setPage, totalCount } = usePaginationStore(
    (state) => ({
      pageNumber: state.pagination.pageNumber,
      pageSize: state.pagination.pageSize,
      setPage: state.setPage,
      totalCount: state.pagination.totalCount,
    })
  );

  const genderList = [
    { value: "male", icon: FaMale },
    { value: "female", icon: FaFemale },
  ];

  const orderByList = [
    { label: "Last active", value: "updated" },
    { label: "Newest members", value: "created" },
  ];

  const { gender, ageRange, orderBy, withPhoto } = filters;  

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (gender || ageRange || orderBy || withPhoto) {
      setPage(1);
    }
  }, [gender, ageRange, orderBy, setPage, withPhoto]);

  useEffect(() => {
    startTransition(() => {
      const searchParams = new URLSearchParams();

      if (gender) searchParams.set("gender", gender.join(","));
      if (ageRange) searchParams.set("ageRange", ageRange.toString());
      if (orderBy) searchParams.set("orderBy", orderBy);
      if (pageSize) searchParams.set("pageSize", pageSize.toString());
      if (pageNumber) searchParams.set("pageNumber", pageNumber.toString());
      searchParams.set("withPhoto", withPhoto.toString());

      router.replace(`${pathname}?${searchParams}`);
    });
  }, [
    ageRange,
    orderBy,
    gender,
    router,
    pathname,
    withPhoto,
    pageNumber,
    pageSize,
  ]);

  const handleGenderSelect = (value: string) => {
    if (gender.includes(value))
      setFilters(
        "gender",
        gender.filter((g) => g !== value)
      );
    else setFilters("gender", [...gender, value]);
  };

  const handleAgeSelect = (value: number[]) => {
    setFilters("ageRange", value);
  };

  const handleWithPhotoToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters("withPhoto", e.target.checked);
  };

  const handleOrderSelect = (value: SharedSelection) => {
    if (value instanceof Set) {
      setFilters("orderBy", value.values().next().value);
    }
  };

  return {
    genderList,
    orderByList,
    selectGender: handleGenderSelect,
    selectAge: handleAgeSelect,
    selectWithPhoto: handleWithPhotoToggle,
    selectOrder: handleOrderSelect,
    filters,
    isPending,
    totalCount,
  };
};
