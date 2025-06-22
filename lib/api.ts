// lib/api.ts
import axios, { type AxiosResponse } from 'axios';
import { Note } from '../types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api/notes';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  export interface CreateNoteRequest {
    title: string;
    content: string;
    tag?: string;
  }
  
  export interface NotesResponse {
    notes: Note[];
    totalPages: number;
  }
  
  export interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
  }
  
  export const fetchNotes = async (
    currentPage: number = 1, 
    debounceSearchTerm: string = '', 
    perPage: number = 12
  ): Promise<NotesResponse> => {
    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      perPage: perPage.toString(),
    });
    
    if (debounceSearchTerm?.trim()) {
        queryParams.append('search', debounceSearchTerm.trim());
      }
  
    try {
      const response: AxiosResponse<NotesResponse> = await api.get(`?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  };
  
  export const createNote = async (noteData: CreateNoteRequest): Promise<Note> => {
    const response: AxiosResponse<Note> = await api.post('', noteData);
    return response.data;
  };
  
  export const deleteNote = async (id: number): Promise<Note> => {
    const response: AxiosResponse<Note> = await api.delete(`/${id}`);
    return response.data;
};
  
export const fetchNoteById = async (id: number): Promise<Note> => {
    const response: AxiosResponse<Note> = await api.get(`/${id}`);
    return response.data;
  };