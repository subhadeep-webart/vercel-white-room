"use client";
export const ssr = false;

import { Button } from "@/components/ui/button";
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";
import AddAboutusContent from "@/components/admin/_components/home/add-aboutus-content";
import dynamic from "next/dynamic";
const AboutUsFormContainer = dynamic(
  () => import("@/components/admin/_components/home/AboutUsFormContainer"),
  { ssr: false }
);
import { CldUploadWidget } from "next-cloudinary";
import { usePostAboutUsImages } from "@/hooks/usePostAboutUsImages";

const AboutUs = () => {
  const [openAddContent, setOpenAddContent] = useState(false);

  const { handlePostAboutUsImages, loading, error, success } =
    usePostAboutUsImages("about_us");

  const handleUploadSuccess = async (result) => {
    console.log("Result coming from about us image upload========>", result);
    if (result.event === "success") {
      const imageUrls = result?.info?.secure_url;

      if (!imageUrls) {
        console.error("Image URL missing in Cloudinary result");
        return;
      }

      await handlePostAboutUsImages(imageUrls);
    }
  };

  return (
    <>
      <div className="p-3 bg-[#f0f3f8]">
        <div className="flex justify-end items-end">
          {typeof window !== "undefined" && (
            <CldUploadWidget
              signatureEndpoint="/api/sign-image"
              uploadPreset="white-room-image"
              options={{
                multiple: true,
                clientAllowedFormats: ["png", "jpeg", "jpg", "gif"],
                maxFileSize: 10485760,
              }}
              onSuccess={handleUploadSuccess}
            >
              {({ open }) => (
                <Button
                  onClick={() => open()}
                  type="button"
                  className="btn-11 relative inline-flex items-center gap-2 bg-white text-[#0F1116] font-bold text-sm w-32 py-2 px-4 mb-4 mt-4 
  border-2 border-black overflow-hidden transition-all duration-300 hover:text-white whitespace-nowrap text-center rounded-lg"
                >
                  <IoMdAddCircle size={20} />
                  <span>Add Images</span>
                </Button>
              )}
            </CldUploadWidget>
          )}
        </div>
        {/* <Tables
          caption="A list of your abouts."
          columns={columns}
          data={data}
        /> */}
        <AboutUsFormContainer />

        {openAddContent && (
          <AddAboutusContent
            openAddContent={openAddContent}
            setOpenAddContent={setOpenAddContent}
            refetch={refetch}
          />
        )}
      </div>
    </>
  );
};

export default AboutUs;
