import { Sidebar } from "@/components/layout";
import { NotesPage } from "@/components/pages";

const Notes = () => {
  return (
    <>
      <div className="flex flex-row flex-nowrap gap-[10px] overflow-y-hidden h-screen">
        <Sidebar />
        <NotesPage />
      </div>
    </>
  );
};

export default Notes;
