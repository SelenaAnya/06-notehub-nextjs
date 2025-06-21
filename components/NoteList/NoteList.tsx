import Link from 'next/link';
import { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
    notes: Note[];
    onDelete: (id: number) => void;
    isLoading?: boolean;
}

export default function NoteList({ notes, onDelete, isLoading = false }: NoteListProps) {
    if (isLoading) {
        return <div className={css.emptyMessage}>Loading notes...</div>;
    }

    if (notes.length === 0) {
        return <div className={css.emptyMessage}>No notes found. Create your first note!</div>;
    }

    const handleDelete = (id: number, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            onDelete(id);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.listItem}>
                    <h3 className={css.title}>{note.title}</h3>
                    <p className={css.content}>{note.content}</p>
                    <p className={css.date}>
                        Created: {formatDate(note.createdAt)}
                    </p>
                    <div className={css.footer}>
                        <Link href={`/notes/${note.id}`} className={css.link}>
                            View Details
                        </Link>
                        <button
                            className={css.button}
                            onClick={() => handleDelete(note.id, note.title)}
                            title={`Delete "${note.title}"`}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}