"use client";

import { useNotes } from "@/store/notes";
import { useEffect } from "react";
import FetchNotesAction from "@/actions/FetchNotes";
import { toast } from "sonner";

const FetchNotes = ({ children }: { children: React.ReactNode }) => {
  const { setNotes } = useNotes();

  useEffect(() => {
    const getData = async () => {
      console.log(
        "-------------------  Running data fetches  ---------------------------"
      );
      const { message, success, notes } = await FetchNotesAction();
      if (!success && !notes) {
        toast.error(message);
      }
      if (notes) {
        setNotes(notes);
      }
      console.log(
        "-------------------  Fetch completed  ---------------------------"
      );
    };

    getData();
    setInterval(() => {
      getData();
    }, 240000);
  }, [setNotes]);
  return <>{children}</>;
};
export default FetchNotes;
