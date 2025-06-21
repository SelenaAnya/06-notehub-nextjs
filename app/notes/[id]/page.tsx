import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';


interface NoteDetailsPageProps {
    params: {
        id: string;
    };
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
    const queryClient = new QueryClient();
    const noteId = parseInt(params.id, 10);

    // Prefetch data for hydration
    try {
        await queryClient.prefetchQuery({
            queryKey: ['note', noteId],
            queryFn: () => fetchNoteById(noteId),
        });
    } catch (error) {
        // Handle prefetch error gracefully
        console.error('Failed to prefetch note:', error);
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
}