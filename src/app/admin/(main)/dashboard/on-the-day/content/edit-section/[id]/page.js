"use client";

import AdminPageLoader from "@/components/common/AdminPageLoader";
import { useGetOnTheDayContentById } from "@/hooks/useGetOnTheDayContentById";
import useUpdateOnTheDayContent from "@/hooks/useUpdateOnTheDayContent";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect } from "react";

// 🔁 Dynamically import OnTheDayContentForm with SSR disabled
const OnTheDayContentForm = dynamic(
  () => import("@/components/admin/_components/ontheday/OntheDayContentForm"),
  { ssr: false }
);

const EditSectionPage = () => {
  const params = useParams();
  const { id } = params;

  const {
    content,
    loading: isContentLoading,
    refetch,
  } = useGetOnTheDayContentById();

  console.log("Content Data======>", content);

  useEffect(() => {
    if (id) {
      refetch(id);
    }
  }, [id]);

  console.log("Content===>", content);

  if (isContentLoading) {
    return <AdminPageLoader content={"Loading On The Day Content"} />;
  }
  return (
    <div className="p-3 bg-[#f0f3f8] min-h-screen">
      <div className="flex py-2 justify-between gap-2 items-center">
        <p className="text-black text-xl font-semibold my-4">Edit Section</p>
      </div>
      <OnTheDayContentForm
        isEdited={true}
        refetch={refetch}
        defaultValues={content ?? {}}
      />
    </div>
  );
};

export default EditSectionPage;
