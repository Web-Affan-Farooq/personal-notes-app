"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AddNoteAction from "@/actions/AddNoteAction";
import { toast } from "sonner";

const NoteFormSchema = z.object({
  title: z
    .string("Invalid title")
    .min(5, "Minimum 5 characters required")
    .max(70, "Maximum 70 characters allowed"),
  description: z
    .string("Invalid description")
    .min(70, "Minimum 70 characters required"),
});
export default function NoteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(NoteFormSchema),
  });

  const SubmitNote = async (formData: z.infer<typeof NoteFormSchema>) => {
    try {
      const { message, success } = await AddNoteAction(formData);
      if (!success) {
        toast.error(message);
      }
      toast.success(message);
    } catch (err) {
      console.log(err);
      toast.error("An error occured");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(SubmitNote)}
      className="bg-white p-8 rounded-lg shadow-xl space-y-4"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
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
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          id="content"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Write your note here..."
          required
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
      >
        Save Note
      </button>
    </form>
  );
}
