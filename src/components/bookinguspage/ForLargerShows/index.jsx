import NoiseComponent from "@/components/common/NoiseComponent";
import Image from "next/image";

const ForLargerShows = ({ largerShows }) => {
  return (
    <>
      <section className="bg-black relative overflow-hidden">
        <NoiseComponent />
        <div className="container py-10 px-4 md:px-0">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
            <div className="bg-[#1B1E25] w-full md:w-[906px] h-auto lg:h-[751px] pt-6 md:pt-12 px-4 md:pl-16 md:pr-24 border-b-[3px] border-white rounded-[6px]">
              <div className="flex flex-col space-y-4 mb-10 md:mb-14">
                <p className="font-bold text-xl md:text-4xl text-white">
                  {largerShows?.title}
                </p>

                <div
                  className="text-sm sm:text-base md:text-lg text-[#8F8F8F] font-normal"
                  dangerouslySetInnerHTML={{
                    __html: largerShows?.description,
                  }}
                />
              </div>

              <div className="flex flex-col space-y-3 bg-[#292B2F] py-5 md:py-7 px-4 md:px-16 mb-6 md:mb-14">
                <p className="font-bold text-lg md:text-xl text-white">
                  {largerShows?.subsection1_title}
                </p>
                <p className="text-sm md:text-[16px] text-[#8F8F8F] font-normal">
                  {/* {largerShows?.subsection1_description} */}
                  {largerShows?.subsection1_description?.replace(
                    /(\d+)\s*x\s*(\d+”?)/g,
                    "$1\u00A0x\u00A0$2",
                  )}
                </p>
              </div>

              <div className="flex flex-col space-y-3 bg-[#292B2F] py-5 md:py-7 px-4 md:px-16 mb-6 md:mb-7">
                <p className="font-bold text-lg md:text-xl text-white">
                  {largerShows?.subsection2_title}
                </p>
                <p className="text-sm md:text-[16px] text-[#8F8F8F] font-normal">
                  {largerShows?.subsection2_description}
                </p>
              </div>

              <p className="text-sm md:text-[16px] text-white font-normal">
                PLEASE NOTE –{" "}
                <span className="text-[#8F8F8F] text-sm">
                  Extra time is required for setup with XL packages.
                </span>
              </p>
            </div>

            <div className="w-full max-w-[614px] mt-6 md:mt-0">
              <Image
                src={
                  largerShows?.section_image_url ??
                  "/assets/images/booking-us-img-4.png"
                }
                alt="Booking image"
                width={614}
                height={565}
                className="w-full h-auto img_border"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForLargerShows;
