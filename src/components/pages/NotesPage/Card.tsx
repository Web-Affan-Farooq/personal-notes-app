"use client";
// _____ Hooks ...
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNotes } from "@/store/notes";

// _____ Types and Actions  ...
import { Note } from "@/db/schema";
import DeleteNotesAction from "@/actions/DeleteNoteAction";
import EditNotesAction from "@/actions/EditNotesAction";

// _____ Library ...
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

// _____ Components  ...
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
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// import { Plus } from "lucide-react";

const EditNoteSchema = z.object({
  title: z
    .string("Invalid title")
    .min(5, "Minimum 5 characters required")
    .max(70, "Maximum 70 characters allowed"),
  description: z
    .string("Invalid description")
    .min(70, "Minimum 70 characters required"),
  date: z.date("Invalid date"),
  id: z.uuid("Invalid id"),
});

export default function NoteCard({ note }: { note: Note }) {
  const { editNote, deleteNote } = useNotes();

  const [disabled, setDisabled] = useState(false);

  // _____ React hook form ...
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(EditNoteSchema),
    defaultValues: {
      id: note.id,
      title: note.title,
      description: note.description,
      date: note.date,
    },
  });
  const SubmitNote = async (formData: z.infer<typeof EditNoteSchema>) => {
    // _____ Make sure to disable button before creating request ...
    setDisabled(true);
    try {
      const { message, success, note } = await EditNotesAction(formData);
      if (!success) {
        // _____ Show error if any
        toast.error(message);
      } else if (note) {
        // ____ update note in local state ...
        toast.success(message);
        editNote(note);
        reset();
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occured");
    }
    setDisabled(false);
  };

  return (
    <div className="bg-blue-600/10 backdrop-blur-md text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
      <Link href={`/notes/${note.id}`} className="block">
        <h2 className="text-xl font-bold mb-2 truncate">{note.title}</h2>
        <Separator />
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">
          {note.description}
        </p>
        <span className="text-sm text-indigo-500 font-medium">
          {new Date().toLocaleDateString()}
        </span>
      </Link>

      {/* Optional: Quick action buttons */}
      <div className="mt-4 flex space-x-2">
        <AlertDialog>
          <div className="flex flex-row gap-[10px] items-center">
            <AlertDialogTrigger className="cursor-pointer transition-all duration-200 ease-in-out text-sm bg-indigo-400/20 border-none px-[20px] rounded-md py-[5px] text-indigo-600 hover:text-white">
              <span>Edit</span>
            </AlertDialogTrigger>
            <button
              onClick={async () => {
                const { message, success } = await DeleteNotesAction(note.id);
                if (!success) {
                  toast.error(message);
                }
                deleteNote(note.id);
                toast.success(message);
              }}
              className="cursor-pointer transition-all duration-200 ease-in-out text-sm bg-indigo-400/20 border-none px-[20px] rounded-md py-[5px] text-red-600 hover:text-white"
            >
              Delete
            </button>
          </div>
          <AlertDialogContent className="bg-black/1 backdrop-blur-md border-none">
            <form
              onSubmit={handleSubmit(SubmitNote)}
              className="p-8 rounded-lg shadow-xl space-y-5"
            >
              <AlertDialogHeader>
                <AlertDialogTitle>Edit note</AlertDialogTitle>
                <AlertDialogDescription className="hidden">
                  Edit note
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div>
                <label htmlFor="title" className="text-sm text-white">
                  Edit Title
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
              <div>
                <label
                  htmlFor="content"
                  className="text-sm text-white"
                  id="description"
                >
                  Edit description
                </label>
                <Textarea
                  id="description"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 h-[150px] relative placeholder:absolute top-0 left-0"
                  placeholder="Edit description"
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
                  {disabled ? "Wait ..." : "Commit Changes"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
