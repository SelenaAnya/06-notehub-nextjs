import { useState } from 'react';
import { CreateNoteData } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
    onSubmit: (noteData: CreateNoteData) => void;
    onCancel?: () => void;
    isLoading?: boolean;
}

export default function NoteForm({ onSubmit, onCancel, isLoading = false }: NoteFormProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

    const validateForm = () => {
        const newErrors: { title?: string; content?: string } = {};

        if (!title.trim()) {
            newErrors.title = 'Title is required';
        } else if (title.trim().length < 3) {
            newErrors.title = 'Title must be at least 3 characters long';
        }

        if (!content.trim()) {
            newErrors.content = 'Content is required';
        } else if (content.trim().length < 10) {
            newErrors.content = 'Content must be at least 10 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        onSubmit({
            title: title.trim(),
            content: content.trim(),
        });

        // Очищаємо форму після успішної відправки
        setTitle('');
        setContent('');
        setErrors({});
    };

    const handleCancel = () => {
        setTitle('');
        setContent('');
        setErrors({});
        onCancel?.();
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    className={css.input}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter note title"
                    disabled={isLoading}
                    required
                />
                {errors.title && <div className={css.error}>{errors.title}</div>}
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    className={css.textarea}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter note content"
                    rows={4}
                    disabled={isLoading}
                    required
                />
                {errors.content && <div className={css.error}>{errors.content}</div>}
            </div>

            <div className={css.actions}>
                {onCancel && (
                    <button
                        type="button"
                        className={css.cancelButton}
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating...' : 'Create Note'}
                </button>
            </div>
        </form>
    );
}