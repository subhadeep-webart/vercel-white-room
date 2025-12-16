"use client";
export const ssr = false;
import { IoMdAddCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useUpdateBanner } from "@/hooks/useUpdateBanner";
import { useGetBannerContent } from "@/hooks/useGetBannerContent";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import dynamic from "next/dynamic";

const CldUploadWidget = dynamic(
  () => import("next-cloudinary").then((mod) => mod.CldUploadWidget),
  { ssr: false }
);

const Banners = () => {
  const { handleUpdateBanner, loading, error, success } = useUpdateBanner();
  const { data: bannerData, loading: isBannerDataLoading } =
    useGetBannerContent();

  const handleUploadSuccess = async (result) => {
    if (result.event === "success") {
      const videoUrl = result?.info?.secure_url || result?.info?.url;

      if (!videoUrl) {
        console.error("Video URL missing in Cloudinary result");
        return;
      }

      const bannerPayload = { video_url: videoUrl };
      await handleUpdateBanner(bannerPayload);
    }
  };

  if (isBannerDataLoading) {
    return <AdminPageLoader content={"Loading Banner Content"} />;
  }

  return (
    <div className="relative w-full h-[calc(100%-84px)] !overflow-hidden !px-4">
      {/* Video Background */}
      {bannerData?.video_url && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={bannerData.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Overlay Content */}
      <div className="relative z-10 flex justify-center items-center w-full h-full">
        {typeof window !== "undefined" && (
          <CldUploadWidget
            signatureEndpoint={"/api/sign-image"}
            uploadPreset="white-room-image"
            options={{
              multiple: false,
              clientAllowedFormats: ["mp4", "webm", "mov", "avi", "mkv"],
              maxFileSize: 52428800, // 50MB
            }}
            onSuccess={handleUploadSuccess}
          >
            {({ open }) => (
              <Button
                onClick={() => open()}
                type="button"
                className="relative inline-flex items-center gap-2 bg-white/80 hover:bg-white text-[#0F1116] font-bold text-sm px-5 py-3
              border-2 border-black shadow-lg rounded-lg transition-all duration-300 hover:scale-105"
              >
                <IoMdAddCircle size={20} />
                <span>
                  {bannerData?.video_url
                    ? "Change Banner Video"
                    : "Add Banner Video"}
                </span>
              </Button>
            )}
          </CldUploadWidget>
        )}
      </div>

      {/* Optional: Dark overlay for better contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-5" />
    </div>
  );
};

export default Banners;
