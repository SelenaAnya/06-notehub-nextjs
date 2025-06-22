'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes  } from '@/lib/api';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient() {
    const params = useParams();
    const noteId = parseInt(params.id as string, 10);

    const { data: note, isLoading, error } = useQuery({
        queryKey: ['note', noteId],
        queryFn: () => fetchNotes(1, '', 10).then(res => res.notes.find((n: any) => n.id === noteId)),
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (error || !note) return <p>Something went wrong.</p>;

    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                    <button className={css.editBtn}>Edit note</button>
                </div>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>
                    {new Date(note.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}