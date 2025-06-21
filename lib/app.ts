import axios from 'axios';
import { Note, CreateNoteData, UpdateNoteData } from '../types/note';

const API_BASE_URL = 'https://notehub-api.example.com';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
});

export const fetchNotes = async (): Promise<Note[]> => {
    const response = await api.get('/notes');
    return response.data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
    const response = await api.post('/notes', noteData);
    return response.data;
};

export const updateNote = async (id: number, noteData: UpdateNoteData): Promise<Note> => {
    const response = await api.put(`/notes/${id}`, noteData);
    return response.data;
};

export const deleteNote = async (id: number): Promise<void> => {
    await api.delete(`/notes/${id}`);
};