import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Note } from '@/types/note';
import { deleteNote } from '@/lib/api';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(Number(id)),
    onSuccess: () => {
      // Invalidate the cache to update the list of notes
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
        <ul className={css.list}>
          {notes.map((note) => (
            <li key={note.id} className={css.listItem}>
              <h3 className={css.title}>{note.title}</h3>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <div>
                  <Link href={`/notes/${note.id}`} className={css.link}>
                    View
                  </Link>
                  <button
                    className={css.button}
                    onClick={() => handleDelete(note.id.toString())}
                    disabled={deleteNoteMutation.isPending}
                  >
                    {deleteNoteMutation.isPending ? 'Delete...' : 'Delete'}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}