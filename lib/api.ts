import axios from "axios";
import type { Note, NoteFormValues } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const API_BASE_URL = "https://notehub-public.goit.study/api";
const AUTH_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export async function fetchNotes(
  page: number = 1,
  search: string = ""
): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 10,
      search: search || undefined,
    },
  });

  console.log("DATA:", response.data);
  return response.data;
}

export async function createNote(
  noteValues: NoteFormValues
): Promise<Note> {
  const response = await api.post<Note>("/notes", noteValues);

  console.log(response.data);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);

  console.log(response.data);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}
