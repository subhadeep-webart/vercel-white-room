"use client"

import MediaTable from "@/components/admin/_components/media/MediaTable";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { Button } from "@/components/ui/button";
import { useGetMediaPageContent } from "@/hooks/useGetMediaPageContent";
import { getComponentByType } from "@/utils/helper";
import Link from "next/link";
import { IoMdAddCircle } from "react-icons/io";

const MediaPage = () => {
    const {
        data: mediaContent,
        loading: isMediaContentLoading,
       refetch
      } = useGetMediaPageContent();

        const contents = getComponentByType(mediaContent, "media_assets");
        console.log("about_us", contents);

    if (isMediaContentLoading) {
        return <AdminPageLoader content={"Loading the media content"} />
    }

    if (isMediaContentLoading) {
        return <AdminPageLoader content={"Loading Media Content"} />
    }

    const { media_assets = [] } = contents;
    console.log("Media Content Data======>", contents);

    return (
        <>
            <div className="p-3 bg-[#f0f3f8] min-h-screen">
                <div className="flex py-2 justify-between gap-2 items-center">
                    <p className="text-black text-xl font-semibold my-4">Media Page Content</p>
                    <Link
                        href="/admin/dashboard/media/add-media"
                        type="button"
                        className="relative inline-flex items-center gap-2 bg-white text-[#0F1116] font-bold text-sm w-32 py-2 px-4 mb-4 mt-4 
   border-2 border-black overflow-hidden transition-all duration-300 hover:text-black whitespace-nowrap text-center rounded-lg"
                    >
                        <IoMdAddCircle size={20} />
                        <span>Add Content</span>
                    </Link>
                </div>
                <MediaTable data={media_assets ?? []} refetch={refetch} />
            </div>
        </>
    )
}

export default MediaPage;