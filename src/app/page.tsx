"use client";

// _____ Hooks ...
import { useForm } from "react-hook-form";
import { useState } from "react";

// _____ Constants ...
// import { notes } from "@/constants";

// _____ Library ...
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

// _____ Actions ...
import AddNoteAction from "@/actions/AddNoteAction";

// _____ Components ...
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import NoteCard from "./Card";
import { Input } from "@/components/ui/input";
import { useNotes } from "@/store/notes";

// _____ zod schema for validating form ...
const NoteFormSchema = z.object({
  title: z.string("Invalid title").min(5, "Minimum 5 characters required"),
  description: z
    .string("Invalid description")
    .min(70, "Minimum 70 characters required"),
});

export default function HomePage() {
  // ______ Getting notes from zustand state ...
  const { notes, addNote } = useNotes();

  // _____ React hook form ...
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(NoteFormSchema),
  });

  const [disabled, setDisabled] = useState(false);

  const SubmitNote = async (formData: z.infer<typeof NoteFormSchema>) => {
    // _____ Make sure to disable button before creating request ...
    setDisabled(true);
    try {
      const { message, success, note } = await AddNoteAction(formData);
      if (!success) {
        // _____ Show error if any
        toast.error(message);
      } else if (note) {
        // ____ Add notes to local state ...
        toast.success(message);
        addNote(note);
        reset();
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occured");
    }
    setDisabled(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-12 text-white">Your Notes</h1>
      <AlertDialog>
        <AlertDialogTrigger className="absolute right-10 top-17 bg-white text-black font-bold rounded-md flex flex-row flex-nowrap justify-center items-center gap-[10px] px-[20px] py-[5px]">
          <Plus size={20} />
          <span>Add</span>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-black/1 backdrop-blur-md border-none">
          <form
            onSubmit={handleSubmit(SubmitNote)}
            className="p-8 rounded-lg shadow-xl space-y-5"
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Add a new note</AlertDialogTitle>
              <AlertDialogDescription className="hidden">
                Add new note
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* _____ Input for title ... */}
            <div>
              <label htmlFor="title" className="text-sm text-white">
                Add Title
              </label>
              <Input
                id="title"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Note Title"
                required
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* _____ Input for description ... */}
            <div>
              <label htmlFor="content" className="text-sm text-white">
                Add Content
              </label>
              <textarea
                id="content"
                className="mt-1 h-[150px] block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write your note here..."
                required
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer transition-all duration-200 ease-in-out text-sm bg-indigo-400/20 border-none px-[20px] rounded-md py-[5px] text-red-600 hover:text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                disabled={disabled}
                className={`cursor-pointer transition-all duration-200 ease-in-out text-sm bg-indigo-400/20 border-none px-[20px] rounded-md py-[5px] text-indigo-600 hover:text-white ${
                  disabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {disabled ? "Wait ..." : "Add"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      {/* _____ Notes list ... */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
