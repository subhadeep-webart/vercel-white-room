"use client";

import NoiseComponent from "@/components/common/NoiseComponent";
import Image from "next/image";

const TheWhiteRoom = ({ aboutData, aboutImages }) => {
  console.log("aboutData", aboutData);

  return (
    <>
      <section className="pt-20 pb-20 bg-[#0F1116] relative overflow-hidden">
        <NoiseComponent/>
        <div className="container relative mt-10 mb-10">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex flex-col max-w-[570px] mb-[532px] md:mb-0">
              <h3 className="text-white font-bold text-xl md:text-3xl mb-8">
                {aboutData?.title}
              </h3>
              <div className="w-[546px] md:min-h-[500px]">
               
                <div
                  className="text-[#8F8F8F] font-normal text-base md:text-xl mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: aboutData?.description }}
                />
              </div>

              <p className="text-white font-normal text-base md:text-lg">
                {aboutData?.footer_text}
              </p>

              <button
                onClick={() => window.open(aboutData?.button_url, "_blank")}
                className="btn-11 relative inline-block bg-white text-[#0F1116] font-medium text-sm md:text-[17px] w-[250px] py-3.5 md:py-[17px] px-10 md:px-[60px] mt-[60px] overflow-hidden transition-all duration-300 hover:text-white"
              >
                {aboutData?.button_text}
              </button>
            </div>

<div >
            <div>
              <Image
                src={
                  aboutImages?.images?.[2] ??
                  "/assets/images/about-us-img-2.png"
                }
                alt=""
                width={300}
                height={500}
                className="absolute right-[21px] bottom-[199px]"
              />
            </div>

            <div>
              <Image
                src={
                  aboutImages?.images?.[1] ??
                  "/assets/images/about-us-img-1.png"
                }
                alt=""
                width={350}
                height={700}
                className="absolute top-[560px] md:top-[167px] right-[290px]"
              />
            </div>

            <div>
              <Image
                src={
                  aboutImages?.images?.[3] ??
                  "/assets/images/about-us-img-3.png"
                }
                alt=""
                width={340}
                height={500}
                className="absolute bottom-0 right-[159px]"
              />
            </div>
            </div>


          </div>
        </div>
      </section>
    </>
  );
};

export default TheWhiteRoom;
