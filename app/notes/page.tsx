// import {
//     HydrationBoundary,
//     QueryClient,
//     dehydrate,
//   } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const initialData = await fetchNotes(1, '');

  return (
    <NotesClient initialData={initialData} />
  );



  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ['notes', 1, ''],
  //   queryFn: () => fetchNotes(1, ''),
  // });

  // return (
  //   <HydrationBoundary state={dehydrate(queryClient)}>
  //     <NotesClient />
  //   </HydrationBoundary>
  // );
}
