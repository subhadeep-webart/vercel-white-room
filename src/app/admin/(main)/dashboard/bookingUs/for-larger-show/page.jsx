"use client";

import dynamic from "next/dynamic";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { useGetBookingUsPageContent } from "@/hooks/useGetBookingUsPageContent";

// 🔁 Dynamically import ForLargerShowsForm with SSR disabled
const ForLargerShowsForm = dynamic(
  () => import("@/components/admin/_components/book-us/ForLargerShowsForm"),
  { ssr: false }
);

const ForLargerShow = () => {
  const {
    data: forLargerShowContent,
    loding: isLargerShowLoading,
    refetch,
  } = useGetBookingUsPageContent("larger_shows");

  console.log({ forLargerShowContent });

  if (isLargerShowLoading) {
    return <AdminPageLoader content={"Loading Larger Show Content"} />;
  }

  return (
    <div className="p-3 bg-[#f0f3f8] min-h-screen">
      <p className="text-black text-xl font-semibold my-4">
        Larger Show Section Content
      </p>
      <ForLargerShowsForm
        defaultValues={forLargerShowContent}
        refetch={refetch}
      />
    </div>
  );
};

export default ForLargerShow;
