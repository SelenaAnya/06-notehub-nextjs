import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';


interface NoteDetailsPageProps {
    params: {
        id: string;
    };
}

export default async function NoteDetailsPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const queryClient = new QueryClient();
    const noteId = parseInt(id, 10);

    try {
        await queryClient.prefetchQuery({
            queryKey: ['note', noteId],
            queryFn: () => fetchNoteById(noteId),
        });
    } catch (error) {
        console.error('Failed to prefetch note:', error);
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
}