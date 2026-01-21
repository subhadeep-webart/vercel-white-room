"use client"

import BannerMedia from "@/components/mediapage/BannerMedia";
import MediaSection from "@/components/mediapage/MediaSection";
import { useGetMediaPageContent } from "@/hooks/useGetMediaPageContent";
import { getComponentByType } from "@/utils/helper";

const MediaUs = () => {
  const { data: mediaPage, loading: isMediaPageLoading } = useGetMediaPageContent();
   const mediaBanner = getComponentByType(mediaPage,"banner");
    const mediaAssets = getComponentByType(mediaPage,"media_assets");

    if(isMediaPageLoading) return;

  return (
    <>
      <BannerMedia mediaBanner={mediaBanner}/>
      <MediaSection mediaAssets={mediaAssets}/>
    </>
  );
};

export default MediaUs;