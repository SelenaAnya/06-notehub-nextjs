import { useState } from 'react';
import { CreateNoteData } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
    onSubmit: (noteData: CreateNoteData) => void;
}

export default function NoteForm({ onSubmit }: NoteFormProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            return;
        }

        onSubmit({
            title: title.trim(),
            content: content.trim(),
        });

        setTitle('');
        setContent('');
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>  {/* ✅ Існує в CSS */}
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    className={css.input}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter note title"
                    required
                />
            </div>
            <div className={css.formGroup}>  {/* ✅ Існує в CSS */}
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    className={css.textarea}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter note content"
                    rows={4}
                    required
                />
            </div>
            <button type="submit" className={css.submitButton}>  {/* ✅ Існує в CSS */}
                Create Note
            </button>
        </form>
    );
}