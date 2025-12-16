"use client";

import dynamic from "next/dynamic";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { useGetBookingUsPageContent } from "@/hooks/useGetBookingUsPageContent";

// 🔁 Dynamically import OptionalAddOnForm with SSR disabled
const OptionalAddOnForm = dynamic(
  () => import("@/components/admin/_components/book-us/OptionalAddOnForm"),
  { ssr: false }
);

const OptionalAddOn = () => {
  const {
    data: optionalAddOnSectionContent,
    loding: isLargerShowLoading,
    refetch
  } = useGetBookingUsPageContent("optional_add_on");

  console.log({ optionalAddOnSectionContent });

  if (isLargerShowLoading) {
    return <AdminPageLoader content={"Loading Optional Add On Content"} />;
  }

  return (
    <div className="p-3 bg-[#f0f3f8] min-h-screen">
      <p className="text-black text-xl font-semibold my-4">Optional Add On Section Content</p>
      <OptionalAddOnForm defaultValues={optionalAddOnSectionContent} refetch={refetch} />
    </div>
  );
};

export default OptionalAddOn;
