import Link from 'next/link';
import { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
    notes: Note[];
    onDelete: (id: number) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
    if (notes.length === 0) {
        return <p className={css.emptyMessage}>No notes found.</p>;
    }

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.item}>
                    <div className={css.content}>
                        <h3 className={css.title}>{note.title}</h3>
                        <p className={css.text}>{note.content}</p>
                        <p className={css.date}>
                            {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className={css.actions}>
                        <Link href={`/notes/${note.id}`} className={css.viewBtn}>
                            View details
                        </Link>
                        <button
                            className={css.deleteBtn}
                            onClick={() => onDelete(note.id)}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}