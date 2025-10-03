"use server";

import db from "@/db";
import { Note, note } from "@/db/schema";

const FetchNotesAction = async (): Promise<{
  message: string;
  success: boolean;
  notes?: Note[];
}> => {
  try {
    const notes = await db.select().from(note);
    notes.sort((a, b) => {
      const dateA = new Date(a.date as any).getTime();
      const dateB = new Date(b.date as any).getTime();
      return dateB - dateA;
    });
    return {
      success: true,
      message: "",
      notes: notes,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "An error occured",
      success: false,
    };
  }
};

export default FetchNotesAction;
