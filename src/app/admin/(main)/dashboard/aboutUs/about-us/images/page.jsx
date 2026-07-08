"use client";

import MultipleImageShowingComponent from "@/components/admin/_components/ui/MultipleImageShowingComponent";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import useDeleteAboutusImage from "@/hooks/useDeleteAboutusImage";
import { useGetAboutPageContent } from "@/hooks/useGetAboutPageContent";

const AboutUsImages = () => {
  const { handleDeleteAboutusImage, loading: isDeletingImage } =
    useDeleteAboutusImage();
  const {
    data: aboutPageContent,
    loading: isAboutPageContentLoading,
    refetch,
  } = useGetAboutPageContent("about_us_images");

  console.log("Data coming from about page content=====>", aboutPageContent);

  const handleImageDelete = async (url) => {
    await handleDeleteAboutusImage(url, refetch);
  };

  if (isAboutPageContentLoading) {
    return <AdminPageLoader content={"Loading About Us Images"} />;
  }

  const { images = [] } = aboutPageContent;
  return (
    <div className="p-3 bg-[#f0f3f8]">
      <MultipleImageShowingComponent
        imagesData={images}
        handleImageDelete={handleImageDelete}
      />
    </div>
  );
};

export default AboutUsImages;
