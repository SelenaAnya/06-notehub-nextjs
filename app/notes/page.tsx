// import {
//     HydrationBoundary,
//     QueryClient,
//     dehydrate,
//   } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const initialData = await fetchNotes(1, '');
  const notes = await getNotes()
  return (
    <div>
      <h1>Notes</h1>
      <br />
      <NotesClient items={notes} />
    </div>
  )
}

export default NotesPage;