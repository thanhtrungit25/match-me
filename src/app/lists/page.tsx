import React from 'react'
import { fetchCurrentUserLikeIds, fetchLikedMembers } from '../actions/likeActions'
import ListsTab from './ListTab';

export const dynamic = "force-dynamic";

export default async function ListPage({
  searchParams,
}: {
  searchParams: { type: string }
}) {
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(
    searchParams.type
  );

  return (
    <div>
      <ListsTab
        likeIds={likeIds}
        members={members}
      />
    </div>
  )
}
