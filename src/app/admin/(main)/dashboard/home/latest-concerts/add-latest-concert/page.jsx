"use client";

import dynamic from "next/dynamic";

const LatestConcertForm = dynamic(
  () => import("@/components/admin/_components/home/LatestConcertForm"),
  { ssr: false }
);

const AddLatestConcertPage = () => {
  return (
    <div className="p-3 bg-[#f0f3f8]">
      <div className="max-w-full p-6 rounded-md space-y-6">
        <LatestConcertForm />
      </div>
    </div>
  );
};

export default AddLatestConcertPage;
