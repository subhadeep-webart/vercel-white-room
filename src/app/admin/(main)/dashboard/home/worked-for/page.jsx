"use client";

import MultipleImageShowingComponent from "@/components/admin/_components/ui/MultipleImageShowingComponent";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { Button } from "@/components/ui/button";
import useDeleteWorkedForImage from "@/hooks/useDeleteWorkedForImage";
import { useGetHomePageContent } from "@/hooks/useGetHomePageContent";
import { usePostTrustedByImages } from "@/hooks/usePostTrustedByImages";
import { CldUploadWidget } from "next-cloudinary";
import { IoMdAddCircle } from "react-icons/io";

const WorkedFor = () => {
  const { data: workedForContent, loading: isWorkedForContentLoading,refetch } = useGetHomePageContent("worked_for");
  const { handlePostTrustedImages, loading } = usePostTrustedByImages();
  const { handleWorkedForImageDelete, loading: isDeletingImage } = useDeleteWorkedForImage();
  const handleUploadSuccess = async (result) => {
    console.log("Result coming from about us image upload========>", result);
    if (result.event === "success") {
      const imageUrls = result?.info?.secure_url;

      if (!imageUrls) {
        console.error("Image URL missing in Cloudinary result");
        return;
      }
      await handlePostTrustedImages(imageUrls);
      // await handlePostAboutUsImages(imageUrls);
    }
  };

  console.log("Worked For Data=====>", workedForContent);

  const handleImageDelete=async(imageUrl)=>{

    await handleWorkedForImageDelete(imageUrl,refetch)
  }

  if (isWorkedForContentLoading) {
    return <AdminPageLoader content={"Loading Worked For Component Data"} />
  }

  const { images } = workedForContent;

  console.log("Images Data worked for", images)

  return (
    <>
      <div className="p-3 bg-[#f0f3f8]">
        <div className="flex justify-end items-end">
          {typeof window !== "undefined" && (
            <CldUploadWidget
              signatureEndpoint={"/api/sign-image"}
              uploadPreset="white-room-image"
              options={{
                multiple: true,
                clientAllowedFormats: ["png", "jpeg", "jpg", "gif"], // ✅ Only allow image types
                maxFileSize: 10485760, // optional: 10MB
              }}
              onSuccess={handleUploadSuccess}
            >
              {({ open }) => {
                return (
                  <Button
                    onClick={() => open()}
                    type="button"
                    className="relative inline-flex items-center gap-2 bg-white text-[#0F1116] font-bold text-sm w-32 py-2 px-4 mb-4 mt-4 
         border-2 border-black overflow-hidden transition-all duration-300 hover:text-white whitespace-nowrap text-center rounded-lg"
                  >
                    <IoMdAddCircle size={20} />
                    <span>Add Images</span>
                  </Button>
                );
              }}
            </CldUploadWidget>
          )}
        </div>
        <MultipleImageShowingComponent imagesData={images} handleImageDelete={handleImageDelete}/>
      </div>
    </>
  )
};

export default WorkedFor;