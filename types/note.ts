export interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

export interface CreateNoteData {
    title: string;
    content: string;
}

export interface UpdateNoteData {
    title?: string;
    content?: string;
}