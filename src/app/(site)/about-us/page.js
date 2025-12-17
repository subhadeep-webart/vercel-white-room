"use client";
import BannerAbout from "@/components/aboutpage/BannerAbout";
import TheWhiteRoom from "@/components/aboutpage/TheWhiteRoom";
import { useGetAboutPageContent } from "@/hooks/useGetAboutPageContent";
import { getComponentByType } from "@/utils/helper";

const AboutUs = () => {
  const {
    data: aboutPage,
    loading: isAboutPageLoading,
  } = useGetAboutPageContent();
  const aboutBanner = getComponentByType(aboutPage,"banner");
  const aboutData = getComponentByType(aboutPage,"about_us");
  const aboutImages = getComponentByType(aboutPage,"about_us_images");

  return (
    <>
      <BannerAbout aboutBanner={aboutBanner} />
      <TheWhiteRoom aboutData={aboutData} aboutImages={aboutImages} />
    </>
  );
};

export default AboutUs;
