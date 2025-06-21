'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, createNote, deleteNote } from '../../lib/api';
import { CreateNoteData } from '../../types/note';
import NoteList from '../../components/NoteList/NoteList';
import NoteForm from '../../components/NoteForm/NoteForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import css from './Notes.module.css';

export default function NotesClient() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const queryClient = useQueryClient();

    // Fetch notes
    const { data: notes = [], isLoading, error } = useQuery({
        queryKey: ['notes'],
        queryFn: fetchNotes,
    });

    // Create note mutation
    const createMutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            setShowForm(false);
        },
        onError: (error) => {
            console.error('Failed to create note:', error);
            alert('Failed to create note. Please try again.');
        },
    });

    // Delete note mutation
    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
        onError: (error) => {
            console.error('Failed to delete note:', error);
            alert('Failed to delete note. Please try again.');
        },
    });

    // Filter notes based on search term
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateNote = (noteData: CreateNoteData) => {
        createMutation.mutate(noteData);
    };

    const handleDeleteNote = (id: number) => {
        deleteMutation.mutate(id);
    };

    if (error) {
        return (
            <div className={css.container}>
                <div className={css.error}>
                    Failed to load notes: {error instanceof Error ? error.message : 'Unknown error'}
                </div>
            </div>
        );
    }

    return (
        <div className={css.container}>
            <div className={css.header}>
                <h1 className={css.title}>My Notes</h1>
                <button
                    className={css.createButton}
                    onClick={() => setShowForm(true)}
                    disabled={createMutation.isPending}
                >
                    {createMutation.isPending ? 'Creating...' : 'Create Note'}
                </button>
            </div>

            {showForm && (
                <div className={css.content}>
                    <h2>Create New Note</h2>
                    <NoteForm
                        onSubmit={handleCreateNote}
                        onCancel={() => setShowForm(false)}
                        isLoading={createMutation.isPending}
                    />
                </div>
            )}

            <div className={css.toolbar}>
                <SearchBox
                    value={searchTerm}
                    onChange={setSearchTerm}
                />
                <div>
                    {filteredNotes.length} of {notes.length} notes
                </div>
            </div>

            <div className={css.content}>
                <NoteList
                    notes={filteredNotes}
                    onDelete={handleDeleteNote}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}