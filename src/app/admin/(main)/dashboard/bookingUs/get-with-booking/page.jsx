"use client";

import dynamic from "next/dynamic";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { useGetBookingUsPageContent } from "@/hooks/useGetBookingUsPageContent";

// 🔁 Dynamic import with SSR disabled
const GetWithBookingForm = dynamic(
  () => import("@/components/admin/_components/book-us/GetWithBookingForm"),
  { ssr: false }
);

const GetWithBooking = () => {
  const {
    data: getWithBookingContent,
    loding: isGetWithBookingContentLoading,
    refetch
  } = useGetBookingUsPageContent("get_with_booking");

  console.log({ getWithBookingContent });

  if (isGetWithBookingContentLoading) {
    return <AdminPageLoader content={"Loading Get With Booking Content"} />;
  }

  return (
    <div className="p-3 bg-[#f0f3f8] min-h-screen">
      <p className="text-black text-xl font-semibold my-4">Get With Section Content</p>
      <GetWithBookingForm defaultValues={getWithBookingContent} refetch={refetch} />
    </div>
  );
};

export default GetWithBooking;
