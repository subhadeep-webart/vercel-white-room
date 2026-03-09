import CommonBanner from "@/components/common/CommonBanner";
import { poppins } from "@/lib/font";
import Image from "next/image";
import Link from "next/link";

const BannerContact = () => {
  return (
    <>
      <div className="relative">
         <div className="absolute top-[7px] left-[22px] md:left-[120px] md:top-[37px] w-[120px] md:w-[187px]" style={{ zIndex: "999999" }}>
          <Link href="/">
            <div className="relative w-[20vw] max-w-[187px] h-[82px]">
              <Image
                src="/assets/images/logo.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>
        <CommonBanner backgroundImage={"/assets/images/contact-us-bg.png"} />
        <h1
          // className="text-white font-bold text-[64px] absolute top-[510px] left-[600px]
          // transition-transform duration-300 ease-in-out transform hover:scale-110 hover:drop-shadow-lg hover:text-slate-300"
          className={`
      absolute top-2/3 left-1/2
      transform -translate-x-1/2 -translate-y-1/2
      transition-transform duration-300 ease-in-out
      hover:scale-110 hover:drop-shadow-lg hover:text-slate-300
      whitespace-nowrap inner_banner_text
      ${poppins.className}`}
        >
          CONTACT US
        </h1>
      </div>
    </>
  );
};

export default BannerContact;
