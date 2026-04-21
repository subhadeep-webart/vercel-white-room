"use client"
import BannerContact from "@/components/contactuspage/BannerContact";
import GetInTouch from "@/components/contactuspage/GetInTouch";
import Preloader from "@/components/loader/Preloader";
import { useGetContactUsPageContent } from "@/hooks/useGetContactUsPageContent";


const ContactUs = () => {
  const { data: contactusPage, loading: isContactPageContentLoading } = useGetContactUsPageContent("banner");

  return (
    <>
      <Preloader loading={isContactPageContentLoading} />
      <BannerContact contactBanner={contactusPage} />
      <GetInTouch />
    </>
  );
};

export default ContactUs;