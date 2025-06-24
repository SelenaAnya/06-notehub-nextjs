import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Note } from '@/types/note';
import { deleteNote } from '@/lib/api';


interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      // Disable the cache to update the list of notes
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNoteMutation.mutate(id);
    }
  };

  return (
    <div>
      {notes.length === 0 ? (
        <p>Notes not found</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <Link href={`/notes/${note.id}`}>
                <div>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <span>Тег: {note.tag}</span>
                </div>
              </Link>
              <button
                onClick={() => handleDelete(note.id)}
                disabled={deleteNoteMutation.isPending}
              >
                {deleteNoteMutation.isPending ? 'Delete...' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}