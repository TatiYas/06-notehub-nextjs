"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import css from "@/app/page.module.css";
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 300);

  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", currentPage, debouncedSearch],
    queryFn: () => fetchNotes(currentPage, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    if (data && data.notes.length === 0) {
      toast.error("No notes found.");
    }
  }, [data]);

  if (!data) return null;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onChange={setSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button
          className={css.button}
          onClick={() => setModalOpen(true)}
        >
          Create note +
        </button>

        {modalOpen && (
          <Modal onClose={() => setModalOpen(false)}>
            <NoteForm
              onCancel={() => setModalOpen(false)}
              onSuccess={() => setModalOpen(false)}
            />
          </Modal>
        )}
      </div>

      {data.notes.length > 0 && <NoteList notes={data.notes} />}

      <Toaster />
    </div>
  );
}
