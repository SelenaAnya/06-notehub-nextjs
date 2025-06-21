'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, createNote, deleteNote } from '../../lib/api';
import { Note, CreateNoteData } from '../../types/note';
import NoteList from '../../components/NoteList/NoteList';
import NoteForm from '../../components/NoteForm/NoteForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import css from './Notes.module.css';

export default function NotesClient() {
    const [searchTerm, setSearchTerm] = useState('');
    const queryClient = useQueryClient();

    const { data: notes = [], isLoading, error } = useQuery({
        queryKey: ['notes'],
        queryFn: fetchNotes,
    });

    const createNoteMutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    const deleteNoteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    const handleCreateNote = (noteData: CreateNoteData) => {
        createNoteMutation.mutate(noteData);
    };

    const handleDeleteNote = (id: number) => {
        deleteNoteMutation.mutate(id);
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <p>Loading, please wait...</p>;
    if (error) return <p>Something went wrong.</p>;

    return (
        <div className={css.container}>
            <h1 className={css.title}>My Notes</h1>
            <SearchBox value={searchTerm} onChange={setSearchTerm} />
            <NoteForm onSubmit={handleCreateNote} />
            <NoteList
                notes={filteredNotes}
                onDelete={handleDeleteNote}
            />
        </div>
    );
}