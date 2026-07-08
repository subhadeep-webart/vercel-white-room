"use client";

import dynamic from "next/dynamic";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { useGetOnTheDayPageContent } from "@/hooks/useGetOnTheDayPageContent";
import { ON_THE_TABLE_COLUMNS } from "@/utils/constants";
import Link from "next/link";
import { IoMdAddCircle } from "react-icons/io";
import { getComponentByType } from "@/utils/helper";

// 🔁 Dynamic import with SSR disabled
const OntheDayContentTable = dynamic(
  () => import("@/components/admin/_components/ontheday/OntheDayContentTable"),
  { ssr: false }
);

const OnTheDayPage = () => {
  const {
    data: onTheDayPageContent,
    loading: isOnTheDayPageLoading,
    refetch,
  } = useGetOnTheDayPageContent();

  console.log("On the day page content======>", onTheDayPageContent);

  if (isOnTheDayPageLoading) {
    return <AdminPageLoader content={"Loading on the day page content"} />;
  }

  const contents = getComponentByType(onTheDayPageContent, "contents");
  console.log("contents", contents);

  return (
    <div className="p-3 bg-[#f0f3f8] min-h-screen">
      <div className="flex py-2 justify-between gap-2 items-center">
        <p className="text-black text-xl font-semibold my-4">
          On The Page Content
        </p>
        <Link
          href="/admin/dashboard/on-the-day/content/add-new-section"
          className="relative inline-flex items-center gap-2 bg-white text-[#0F1116] font-bold text-sm w-32 py-2 px-4 mb-4 mt-4 
            border-2 border-black overflow-hidden transition-all duration-300 hover:text-black whitespace-nowrap text-center rounded-lg"
        >
          <IoMdAddCircle size={20} />
          <span>Add Content</span>
        </Link>
      </div>

      <OntheDayContentTable
        columns={ON_THE_TABLE_COLUMNS}
        data={contents?.contents ?? []}
        refetch={refetch}
      />
    </div>
  );
};

export default OnTheDayPage;
