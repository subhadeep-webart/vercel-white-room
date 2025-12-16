"use client";
export const ssr = false;
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { IoMdAddCircle } from "react-icons/io";
import { CldUploadWidget } from "next-cloudinary";
const AboutUsFormContainer = dynamic(
  () => import("@/components/admin/_components/home/AboutUsFormContainer"),
  { ssr: false }
);
import { usePostAboutUsImages } from "@/hooks/usePostAboutUsImages";

const AboutUs = () => {
  const { handlePostAboutUsImages, loading } = usePostAboutUsImages();

  const handleUploadSuccess = async (result) => {
    if (result.event === "success") {
      const imageUrl = result?.info?.secure_url || result?.info?.url;

      if (!imageUrl) {
        console.error("Image URL missing in Cloudinary result");
        return;
      }

      await handlePostAboutUsImages(imageUrl);
    }
    console.log("Result coming from========>", result);
    if (result.event === "success") {
      console.log("Upload successful:", result.info);
      // Handle the uploaded image data here
    }
  };
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
        <AboutUsFormContainer />
      </div>
    </>
  );
};

export default AboutUs;
