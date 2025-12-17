"use client";

import AddLatestConcertsContent from "@/components/admin/_components/home/add-latest-concerts-content";
import LatestConcertTable from "@/components/admin/_components/home/LatestConcertTable";
import Tables from "@/components/admin/_components/tables/page";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { Button } from "@/components/ui/button";
import useGetConcerts from "@/hooks/useGetConcerts";
import Link from "next/link";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

const LatestConcerts = () => {
  const {
    concerts,
    loading: isConcertsDataLoading,
    refetch,
  } = useGetConcerts();
  const [openAddContent, setOpenAddContent] = useState(false);
  const columns = [
    { header: "Concerts Name", accessorKey: "concert_name" },
    { header: "Concert Description", accessorKey: "concert_description" },
    { header: "Concert Poster", accessorKey: "concert_image_url" },
    { header: "Youtube Link", accessorKey: "youtube_link" },
    { header: "Actions", accessorKey: "actions" },
  ];

  console.log("Concerts Data=====>", concerts);

  if (isConcertsDataLoading) {
    return <AdminPageLoader content={"Loading Latest Concerts Content"} />;
  }

  return (
    <>
      <div className="p-3 bg-[#f0f3f8]">
        <div className="flex justify-end items-end">
          <Link
            href={"/admin/dashboard/home/latest-concerts/add-latest-concert"}
            type="button"
            className="btn-11 relative inline-flex items-center gap-2 bg-white text-[#0F1116] font-bold text-sm w-32 py-2 px-4 mb-4 mt-4 
   border-2 border-black overflow-hidden transition-all duration-300 hover:text-white whitespace-nowrap text-center rounded-lg"
          >
            <IoMdAddCircle size={20} />
            <span>Add Content</span>
          </Link>
        </div>
        {/* <Tables
          caption="A list of your latests."
          columns={columns}
          data={data}
        /> */}
        <LatestConcertTable
          columns={columns}
          data={concerts}
          refetch={refetch}
        />
      </div>
    </>
  );
};

export default LatestConcerts;
