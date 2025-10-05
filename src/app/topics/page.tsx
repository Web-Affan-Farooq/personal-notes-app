import { Sidebar } from "@/components/layout";
import { TopicsPage } from "@/components/pages";

const Topics = () => {
  return (
    <>
      <div className="flex flex-row flex-nowrap gap-[10px] overflow-y-hidden h-screen">
        <Sidebar />
        <TopicsPage />
      </div>
    </>
  );
};

export default Topics;
