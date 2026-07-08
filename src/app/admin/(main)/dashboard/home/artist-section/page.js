"use client";

import ArtistNamesComponent from "@/components/admin/_components/home/ArtistNamesComponent";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import AddBannerTextForm from "@/components/admin/_components/home/AddBannerTextForm";
import useAddArtistName from "@/hooks/useAddArtistName";
import { useGetHomePageContent } from "@/hooks/useGetHomePageContent";
import { useUpdateArtistSectionContent } from "@/hooks/useUpdateArtistSectionContent";
import { getComponentByType } from "@/utils/helper";
import AddArtistDialog from "@/components/admin/_components/home/AddArtistDialog";
import { useState } from "react";

const ArtistSection = () => {
  const [openAddArtist, setOpenAddArtist] = useState(false);
  const [activeSection, setActiveSection] = useState(null); // 🔥 NEW

  const {
    data: homeContent,
    loading: isArtistSectionLoading,
    refetch,
  } = useGetHomePageContent();

  const { handleSubmitArtistName, loading: isAddArtistLoading } =
    useAddArtistName(refetch);

  const {
    handleUpdateArtistSectionContent,
    loading: isUpdateArtistSectionContentLoading,
  } = useUpdateArtistSectionContent(refetch);

  const artistSectionData = getComponentByType(homeContent, "artist_section");

  // 🔥 FIXED HANDLER
  const handleArtistAdd = (section) => {
    setActiveSection(section); // store which header
    setOpenAddArtist(true);
  };

  if (isArtistSectionLoading) {
    return <AdminPageLoader content={"Loading Artist Section Content..."} />;
  }

  const { artists = {}, ...ctaData } = artistSectionData ?? {};

  return (
    <div className="p-3 bg-[#f0f3f8]">
      <AddBannerTextForm
        defaultValues={ctaData ?? {}}
        onSubmitHandler={handleUpdateArtistSectionContent}
        isLoading={isUpdateArtistSectionContentLoading}
      />

      {/* 🔥 PASS SECTION IN CLICK */}
      <ArtistNamesComponent
        artists={artists?.header1 || []}
        refetch={refetch}
        headerName="Header 1"
        setOpenAddArtist={setOpenAddArtist}
        setActiveSection={setActiveSection}
        handleArtistAdd={() => handleArtistAdd("header1")}
        section="header1"
      />

      <ArtistNamesComponent
        artists={artists?.header2 || []}
        refetch={refetch}
        headerName="Header 2"
        setOpenAddArtist={setOpenAddArtist}
        setActiveSection={setActiveSection}
        handleArtistAdd={() => handleArtistAdd("header2")}
        section="header2"
      />

      <ArtistNamesComponent
        artists={artists?.header3 || []}
        refetch={refetch}
        headerName="Header 3"
        setOpenAddArtist={setOpenAddArtist}
        setActiveSection={setActiveSection}
        handleArtistAdd={() => handleArtistAdd("header3")}
        section="header3"
      />

      {/* 🔥 SINGLE GLOBAL MODAL */}
      {openAddArtist && (
        <AddArtistDialog
          openAddContent={openAddArtist}
          setOpenAddContent={setOpenAddArtist}
          submitHandler={(payload) =>
            handleSubmitArtistName({
              ...payload,
              section: activeSection, // ✅ correct section
            })
          }
          isAddArtistLoading={isAddArtistLoading}
          section={activeSection}
        />
      )}
    </div>
  );
};

export default ArtistSection;
