"use client"

import AddArtistDialog from "@/components/admin/_components/home/AddArtistDialog";
import ArtistNamesComponent from "@/components/admin/_components/home/ArtistNamesComponent";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import AddBannerTextForm from "@/components/admin/_components/home/AddBannerTextForm";
import { Button } from "@/components/ui/button";
import useAddArtistName from "@/hooks/useAddArtistName";
import { useGetHomePageContent } from "@/hooks/useGetHomePageContent";
import { useUpdateArtistSectionContent } from "@/hooks/useUpdateArtistSectionContent";
import { getComponentByType } from "@/utils/helper";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

const ArtistSection = () => {
    const [openAddArtist, setOpenAddArtist] = useState(false);
    const {
        data: homeContent,
        loading: isArtistSectionLoading,
        refetch,
    } = useGetHomePageContent();

    const { handleSubmitArtistName, loading: isAddArtistLoading } = useAddArtistName(refetch);
    const { handleUpdateArtistSectionContent, loading: isUpdateArtistSectionContentLoading } = useUpdateArtistSectionContent(refetch);

    const artistSectionData = getComponentByType(homeContent, "artist_section");

    const handleArtistAdd = () => {
        setOpenAddArtist(true)
    }

    console.log("Artist Section Data=====>", artistSectionData);

    if (isArtistSectionLoading) {
        return <AdminPageLoader content={"Loading Artist Section Content..."} />
    }

    const { artists = [], ...ctaData } = artistSectionData ?? {};
    return (
        <>
            <div className="p-3 bg-[#f0f3f8]">
                <div className="flex justify-end items-end">
                    <Button
                        onClick={handleArtistAdd}
                        type="button"
                        className="relative inline-flex items-center gap-2 bg-white text-[#0F1116] font-bold text-sm w-32 py-2 px-4 mb-4 mt-4 
               border-2 border-black overflow-hidden transition-all duration-300 hover:text-white whitespace-nowrap text-center rounded-lg cursor-pointer"
                    >
                        <IoMdAddCircle size={20} />
                        <span>Add Artist</span>
                    </Button>
                </div>
                <AddBannerTextForm defaultValues={ctaData ?? {}} onSubmitHandler={handleUpdateArtistSectionContent} isLoading={isUpdateArtistSectionContentLoading} />
                <ArtistNamesComponent artists={artists} refetch={refetch} />
            </div>
            {openAddArtist && <AddArtistDialog
                openAddContent={openAddArtist}
                setOpenAddContent={setOpenAddArtist}
                submitHandler={handleSubmitArtistName}
                isAddArtistLoading={isAddArtistLoading}
            />}
        </>
    )
}

export default ArtistSection;