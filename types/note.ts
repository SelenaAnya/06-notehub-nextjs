export interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tag: string;
  }

export interface CreateNoteData {
    title: string;
    content: string;
}

export interface UpdateNoteData {
    title?: string;
    content?: string;
}

export interface NewNoteData {
    title: string;
    content: string;
    tag: string;
  }