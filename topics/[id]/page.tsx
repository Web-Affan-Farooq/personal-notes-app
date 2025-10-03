import { Sidebar } from "@/components/layout";
import { NotesDetailsPage } from "@/components/pages";

const DynamicNotesPage = () => {
  return (
    <>
      <div className="flex flex-row flex-nowrap gap-[10px] overflow-y-hidden h-screen">
        <Sidebar />
        <NotesDetailsPage />
      </div>
    </>
  );
};
export default DynamicNotesPage;
