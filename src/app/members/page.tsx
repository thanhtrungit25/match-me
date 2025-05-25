import { GetMemberParams } from "@/types";

import { getMembers } from "../actions/memberActions";
import { fetchCurrentUserLikeIds } from "../actions/likeActions";

import MemberCard from "./MemberCard";
import EmptyState from "@/components/EmptyState";
import PaginationComponent from "@/components/PaginationComponent";

export default async function MembersPage({
  searchParams,
}: {
  searchParams: GetMemberParams
}) {
  const { items: members, totalCount } = await getMembers(searchParams);

  const likeIds = await fetchCurrentUserLikeIds();

  if (members.length === 0) {
    return <EmptyState />
  }

  return (
    <>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
        {members &&
          members.map((member) => (
            <MemberCard key={member.id} member={member} likeIds={likeIds} />
          ))}
      </div>
      <PaginationComponent
        totalCount={totalCount}
      />
    </>
  );
}
