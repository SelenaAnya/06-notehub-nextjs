import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
    const queryClient = new QueryClient();
  
    // Fixing the fetchNotes call
    await queryClient.prefetchQuery({
      queryKey: ['notes', 1, ''],
      queryFn: () => fetchNotes(1, '', 12), 
    });
  
    const dehydratedState = dehydrate(queryClient);
  
    return (
      <HydrationBoundary state={dehydratedState}>
        <NotesClient />
      </HydrationBoundary>
    );
  }