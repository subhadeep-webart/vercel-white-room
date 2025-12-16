"use client";

import dynamic from "next/dynamic";

// 🔁 Dynamically import OnTheDayContentForm with SSR disabled
const OnTheDayContentForm = dynamic(
  () => import("@/components/admin/_components/ontheday/OntheDayContentForm"),
  { ssr: false }
);

const AddNewSectionPage = () => {
  return (
    <div className="p-3 bg-[#f0f3f8] min-h-screen">
      <div className="flex py-2 justify-between gap-2 items-center">
        <p className="text-black text-xl font-semibold my-4">Add New Section</p>
      </div>
      <OnTheDayContentForm />
    </div>
  );
};

export default AddNewSectionPage;
