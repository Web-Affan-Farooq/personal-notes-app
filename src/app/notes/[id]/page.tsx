"use client";
import Link from "next/link";
import { notes } from "@/constants";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function NotePage() {
  const { id } = useParams();
  const note = useMemo(() => {
    return notes.find((n) => n.id === id);
  }, [id]);

  if (!note) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Note Not Found</h1>
        <Link href="/" className="text-blue-500 hover:underline mt-4 block">
          Go back home
        </Link>
      </div>
    );
  }

  // Handle Delete (Frontend Action)
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${note.title}"?`)) {
      // Logic to call an API or update state to delete the note
      alert(`Note ${note.id} deleted (placeholder action).`);
      // Use router.push('/') to navigate back to the home page after deletion
    }
  };

  return (
    <div className="my-20 container mx-auto p-6 max-w-2xl">
      <div className="bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
          {note.title}
        </h1>
        <p className="text-sm text-indigo-600 mb-6 border-b pb-4">
          Created on: {note.date}
        </p>

        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-sm">
          {note.content}
        </div>

        <div className="mt-8 pt-6 border-t flex justify-end space-x-4">
          <Link
            href={`/notes/edit/${note.id}`}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Edit Note
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
}
