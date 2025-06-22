import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
  } from '@tanstack/react-query';
  import { fetchNotes } from '@/lib/api';
  import NotesClient from '../Notes.client';
  
  type Props = {
    params: {
      id: string;
    };
};
  
export default async function NotesPage({ params }: Props) {
    const { id } = await params;
    const noteId = Number(id);
    const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery({
        queryKey: ['notes', noteId],
        queryFn: () => fetchNotes(noteId),
    });
  
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    );
  }