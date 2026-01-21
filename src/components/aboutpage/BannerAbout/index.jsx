import CommonBanner from "@/components/common/CommonBanner";
import Image from "next/image";
import Link from "next/link";

const BannerAbout = ({ aboutBanner }) => {
  return (
    <>
      <div className="relative">
        <div className="absolute top-[47px] left-[42px] md:left-[162px] w-[120px] md:w-[187px]" style={{ zIndex: "9999" }}>
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={187}
              height={82}
              className="w-full h-auto"
              priority
            />
          </Link>
        </div>
        <CommonBanner backgroundImage={aboutBanner?.file_url ?? "/assets/images/about-us-bg.png"} />
        {/* <h1 className="text-white font-bold text-[64px] absolute top-[510px] left-[645px] transition-transform duration-300 ease-in-out transform hover:scale-110 hover:drop-shadow-lg hover:text-slate-300">
            ABOUT US
            </h1> */}
        <h1
          className="
      absolute top-2/3 left-1/2
      transform -translate-x-1/2 -translate-y-1/2
      transition-transform duration-300 ease-in-out
      hover:scale-110 hover:drop-shadow-lg hover:text-slate-300
      whitespace-nowrap inner_banner_text
      "
        >
          {aboutBanner?.title}
        </h1>
      </div>
    </>
  );
};

export default BannerAbout;
